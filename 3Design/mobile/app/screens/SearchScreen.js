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
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

export default function SearchScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts`;

  const fetchPosts = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setError('');

    try {
      const url = `${API_URL}?param=${encodeURIComponent(query)}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching search results.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        {/* Search Input and Button */}
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder='Search'
            value={query}
            onChangeText={(text) => setQuery(text)}
            onSubmitEditing={fetchPosts}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={fetchPosts}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Display Loading Indicator, Error Message, or Search Results */}
        {loading ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
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
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
});
