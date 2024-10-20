import React, { useRef } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import Post from '../components/Post';
import {GestureHandlerRootView} from "react-native-gesture-handler";

const mockPosts = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is the content of the first post. It is very interesting!',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is the content of the second post. More interesting stuff!',
  },
  {
    id: '3',
    title: 'Third Post',
    content: 'This is the content of the third post. You will love this one!',
  },
  {
    id: '4',
    title: 'Fourth Post',
    content: 'This is the content of the fourth post',
  },
];

export default function FeedScreen() {
  const flatListRef = useRef(null);

  const disableScroll = (isDisabled) => {
    if (flatListRef.current) {
      flatListRef.current.setNativeProps({ scrollEnabled: !isDisabled });
    }
  };


  return (
    <View style={styles.body}>
      <GestureHandlerRootView>
        <FlatList
          ref={flatListRef}
          data={mockPosts}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={false}
          renderItem={({ item }) => (
            <Post
              title={item.title}
              content={item.content}
              disableScroll={disableScroll}
            />
          )}
        />
      </GestureHandlerRootView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.light,
    padding: '3%',
  },
});
