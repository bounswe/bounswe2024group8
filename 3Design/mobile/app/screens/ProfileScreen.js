import React, {useRef, useState} from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import Post from '../components/Post';
import {GestureHandlerRootView} from "react-native-gesture-handler";

const ProfilePage = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [modalTitle, setModalTitle] = useState('');

  const profileData = {
    profilePicture: 'https://via.placeholder.com/100',
    tournamentPoints: 1200,
    followed: [
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Charlie' },
    ],
    following: [
      { id: '4', name: 'David' },
      { id: '5', name: 'Eve' },
      { id: '6', name: 'Frank' },
    ],
    latestPosts: [
      {
        id: '1',
        title: 'HAMBURGER 😋',
        content:
          "Who doesn't love a good hamburger? I made this 3D model of a hamburger for a college assigment, and I" +
          " was so proud of it that I wanted to share it here. I know that this isn't much, but I'm still a beginner at" +
          ' this, so please go easy on me :)',
        model: require('../assets/Hamburger.obj'),
      },
      {
        id: '2',
        title: 'Environment modeling for games',
        content:
          'Hi everyone!\n\nAs an experienced level designer that has worked in countless triple-A games, I have ' +
          'noticed that lately not enough attention is given to environment modeling in indie titles. That is why I ' +
          'decided to prepare a tutorial/guide detailing what to pay attention to while designing your environment props.' +
          '\n\nRead here: https://medium.com/environment-modeling-for-games-77672e86876b',
      },
    ],
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemType}>{item.type === 'post' ? 'Post' : 'Comment'}:</Text>
      <Text style={styles.itemTitle}>{item.title}</Text>
    </View>
  );

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
      <Image source={{ uri: profileData.profilePicture }} style={styles.profilePicture} />

      {/* Tournament Points */}
      <Text style={styles.pointsText}>Tournament Points: {profileData.tournamentPoints}</Text>

      {/* Followed and Following */}
      <View style={styles.followContainer}>
        <TouchableOpacity onPress={() => openModal(profileData.followed, 'Followed Users')}>
          <Text style={styles.followText}>Followed: {profileData.followed.length}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => openModal(profileData.following, 'Following Users')}>
          <Text style={styles.followText}>Following: {profileData.following.length}</Text>
        </TouchableOpacity>
      </View>

      {/* Latest Posts and Comments */}
      <Text style={styles.latestHeader}>Latest Posts:</Text>
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={profileData.latestPosts}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.content}
              model={item.model}
              disableScroll={disableScroll}
            />
          )}
        />
      </GestureHandlerRootView>

      {/* Modal for Followed and Following Users */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>{modalTitle}</Text>
          <FlatList
            data={modalData}
            renderItem={renderFollowItem}
            keyExtractor={(item) => item.id}
          />
          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
