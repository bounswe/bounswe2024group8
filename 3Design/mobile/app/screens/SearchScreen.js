import React, { useContext, useRef, useState, useEffect } from 'react';
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
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVisual, setShowVisual] = useState(false); // Toggle state
  const [category, setCategory] = useState({ value: 'default' }); // Update with your default category

  const API_URL = `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts`;

  const fetchPosts = async (isVisual = false) => {
    Keyboard.dismiss();
    setLoading(true);
    setError('');

    try {
      const url = isVisual
        ? `${API_URL}/category/${category.value}/visual`
        : `${API_URL}?param=${encodeURIComponent(query)}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const fetchedPosts = response.data;
      setPosts(fetchedPosts);
      setFilteredPosts(filterPosts(fetchedPosts, showVisual)); // Apply filtering logic
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('An error occurred while fetching search results.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = (allPosts, showVisual) => {
    return allPosts.filter((post) =>
      showVisual ? post.isVisualPost : !post.isVisualPost
    );
  };

  const toggleShowVisual = () => {
    setShowVisual((prev) => !prev);
    setFilteredPosts(filterPosts(posts, !showVisual));
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
            onSubmitEditing={() => fetchPosts(showVisual)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => fetchPosts(showVisual)}
          >
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Toggle for Visual Posts */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, showVisual && styles.activeToggle]}
            onPress={toggleShowVisual}
          >
            <Text style={styles.toggleText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, !showVisual && styles.activeToggle]}
            onPress={toggleShowVisual}
          >
            <Text style={styles.toggleText}>Discussion</Text>
          </TouchableOpacity>
        </View>

        {/* Display Loading Indicator, Error Message, or Search Results */}
        {loading ? (
          <ActivityIndicator size='large' color={Colors.primary} />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <FlatList
            data={filteredPosts}
            keyExtractor={(item) => item.postId.toString()}
            renderItem={({ item }) =>
              item.isVisualPost ? (
                <Post
                  title={item.title}
                  content={item.text}
                  model={item.fileUrl} // 3D Model URL
                  id={item.postId}
                  userId={item.user.id}
                  username={item.user.nickName}
                  navigation={navigation}
                />
              ) : (
                <Post
                  title={item.title}
                  content={item.text}
                  id={item.postId}
                  userId={item.user.id}
                  username={item.user.nickName}
                  navigation={navigation}
                />
              )
            }
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  toggleButton: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: Colors.toggleBackground,
  },
  activeToggle: {
    backgroundColor: Colors.primary,
  },
  toggleText: {
    color: Colors.text,
    fontWeight: 'bold',
  },
  errorText: {
    color: Colors.error,
    textAlign: 'center',
    marginTop: 20,
  },
});
