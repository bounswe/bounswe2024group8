import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  Modal,
} from 'react-native';
import axios from 'axios';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import OBJViewer from '../components/ObjectViewer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function PostScreen({ route }) {
  let {
    postId,
    title,
    content,
    model,
    username,
    userId,
    filterPostsCallback,
    reactionType,
  } = route.params;

  content = parseString(content)[0];

  const [isLiked, setIsLiked] = useState(
    reactionType === 'LIKE' ? true : false
  );
  const [isDisliked, setIsDisliked] = useState(
    reactionType === 'DISLIKE' ? true : false
  );
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [annotations, setAnnotations] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] = useState(null);
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  const fetchPostData = () => {
    axios
      .get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}`, {
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
      .get(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/comments/post/${postId}`,
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((response) => {
        //console.log(response.data);
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

  const fetchAnnotations = () => {
    // axios
    //   .get(`${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}/annotations`, {
    //     headers: { Authorization: `Bearer ${user.accessToken}` },
    //   })
    //   .then((response) => {
    //     setAnnotations(response.data);
    //   })
    //   .catch((error) => console.error('Error fetching annotations:', error));

    setAnnotations([
      {
        "@context": "http://www.w3.org/ns/anno.jsonld",
        "id": "http://example.org/anno6",
        "type": "Annotation",
        "bodyValue": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        "creator": {
          "id": "http://example.org/uer1s",
          "type": "Person",
          "nickname": "User 1"
        },
        "created": "2021-06-01T12:00:00Z",
        "target": {
          "source": "http://example.org/ebook1",
          "selector": {
            "type": "TextPositionSelector",
            "start": 5,
            "end": 10
          }
        }
      },
    ])
  };

  const handleAnnotationPress = (annotation) => {
    setSelectedAnnotation(annotation);
    setModalVisible(true);
  };

  const renderAnnotatedText = () => {
    if (!annotations || annotations.length === 0) {
      return <Text style={styles.content}>{content}</Text>;
    }

    const parts = [];
    let currentIndex = 0;

    annotations.forEach((annotation, index) => {
      const { start, end } = annotation.target.selector;
      if (start > currentIndex) {
        parts.push(content.slice(currentIndex, start));
      }

      parts.push(
        <Text
          key={`annotation-${index}`}
          style={styles.annotatedText}
          onPress={() => handleAnnotationPress(annotation)}
        >
          {content.slice(start, end)}
        </Text>
      );

      currentIndex = end;
    });

    if (currentIndex < content.length) {
      parts.push(content.slice(currentIndex));
    }

    return <Text style={styles.content}>{parts}</Text>;
  };

  useEffect(() => {
    fetchPostData();
    fetchAnnotations();
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
    if (isLiked) {
      axios
        .post(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}/react`,
          {
            reactionType: 'NONE',
            bookmark: false,
          },
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        )
        .then((response) => {
          setLikes(response.data.likes);
          setDislikes(response.data.dislikes);
          setIsLiked(false);
        })
        .catch((error) => console.error(error));
    } else {
      axios
        .post(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}/react`,
          {
            reactionType: 'LIKE',
            bookmark: false,
          },
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        )
        .then((response) => {
          setLikes(response.data.likes);
          setDislikes(response.data.dislikes);
          setIsLiked(true);
          setIsDisliked(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const dislikePost = () => {
    if (isDisliked) {
      axios
        .post(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}/react`,
          {
            reactionType: 'NONE',
            bookmark: false,
          },
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        )
        .then((response) => {
          setLikes(response.data.likes);
          setDislikes(response.data.dislikes);
          setIsDisliked(false);
        })
        .catch((error) => console.error(error));
    } else {
      axios
        .post(
          `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/${postId}/react`,
          {
            reactionType: 'DISLIKE',
            bookmark: false,
          },
          {
            headers: { Authorization: `Bearer ${user.accessToken}` },
          }
        )
        .then((response) => {
          setLikes(response.data.likes);
          setDislikes(response.data.dislikes);
          setIsDisliked(true);
          setIsLiked(false);
        })
        .catch((error) => console.error(error));
    }
  };

  const likeComment = (comment) => {
    axios
      .post(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/comment/${
          comment.commentId
        }/react?reactionType=${
          comment.reactionType === 'LIKE' ? 'NONE' : 'LIKE'
        }`,
        {},
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((response) => {
        setComments((prevComments) =>
          prevComments.map((currentComment) =>
            currentComment.commentId === comment.commentId
              ? {
                  ...currentComment,
                  likes: response.data.likes,
                  dislikes: response.data.dislikes,
                  reactionType:
                    comment.reactionType === 'LIKE' ? 'NONE' : 'LIKE',
                }
              : currentComment
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const dislikeComment = (comment) => {
    axios
      .post(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/comment/${
          comment.commentId
        }/react?reactionType=${
          comment.reactionType === 'DISLIKE' ? 'NONE' : 'DISLIKE'
        }`,
        {},
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
        }
      )
      .then((response) => {
        setComments((prevComments) =>
          prevComments.map((currentComment) =>
            currentComment.commentId === comment.commentId
              ? {
                  ...currentComment,
                  likes: response.data.likes,
                  dislikes: response.data.dislikes,
                  reactionType:
                    comment.reactionType === 'DISLIKE' ? 'NONE' : 'DISLIKE',
                }
              : currentComment
          )
        );
      })
      .catch((error) => console.error(error));
  };

  const submitComment = () => {
    axios
      .post(
        `${process.env.EXPO_PUBLIC_VITE_API_URL}/api/v1/posts/comment`,
        {
          postId: postId,
          text: newComment,
        },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then(() => {
        setNewComment(''); // Clear the comment input
        fetchComments(); // Re-fetch comments after submission
      })
      .catch((error) => console.error(error));
  };

  const navigateToUserProfile = () => {
    navigation.navigate('Profile', { userId: userId });
  };

  function parseString(input) {  // returns string[]
    const result = [];
    let current = '';
    for (let i = 0; i < input.length; i++) {
      if (input[i] === '&') {
        if (input[i + 1] === '&') {
          current += '&'; // Skip parsing and keep the ampersands
          i++; // Skip the next ampersand
        } else {
          result.push(current); // Add the current string to the result
          current = ''; // Reset for the next part
        }
      } else {
        current += input[i];
      }
    }
    // Add any remaining string after the loop
    if (current) {
      result.push(current);
    }
    return result;
  }

  return (
    <View style={styles.container}>
      {username && (
        <TouchableOpacity onPress={navigateToUserProfile}>
          <Text style={styles.username}>{username}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View>{renderAnnotatedText()}</View>
      {/*<Text style={styles.content}>{parseString(content)[0]}</Text>*/}
      {model && (
        <View style={styles.modelContainer}>
          <GestureHandlerRootView>
            <OBJViewer objFilePath={model} />
          </GestureHandlerRootView>
        </View>
      )}

      <View style={styles.reactionsContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={likePost}>
          <MaterialIcons
            name={isLiked ? 'thumb-up' : 'thumb-up-off-alt'}
            size={40}
            color={Colors.dark}
          />
          <Text style={styles.iconButtonText}>{likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={dislikePost}>
          <MaterialIcons
            name={isDisliked ? 'thumb-down' : 'thumb-down-off-alt'}
            size={40}
            color={Colors.dark}
          />
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
            <View style={styles.commentReactionsContainer}>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => likeComment(item)}
              >
                <MaterialIcons
                  name={
                    item.reactionType === 'LIKE'
                      ? 'thumb-up'
                      : 'thumb-up-off-alt'
                  }
                  size={30}
                  color={Colors.dark}
                />
                <Text style={styles.iconButtonText}>{item.likes}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconButton}
                onPress={() => dislikeComment(item)}
              >
                <MaterialIcons
                  name={
                    item.reactionType === 'DISLIKE'
                      ? 'thumb-down'
                      : 'thumb-down-off-alt'
                  }
                  size={30}
                  color={Colors.dark}
                />
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
          placeholder='Add a comment'
          value={newComment}
          onChangeText={setNewComment}
        />
        <Button title='Submit' onPress={submitComment} />
      </View>

      {/* Annotation Modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Annotation</Text>
            {selectedAnnotation && (
              <View>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Author: </Text>
                  {selectedAnnotation.creator.nickname}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Created: </Text>
                  {new Date(selectedAnnotation.created).toLocaleString()}
                </Text>
                <Text style={styles.modalText}>
                  <Text style={styles.modalLabel}>Content: </Text>
                  {selectedAnnotation.bodyValue}
                </Text>
              </View>
            )}
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
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
    gap: 10, // Space between buttons
  },
  commentReactionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 10,
    gap: 10, // Space between buttons
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
  annotatedText: {
    color: Colors.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: Colors.light,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 5,
  },
  modalLabel: {
    fontWeight: 'bold',
  },
});
