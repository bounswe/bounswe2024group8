import React, { useContext, useRef, useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal, Alert } from 'react-native';
import Post from '../components/Post';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [userData, setUserData] = useState({});
  const [modalTitle, setModalTitle] = useState('');
  const [latestPosts, setLatestPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const { user } = useContext(AuthContext);
  console.log(user);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/user/${user.userId}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setLatestPosts(response.data);
      setLoadingPosts(false);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setLoadingPosts(false);
      Alert.alert('Error', 'Failed to fetch posts');
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/users/${user.userId}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      });
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching userdata:', error);
    }
  };

  useEffect(() => {
    fetchUserPosts();
    fetchUserData();
  }, [user]);

  const renderFollowItem = ({ item }) => (
    <Text style={styles.modalItem}>{item.name}</Text>
  );

  const openModal = (data, title) => {
    setModalData(data);
    setModalTitle(title);
    setModalVisible(true);
  };

  const flatListRef = useRef(null);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image source={{ uri: userData.profilePictureUrl || 'https://via.placeholder.com/100' }} style={styles.profilePicture} />

      {/* Tournament Points */}
      <Text style={styles.pointsText}>Tournament Points: {userData.experience}</Text>

      {/*/!* Followed and Following *!/*/}
      {/*<View style={styles.followContainer}>*/}
      {/*  <TouchableOpacity onPress={() => openModal(user.followed, 'Followed Users')}>*/}
      {/*    <Text style={styles.followText}>Followed: {user.followed.length}</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*  <TouchableOpacity onPress={() => openModal(user.following, 'Following Users')}>*/}
      {/*    <Text style={styles.followText}>Following: {user.following.length}</Text>*/}
      {/*  </TouchableOpacity>*/}
      {/*</View>*/}

      {/* Latest Posts */}
      <Text style={styles.latestHeader}>Latest Posts:</Text>
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={latestPosts}
          keyExtractor={(item) => item.postId.toString()}
          removeClippedSubviews={false}
          keyboardShouldPersistTaps="handled"
          ListEmptyComponent={<Text>This user hasn't posted yet.</Text>}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.content}
              model={item.fileUrl}
              username={item.user.nickName}
              id={item.id}
              disableScroll={disableScroll}
            />
          )}
        />
      </GestureHandlerRootView>

      {/*/!* Modal for Followed and Following Users *!/*/}
      {/*<Modal visible={isModalVisible} transparent animationType="slide">*/}
      {/*  <View style={styles.modalContainer}>*/}
      {/*    <Text style={styles.modalTitle}>{modalTitle}</Text>*/}
      {/*    <FlatList*/}
      {/*      data={modalData}*/}
      {/*      renderItem={renderFollowItem}*/}
      {/*      keyExtractor={(item) => item.id}*/}
      {/*    />*/}
      {/*    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>*/}
      {/*      <Text style={styles.closeButtonText}>Close</Text>*/}
      {/*    </TouchableOpacity>*/}
      {/*  </View>*/}
      {/*</Modal>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  followContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  followText: {
    fontSize: 16,
    color: '#007BFF',
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  modalItem: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfilePage;
