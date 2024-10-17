import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function CreatePostScreen({ navigation, route }) {
  return (
    <View style={styles.body}>
      <Text>Post Creation Screen</Text>
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
