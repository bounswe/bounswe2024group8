import React, { useContext, useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Platform,
  StatusBar,
  Image,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';
import { Colors } from '../constants/Colors';
import { AuthContext } from "../context/AuthContext";

export default function LeaderboardScreen({ route, navigation }) {
  const { category } = route.params;
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(AuthContext);

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
          setLeaderboardData(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError('Failed to load leaderboard data.');
        });
    }
  }, [category]);

  const handleViewPost = (item) => {
    const postUrl = `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${item.postId}`;
    axios
      .get(postUrl, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((response) => {
        const postData = response.data;
        navigation.navigate('Post', {
          postId: item.postId,
          username: item.user.nickName,
          userId: item.user.id,
          title: postData.title,
          content: postData.text,
          model: postData.fileUrl,
        });
      })
      .catch((error) => console.error(error));
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{index + 1}</Text>
      <TouchableOpacity
        style={styles.userCell}
        onPress={() => navigation.navigate('ProfilePage', { userId: item.user.id })}
      >
        <Image
          source={{ uri: item.user.profilePictureUrl }}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{item.user.nickName}</Text>
      </TouchableOpacity>
      <Text style={styles.cell}>{item.score}</Text>
      <TouchableOpacity
        style={styles.viewPostButton}
        onPress={() => handleViewPost(item)}
      >
        <Text style={styles.viewPostButtonText}>View Post</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size='large' color={Colors.dark} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.body}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Leaderboard for {category.label} Category
        </Text>
      </View>
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Ranking</Text>
        <Text style={styles.headerCell}>User</Text>
        <Text style={styles.headerCell}>Score</Text>
        <Text style={styles.headerCell}>Post</Text>
      </View>
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.light,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  titleContainer: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark,
    backgroundColor: Colors.lightGray,
  },
  headerCell: {
    flex: 1,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
    color: Colors.dark,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
  },
  userCell: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  userName: {
    fontSize: 16,
    textAlign: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: Colors.red,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  viewPostButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  viewPostButtonText: {
    color: Colors.dark,
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
