import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
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
  const category = route.params?.category || null;

  const [posts, setPosts] = useState([]); // State for posts
  const { user } = useContext(AuthContext);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      if (category == null) {
        const allPosts = [];
        for (let item of Categories) {
          const response = await axios.get(
            `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/category/${item.value}/nonvisual`,
            {
              headers: {
                Authorization: `Bearer ${user.accessToken}`,
                'Content-Type': 'multipart/form-data',
              },
            }
          );
          allPosts.push(...response.data);
        }
        setPosts(allPosts); // Update the posts state
      } else {
        const response = await axios.get(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/category/${category}/nonvisual`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setPosts(response.data); // Update the posts state
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Use useEffect to fetch posts on component mount or when category changes
  useEffect(() => {
    fetchPosts();
  }, [category]);

  return (
    <View style={styles.body}>
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={posts} // Use the state variable here
          keyExtractor={(item) => item.postId.toString()}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.text}
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
  },
});
