import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function ProfileScreen() {
  return (
    <View style={styles.body}>
      <Text>Profile Screen</Text>
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
