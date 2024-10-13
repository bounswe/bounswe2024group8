import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants/Colors';

export default function HomeScreen({ navigation, route }) {
  return (
    <View style={styles.body}>
      <Text>
        Welcome Back! {route.params.email} {route.params.password}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    minHeight:
      Math.round(Dimensions.get('window').height * 0.8) +
      (Platform.OS === 'android' ? StatusBar.currentHeight : 0),
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.light,
  },
});
