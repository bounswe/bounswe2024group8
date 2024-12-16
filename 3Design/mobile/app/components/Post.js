import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import OBJViewer from '../components/ObjectViewer';

function parseString(input) {
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

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  render() {
    const {
      title,
      content,
      model,
      id,
      userId,
      username,
      reactionType,
      navigation,
      disableScroll,
      clearFilteredPosts,
      filterPostsCallback,
    } = this.props;

    if (model) {
      return (
        <View style={styles.postContainer}>
          {username && <Text style={styles.username}>{username}</Text>}
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Post', {
                  postId: id,
                  title: title,
                  content: content,
                  model: model,
                  username: username,
                  userId: userId,
                  reactionType: reactionType,
                  filterPostsCallback: filterPostsCallback,
                });
                if (clearFilteredPosts) {
                  clearFilteredPosts();
                }
              }}
            >
              <Text style={styles.postTitle}>{title}</Text>
            </TouchableOpacity>
            <Text style={styles.postContent}>{parseString(content)[0]}</Text>
          </View>
          <View style={styles.modelView}>
            <OBJViewer objFilePath={model} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.postContainer}>
          {username && <Text style={styles.username}>{username}</Text>}
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Post', {
                  postId: id,
                  title: title,
                  content: content,
                  model: model,
                  username: username,
                  userId: userId,
                  reactionType: reactionType,
                  filterPostsCallback: filterPostsCallback,
                });
                if (clearFilteredPosts) {
                  clearFilteredPosts();
                }
              }}
            >
              <Text style={styles.postTitle}>{title}</Text>
            </TouchableOpacity>
            <Text style={styles.postContent}>{parseString(content)[0]}</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    marginTop: 5,
  },
  modelView: {
    width: '100%',
    height: 300,
    backgroundColor: 'white',
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
    fontStyle: 'italic',
  },
});

export default Post;
