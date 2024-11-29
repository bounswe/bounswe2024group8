import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { StyleSheet, Platform, StatusBar, SafeAreaView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Colors } from '../constants/Colors';
import FeedScreen from '../screens/FeedScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import { PostScreenContext } from '../context/PostScreenContext';
import PostCreationScreen from '../screens/CreatePostScreen';
import SearchScreen from '../screens/SearchScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation, route }) {
  const { setPostScreen } = useContext(PostScreenContext);
  return (
    <SafeAreaView style={styles.body}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopColor: Colors.grey,
            height: 50,
            backgroundColor: Colors.light,
          },
          tabBarActiveTintColor: Colors.dark,
          tabBarInactiveTintColor: Colors.grey,
        }}
      >
        <Tab.Screen
          name='Feed'
          component={FeedScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name={focused ? 'home' : 'home-outline'}
                  size={40}
                  color={color}
                />
              );
            },
            unmountOnBlur: true,
          }}
          listeners={{ focus: () => setPostScreen('Feed') }}
        />
        <Tab.Screen
          name='CreatePost'
          component={PostCreationScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Icon
                  name={focused ? 'plus-square' : 'plus-square-o'}
                  size={37}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name='Search'
          component={SearchScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name={focused ? 'search' : 'search-outline'}
                  size={40}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name='Categories'
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name={focused ? 'grid' : 'grid-outline'}
                  size={40}
                  color={color}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name={focused ? 'person-circle' : 'person-circle-outline'}
                  size={40}
                  color={color}
                />
              );
            },
            unmountOnBlur: true,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: Colors.light,
  },
});
