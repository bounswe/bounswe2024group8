import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import Post from '../components/Post';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { Categories } from "../constants/Categories";
import {useCategories} from "../context/CategoryContext";

export default function FeedScreen() {
  const flatListRef = useRef(null);
  const navigation = useNavigation();

  const route = useRoute();
  const category = route.params ? route.params['category'] : null;
  const { categories, loading, error } = useCategories();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showVisual, setShowVisual] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const { user } = useContext(AuthContext);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };

  const categoryName = categories.find((cat) => cat.value === category)?.label || '3Design';

  const fetchPosts = async () => {
    let fetchedPosts = [];
    if (category == null) {
      try {
        let response = await axios.get(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/feed`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        fetchedPosts.push(...response.data);
      } catch (e) {}
    } else {
      try {
        let response = await axios.get(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/category/${category}/nonvisual`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        fetchedPosts.push(...response.data);
      } catch (e) {}
      try {
        let response = await axios.get(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/category/${category}/visual`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        fetchedPosts.push(...response.data);
      } catch(e){}
    }
    console.log(fetchedPosts);
    setPosts(fetchedPosts);
    filterPosts(fetchedPosts, showVisual);
  };

  const filterPosts = (allPosts, showVisual) => {
    const filtered = allPosts.filter((post) =>
      showVisual ? post.isVisualPost : !post.isVisualPost
    );
    setFilteredPosts(filtered);
  };

  const filterPostsCallback = () => {
    filterPosts(posts, showVisual);
  }

  useEffect(() => {
    fetchPosts();
  }, [category]);

  useEffect(() => {
    filterPosts(posts, showVisual);
  }, [showVisual, posts]);

  const handleFollowUnfollow = async () => {
    try {
      const url = `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/categories/follow/${category}`;
      await axios.post(url, null, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setIsFollowing((prevState) => !prevState); // Update the button text only after a successful request
      console.log(`Successfully ${isFollowing ? 'unfollowed' : 'followed'} category.`);
    } catch (error) {
      console.error(`Failed to ${isFollowing ? 'unfollow' : 'follow'} category:`, error);
    }
  };


  // Reset the category to null and reload the feed
  const handleResetCategory = () => {
    navigation.setParams({ category: null }); // Set the category to null
  };

  const clearFilteredPosts = () => {
    setFilteredPosts([]);
    console.log('Filtered posts cleared.');
  };

  return (
    <View style={styles.body}>
      {/* Category Name */}
      <Text style={styles.categoryName}>{categoryName}</Text>

      {/* Follow/Unfollow Button - Only show if category is not null */}
      {category && (
        <TouchableOpacity
          style={styles.followButton}
          onPress={handleFollowUnfollow}
        >
          <Text style={styles.followButtonText}>
            {isFollowing ? 'Unfollow' : 'Follow'} Category
          </Text>
        </TouchableOpacity>
      )}

      {/* Reset Category Button (Top Right) */}
      {category && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleResetCategory}
        >
          <Text style={styles.resetButtonText}>X</Text>
        </TouchableOpacity>
      )}

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, showVisual && styles.activeToggle]}
          onPress={() => setShowVisual(true)}
        >
          <Text style={styles.toggleText}>Designs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, !showVisual && styles.activeToggle]}
          onPress={() => setShowVisual(false)}
        >
          <Text style={styles.toggleText}>Discussion</Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={filteredPosts}
          keyExtractor={(item) => item.postId.toString()}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.text}
              model={item.fileUrl}
              id={item.postId}
              username={item.user.nickName}
              navigation={navigation}
              disableScroll={disableScroll}
              clearFilteredPosts={clearFilteredPosts}
              filterPostsCallback={filterPostsCallback}
            />
          )}
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.light,
    marginTop: 20,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.dark,
    textAlign: 'center',
    marginBottom: 10,
  },
  followButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  followButtonText: {
    color: Colors.dark,
    fontWeight: 'bold',
    fontSize: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  activeToggle: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    color: Colors.dark,
    fontWeight: 'bold',
  },
  resetButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: Colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
  },
  resetButtonText: {
    color: Colors.dark,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
