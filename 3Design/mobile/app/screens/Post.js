import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from "react-native";
import { ModelView } from 'react-native-3d-model-view';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  onLoadModelStart() {
    this.setState({ message: 'Loading model...' });
    console.log('[react-native-3d-model-view]:', 'Load model start.');
  }

  onLoadModelSuccess() {
    this.setState({ message: 'Loading model success!' });
    console.log('[react-native-3d-model-view]:', 'Load model success.');
  }

  onLoadModelError(error) {
    this.setState({ message: 'Loading model error :(' });
    console.log('[react-native-3d-model-view]:', 'Load model error.');
  }

  render() {
    const { title, content, disableScroll } = this.props;

    return (
      <View style={styles.postContainer}>
        <View
        >
          <Text style={styles.postTitle}>{title}</Text>
          <Text style={styles.postContent}>{content}</Text>
        </View>
        <View>
          <ModelView
            onStartShouldSetResponder={() => {
              disableScroll(true);
              return true;
            }}
            onResponderRelease={() => {
              disableScroll(false);
            }}
            style={styles.modelView}
            source={{
              zip: 'https://github.com/BonnierNews/react-native-3d-model-view/blob/master/example/obj/Hamburger.zip?raw=true',
              unzippedFolderName: 'Hamburger',
            }}
            onLoadModelStart={() => this.onLoadModelStart()}
            onLoadModelSuccess={() => this.onLoadModelSuccess()}
            onLoadModelError={(error) => this.onLoadModelError(error)}
          />
        </View>
      </View>
    );
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
