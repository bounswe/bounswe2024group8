import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { AuthContext } from '../context/AuthContext';

export default function FeedScreen() {
  const { user } = useContext(AuthContext);
  return (
    <View style={styles.body}>
      <Text style={styles.tempText}>
        Welcome Back {user.firstName} {user.lastName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.light,
    alignItems: 'center',
    padding: '3%',
  },
  tempText: {
    fontSize: 20,
    fontWeight: '700',
  },
});
