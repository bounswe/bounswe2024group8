import React, { Component } from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import OBJViewer from '../components/ObjectViewer';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  render() {
    const { title, content, model, id, navigation, disableScroll } = this.props;

    if(model) {
      return (
        <View style={styles.postContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("clicked");
                navigation.navigate('Post', {
                postId: id,
                title: title,
                content: content,
                model: model,
                });
              }
            }>
              <Text style={styles.postTitle}>{title}</Text>
            </TouchableOpacity>
            <Text style={styles.postContent}>{content}</Text>
          </View>
          <View style={styles.modelView}>
            <OBJViewer objFilePath={model} />
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.postContainer}>
          <View>
            <TouchableOpacity
              onPress={() => {
                console.log("clicked");
                navigation.navigate('Post', {
                  postId: id,
                  title: title,
                  content: content,
                  model: model,
                });
              }
              }>
              <Text style={styles.postTitle}>{title}</Text>
            </TouchableOpacity>
            <Text style={styles.postContent}>{content}</Text>
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
});

export default Post;
