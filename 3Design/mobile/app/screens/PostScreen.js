import React, {useContext, useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Button } from 'react-native';
import axios from 'axios';
import { Colors } from '../constants/Colors';
import {AuthContext} from "../context/AuthContext";

export default function PostScreen({ route }) {
  const { postId, title, content, model } = route.params;
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { user } = useContext(AuthContext);

  const fetchComments = () => {
    axios.get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/comments/post/${postId}`, {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

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


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.content}>{content}</Text>
      {model && (
        <View style={styles.modelContainer}>
          {/* Assuming OBJViewer is a component to view the 3D model */}
          <OBJViewer objFilePath={model} />
        </View>
      )}
      <Text style={styles.commentsTitle}>Comments</Text>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.commentId.toString()}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentUsername}>{item.user.nickName}</Text>
            <Text>{item.text}</Text>
          </View>
        )}
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
});
