import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator
} from 'react-native';
import Post from '../components/Post';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';

const ProfilePage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);

  // Use the userId from params if provided; else fallback to currently logged-in user's userId
  const userId = route.params?.userId || user.userId;

  const [isAchievementsVisible, setAchievementsVisible] = useState(false);
  const [achievements, setAchievements] = useState([]);
  const [userData, setUserData] = useState(null);
  const [latestPosts, setLatestPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const [loadingPosts, setLoadingPosts] = useState(true);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  const [showVisual, setShowVisual] = useState(false);
  const flatListRef = useRef(null);

  const fetchUserPosts = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setLatestPosts(response.data);
      filterPosts(response.data, true);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoadingPosts(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/users/${userId}`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoadingUserData(false);
    }
  };

  const fetchAchievements = async () => {
    try {
      const response = await axios.get(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/achievements/user/${userId}`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      );
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoadingAchievements(false);
    }
  };

  const filterPosts = (allPosts, showVisual) => {
    // Currently not filtering by showVisual, just display all
    setFilteredPosts(allPosts);
  };

  const filterPostsCallback = () => {
    filterPosts(latestPosts, showVisual);
  };

  const clearFilteredPosts = () => {
    setFilteredPosts([]);
  };

  useEffect(() => {
    fetchUserPosts();
    fetchUserData();
    fetchAchievements();
  }, [user, userId]);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };

  // If we're still loading user data, show a loader
  if (loadingUserData || loadingPosts || loadingAchievements) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={Colors.dark} />
      </View>
    );
  }

  // If userData is null even after loading, show a fallback UI
  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Failed to load user profile.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* User's Nickname (or fallback if unavailable) */}
      <Text style={styles.usernameText}>
        {userData?.nickName || 'Unknown User'}
      </Text>

      {/* Profile Picture (with fallback) */}
      <Image
        source={{
          uri: userData?.profilePictureUrl || 'https://via.placeholder.com/100',
        }}
        style={styles.profilePicture}
      />

      {/* Tournament Points (with fallback) */}
      <Text style={styles.pointsText}>
        Tournament Points: {userData?.experience ?? 0}
      </Text>

      <TouchableOpacity
        style={styles.achievementsButton}
        onPress={() => setAchievementsVisible(true)}
      >
        <Text style={styles.achievementsButtonText}>Achievements</Text>
        <MaterialIcons name='stars' size={30} color={Colors.light} />
      </TouchableOpacity>

      {/* Latest Posts */}
      <Text style={styles.latestHeader}>Latest Posts:</Text>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <FlatList
          ref={flatListRef}
          data={filteredPosts}
          keyExtractor={(item) => item.postId.toString()}
          keyboardShouldPersistTaps='handled'
          ListEmptyComponent={
            <Text style={styles.emptyText}>This user hasn't posted yet.</Text>
          }
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.text}
              model={item.fileUrl}
              username={item.user?.nickName}
              userId={item.user?.id}
              id={item.postId}
              navigation={navigation}
              disableScroll={disableScroll}
              clearFilteredPosts={clearFilteredPosts}
              filterPostsCallback={filterPostsCallback}
            />
          )}
        />
      </GestureHandlerRootView>

      <Modal
        visible={isAchievementsVisible}
        transparent={true}
        animationType='slide'
        onRequestClose={() => setAchievementsVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.centeredModal}>
            <Text style={styles.modalTitle}>Achievements</Text>
            {/* Table Header */}
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Title</Text>
              <Text style={styles.headerCell}>Description</Text>
              <Text style={styles.headerCell}>Rewards</Text>
              <Text style={styles.headerCell}>Earned At</Text>
            </View>

            {/* Achievements List */}
            {achievements.length > 0 ? (
              <FlatList
                style={{ width: '100%' }}
                data={achievements}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Text style={styles.tableCell}>{item.description}</Text>
                    <Text style={styles.tableCell}>{item.point}</Text>
                    <Text style={styles.tableCell}>
                      {item.earnedAt
                        ? new Intl.DateTimeFormat('en-GB').format(
                            new Date(item.earnedAt)
                          )
                        : ''}
                    </Text>
                  </View>
                )}
              />
            ) : (
              <Text style={styles.noAchievementsText}>
                No achievements yet.
              </Text>
            )}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setAchievementsVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: Colors.red,
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontStyle: 'italic',
  },
  achievementsButton: {
    backgroundColor: Colors.dark,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    borderWidth: 2,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    gap: 20,
    width: '90%',
    borderColor: Colors.dark,
  },
  achievementsButtonText: {
    color: Colors.light,
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  centeredModal: {
    width: '95%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: Colors.dark,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  headerCell: {
    fontSize: 15,
    flex: 1,
    fontWeight: 'bold',
    color: Colors.light,
    textAlign: 'center',
    paddingHorizontal: 1,
  },
  tableRow: {
    flexDirection: 'row',
    backgroundColor: Colors.light,
    alignItems: 'center',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#aaa',
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  noAchievementsText: {
    color: '#555',
    fontStyle: 'italic',
    marginVertical: 10,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: Colors.dark,
    borderRadius: 5,
    paddingVertical: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.light,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ProfilePage;
