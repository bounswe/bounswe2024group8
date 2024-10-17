import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';

export default function FeedScreen({ navigation, route }) {
  return (
    <View style={styles.body}>
      <Text>Feed Screen</Text>
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
