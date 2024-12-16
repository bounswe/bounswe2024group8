import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  FlatList,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Post from '../components/Post';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function SearchScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  // States to handle query, loading, errors
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // States to handle search results
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  // State to determine what we are currently searching: 'posts' or 'users'
  const [searchType, setSearchType] = useState('posts');

  // Endpoints
  const POSTS_API_URL = `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts`;
  const USERS_API_URL = `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/users/search`;

  const fetchPosts = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setError('');
    setUsers([]); // clear user results if any

    try {
      const url = `${POSTS_API_URL}?param=${encodeURIComponent(query)}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setError('An error occurred while fetching posts.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setError('');
    setPosts([]); // clear post results if any

    try {
      const url = `${USERS_API_URL}?keyword=${encodeURIComponent(query)}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('An error occurred while fetching users.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const onSearch = () => {
    if (searchType === 'posts') {
      fetchPosts();
    } else {
      fetchUsers();
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Search Input */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder='Search'
            value={query}
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing={onSearch}
          />
          <TouchableOpacity style={styles.button} onPress={onSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle between Posts and Users */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              searchType === 'posts' && styles.toggleButtonActive,
            ]}
            onPress={() => setSearchType('posts')}
          >
            <Text
              style={[
                styles.toggleButtonText,
                searchType === 'posts' && styles.toggleButtonTextActive,
              ]}
            >
              Posts
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              searchType === 'users' && styles.toggleButtonActive,
            ]}
            onPress={() => setSearchType('users')}
          >
            <Text
              style={[
                styles.toggleButtonText,
                searchType === 'users' && styles.toggleButtonTextActive,
              ]}
            >
              Users
            </Text>
          </TouchableOpacity>
        </View>

        {/* Display Loading, Error, or Results */}
        {loading ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            {searchType === 'posts' ? (
              <FlatList
                data={posts}
                keyExtractor={(item) => item.postId.toString()}
                renderItem={({ item }) => (
                  <Post
                    title={item.title}
                    content={item.text}
                    model={item.isVisualPost ? item.fileUrl : undefined}
                    id={item.postId}
                    userId={item.user.id}
                    username={item.user.nickName}
                    navigation={navigation}
                  />
                )}
              />
            ) : (
              <FlatList
                data={users}
                keyExtractor={(item) => item.userId.toString()}
                renderItem={({ item }) => (
                  <View style={styles.userContainer}>
                    <Text style={styles.userText}>Nickname: {item.nickName}</Text>
                    <Text style={styles.userText}>Email: {item.email}</Text>
                    <Text style={styles.userText}>
                      Experience: {item.experience}
                    </Text>
                    {/* You can add follow/unfollow logic or link to their profile */}
                  </View>
                )}
              />
            )}
          </>
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: Colors.background,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputBackground,
    color: Colors.text,
  },
  button: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  buttonText: {
    color: Colors.buttonText,
    fontWeight: 'bold',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  toggleButton: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.inputBackground,
  },
  toggleButtonActive: {
    backgroundColor: Colors.primary,
  },
  toggleButtonText: {
    color: Colors.text,
  },
  toggleButtonTextActive: {
    color: Colors.buttonText,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
  userContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  userText: {
    color: Colors.text,
    marginBottom: 5,
  },
});
