import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Colors } from '../constants/Colors';
import { AuthContext } from "../context/AuthContext";
import Icon from 'react-native-vector-icons/FontAwesome';
import OBJViewer from '../components/ObjectViewer';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function PostScreen({ route }) {
  const { postId, title, content, model, username, userId, filterPostsCallback } = route.params;
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const fetchPostData = () => {
    axios.get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}`, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then((response) => {
        const { likes, dislikes } = response.data;
        setLikes(likes);
        setDislikes(dislikes);
      })
      .catch((error) => console.error(error));

    fetchComments();
  };

  const fetchComments = () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/comments/post/${postId}`, {
        headers: { Authorization: `Bearer ${user.accessToken}` },
      })
      .then((response) => {
        setComments(response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          setComments(null);
        } else {
          console.error(error);
        }
      });
  };

  useEffect(() => {
    fetchPostData();
  }, [postId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      if (filterPostsCallback) {
        filterPostsCallback();
        console.log('filterPostsCallback executed');
      }
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [navigation, filterPostsCallback]);

  const likePost = () => {
    axios.post(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}/react`, {
      "reactionType": "LIKE",
      "bookmark": false
    }, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then(() => setLikes((prevLikes) => prevLikes + 1))
      .catch((error) => console.error(error));
  };

  const dislikePost = () => {
    axios.post(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}/react`, {
      "reactionType": "DISLIKE",
      "bookmark": false
    }, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then(() => setDislikes((prevDislikes) => prevDislikes + 1))
      .catch((error) => console.error(error));
  };

  const likeComment = (commentId) => {
    axios.post(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/comment/${commentId}/react?reactionType=LIKE`, {}, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then(() => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? { ...comment, likes: comment.likes + 1 }
              : comment
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const dislikeComment = (commentId) => {
    axios.post(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/comment/${commentId}/react?reactionType=DISLIKE`, {}, {
      headers: { Authorization: `Bearer ${user.accessToken}` },
    })
      .then(() => {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.commentId === commentId
              ? { ...comment, dislikes: comment.dislikes + 1 }
              : comment
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const submitComment = () => {
    axios.post(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/comment`, {
      "postId": postId,
      "text": newComment,
    }, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    })
      .then(() => {
        setNewComment(''); // Clear the comment input
        fetchComments(); // Re-fetch comments after submission
      })
      .catch((error) => console.error(error));
  };

  const navigateToUserProfile = () => {
    navigation.navigate('Profile', { userId: userId });
  };

  return (
    <View style={styles.container}>
      {username && (
        <TouchableOpacity onPress={navigateToUserProfile}>
          <Text style={styles.username}>{username}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      {model && (
        <View style={styles.modelContainer}>
          <GestureHandlerRootView>
            <OBJViewer objFilePath={model} />
          </GestureHandlerRootView>
        </View>
      )}

      <View style={styles.reactionsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={likePost}>
          <Icon name="thumbs-up" size={20} color="green" />
          <Text style={styles.iconButtonText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={dislikePost}>
          <Icon name="thumbs-down" size={20} color="red" />
          <Text style={styles.iconButtonText}>{dislikes}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.commentsTitle}>Comments</Text>
      <FlatList
        data={comments || []} // Use an empty array if comments are null
        keyExtractor={(item) => item.commentId?.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentUsername}>{item.user.nickName}</Text>
            <Text>{item.text}</Text>
            <View style={styles.reactionsContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={() => likeComment(item.commentId)}>
                <Icon name="thumbs-up" size={15} color="green" />
                <Text style={styles.iconButtonText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => dislikeComment(item.commentId)}>
                <Icon name="thumbs-down" size={15} color="red" />
                <Text style={styles.iconButtonText}>{item.dislikes}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          comments === null ? (
            <Text style={styles.noCommentsText}>No comments yet</Text>
          ) : null
        }
      />

      <View style={styles.newCommentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment"
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title="Submit" onPress={submitComment} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.light,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    marginBottom: 20,
  },
  modelContainer: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  commentsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: Colors.dark,
  },
  comment: {
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    marginBottom: 10,
  },
  newCommentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  reactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    gap: 15, // Space between buttons
  },
  iconButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  iconButtonText: {
    marginLeft: 5,
    fontSize: 14,
    color: Colors.dark,
  },
  noCommentsText: {
    textAlign: 'center',
    color: '#888',
    fontStyle: 'italic',
    marginVertical: 20,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
    fontStyle: 'italic',
  },
});
