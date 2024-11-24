import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import Post from '../components/Post';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Categories } from "../constants/Categories";

export default function FeedScreen() {
  const flatListRef = useRef(null);

  const route = useRoute();
  const category = route.params['category'];

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [showVisual, setShowVisual] = useState(false);
  const { user } = useContext(AuthContext);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };

  const categoryName = Categories.find((cat) => cat.value === category)?.label || 'All Categories';

  const fetchPosts = async () => {
    let fetchedPosts = [];
    if (category == null) {
      for (let item of Categories) {
        try {
          let response = await axios.get(
            `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/category/${item.value}/nonvisual`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          fetchedPosts.push(...response.data);

          response = await axios.get(
            `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/category/${item.value}/visual`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          fetchedPosts.push(...response.data);
        } catch (e) {}
      }
    } else {
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
      response = await axios.get(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/category/${category}/visual`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      fetchedPosts.push(...response.data);
    }
    setPosts(fetchedPosts);
    filterPosts(fetchedPosts, showVisual);
  };

  const filterPosts = (allPosts, showVisual) => {
    const filtered = allPosts.filter((post) =>
      showVisual ? post.model !== undefined : post.model === undefined
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    fetchPosts();
  }, [category]);

  useEffect(() => {
    filterPosts(posts, showVisual);
  }, [showVisual, posts]);

  return (
    <View style={styles.body}>
      {/* Category Name */}
      <Text style={styles.categoryName}>{categoryName}</Text>

      {/* Toggle Buttons */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleButton, !showVisual && styles.activeToggle]}
          onPress={() => setShowVisual(false)}
        >
          <Text style={styles.toggleText}>Text Posts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, showVisual && styles.activeToggle]}
          onPress={() => setShowVisual(true)}
        >
          <Text style={styles.toggleText}>Visual Posts</Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={filteredPosts}
          keyExtractor={(item) => item.postId.toString()}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.text}
              model={item.model} // Pass model if present
              disableScroll={disableScroll}
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
});
