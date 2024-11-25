import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import Post from '../components/Post';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import { useNavigation, useRoute } from "@react-navigation/native";

const ProfilePage = () => {
  const route = useRoute();

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [userData, setUserData] = useState({});
  const [modalTitle, setModalTitle] = useState('');
  const [latestPosts, setLatestPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [showVisual, setShowVisual] = useState(false);
  const { user } = useContext(AuthContext);
  const userId  = route.params?.userId || user.userId;

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/user/${userId}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setLatestPosts(response.data);
      filterPosts(response.data, true);
      setLoadingPosts(false);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoadingPosts(false);
      Alert.alert('Error', 'Failed to fetch posts');
    }
  };

  const fetchUserData = async () => {
    try {
      // Fetch the user profile data by username
      const response = await axios.get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const filterPosts = (allPosts, showVisual) => {
    setFilteredPosts(allPosts);
  };

  const filterPostsCallback = () => {
    filterPosts(latestPosts, showVisual);
  };

  const clearFilteredPosts = () => {
    setFilteredPosts([]);
    console.log('Filtered posts cleared.');
  };

  useEffect(() => {
    fetchUserPosts();
    fetchUserData();
  }, [user, userId]);

  const navigation = useNavigation();

  const flatListRef = useRef(null);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };

  return (
    <View style={styles.container}>
      {/* Display Username at the top of the page */}
      <Text style={styles.usernameText}>{userData.nickName}</Text>

      {/* Profile Picture */}
      <Image source={{ uri: userData.profilePictureUrl || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />

      {/* Tournament Points */}
      <Text style={styles.pointsText}>Tournament Points: {userData.experience}</Text>

      {/* Latest Posts */}
      <Text style={styles.latestHeader}>Latest Posts:</Text>
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={filteredPosts}
          keyExtractor={(item) => item.postId.toString()}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text>This user hasn't posted yet.</Text>}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.text}
              model={item.fileUrl}
              username={item.user.nickName}
              userId={item.user.id}
              id={item.postId}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  latestHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  itemContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  itemType: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemTitle: {
    fontSize: 16,
  },
});

export default ProfilePage;
