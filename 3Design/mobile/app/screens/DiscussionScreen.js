import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CategoryContext } from '../context/CategoryContext';

export default function DiscussionScreen({ navigation, route }) {
  const { category } = useContext(CategoryContext);

  return (
    <View style={styles.body}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Ionicons name='menu' size={40} color={Colors.light} />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <Text>Discussion Screen</Text>
        <Text>{category}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    display: 'flex',
    backgroundColor: Colors.light,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '2%',
    alignItems: 'center',
    height: 50,
    width: '100%',
    backgroundColor: Colors.dark,
  },
  contentContainer: {
    padding: '3%',
  },
});
