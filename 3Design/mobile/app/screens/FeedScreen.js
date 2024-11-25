import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
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

  const [remainingTime, setRemainingTime] = useState(null);
  const [isLoadingTime, setIsLoadingTime] = useState(true);
  const [showTournamentBox, setShowTournamentBox] = useState(false);

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
      } catch (e) {}
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
  };

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
      setIsFollowing((prevState) => !prevState);
      console.log(`Successfully ${isFollowing ? 'unfollowed' : 'followed'} category.`);
    } catch (error) {
      console.error(`Failed to ${isFollowing ? 'unfollow' : 'follow'} category:`, error);
    }
  };

  // Reset the category to null and reload the feed
  const handleResetCategory = () => {
    navigation.setParams({ category: null });
  };

  const clearFilteredPosts = () => {
    setFilteredPosts([]);
    console.log('Filtered posts cleared.');
  };

  // Fetch remaining time for the tournament
  // Fetch remaining time for the tournament
    useEffect(() => {
      if (category) {
        const url = `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/tournaments/leaderboard/${category.value}`;
        axios
          .get(url, {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
              'Content-Type': 'multipart/form-data',
            },
          })
          .then((response) => {
            const endTimeISO = response.data[0]?.tournament?.endTime;

            if (endTimeISO) {
              const endTime = new Date(endTimeISO).getTime();
              const now = Date.now();
              const timeLeftInSeconds = Math.floor((endTime - now) / 1000);

              setRemainingTime(timeLeftInSeconds);
              setShowTournamentBox(true); // Show the tournament box
            } else {
              console.error('endTime not found in the response');
              setShowTournamentBox(false); // Do not show the tournament box
            }

            setIsLoadingTime(false);
          })
          .catch((error) => {
            //console.error('Failed to fetch remaining time', error.response?.data || error.message);
            setIsLoadingTime(false);
            setShowTournamentBox(false); // Do not show the tournament box
          });
      }
    }, [category]);

  // Timer countdown
  useEffect(() => {
    let timerInterval;
    if (remainingTime > 0) {
      // Start a timer to count down
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [remainingTime]);

  const formatTime = (timeInSeconds) => {
    const days = Math.floor(timeInSeconds / (24 * 3600));
    const hours = Math.floor((timeInSeconds % (24 * 3600)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    return `${days}d, ${hours}h, ${minutes}m, ${seconds}s`;
  };

  const handleLeaderboardPress = () => {
    navigation.navigate('Leaderboard', {
      category: category
    });
  };

  return (
      <View style={styles.body}>
        {/* Category Name */}
        <Text style={styles.categoryName}>{categoryName}</Text>

        {/* Follow/Unfollow Button */}
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

        {/* Reset Category Button */}
        {category && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetCategory}
          >
            <Text style={styles.resetButtonText}>X</Text>
          </TouchableOpacity>
        )}

        {/* Weekly Tournament Box */}
        {category && showTournamentBox && (
          <View style={styles.tournamentBox}>
            <Text style={styles.tournamentTitle}>Weekly Tournament for {category.label} Category</Text>
            {isLoadingTime ? (
              <ActivityIndicator size="small" color={Colors.dark} />
            ) : (
              <Text style={styles.timerText}>
                Time left: {formatTime(remainingTime)}
              </Text>
            )}
            <TouchableOpacity
              style={styles.leaderboardButton}
              onPress={handleLeaderboardPress}
            >
              <Text style={styles.leaderboardButtonText}>See Leaderboard</Text>
            </TouchableOpacity>
          </View>
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
              userId={item.user.id}
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
 tournamentBox: {
   marginTop: 10,
   padding: 15,
   borderWidth: 2,
   borderColor: Colors.dark,
   borderRadius: 8,
   backgroundColor: Colors.lightGray,
   alignItems: 'center',
 },
 tournamentTitle: {
   fontSize: 18,
   fontWeight: 'bold',
   color: Colors.dark,
   textAlign: 'center',
   marginBottom: 8, // Space between the title and timer
 },
 timerText: {
   fontSize: 16,
   color: Colors.dark,
   textAlign: 'center',
   marginBottom: 12, // Space between the timer and button
 },
 leaderboardButton: {
   backgroundColor: Colors.primary,
   paddingVertical: 8,
   paddingHorizontal: 12,
   borderRadius: 5,
 },
 leaderboardButtonText: {
   color: Colors.dark,
   fontSize: 16,
   fontWeight: '600',
 },
});
