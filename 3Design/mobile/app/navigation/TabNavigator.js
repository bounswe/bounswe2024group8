import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useContext } from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { Colors } from '../constants/Colors';
import FeedScreen from '../screens/FeedScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DrawerNavigator from './DrawerNavigator';
import { PostScreenContext } from '../context/PostScreenContext';

const Tab = createBottomTabNavigator();

export default function TabNavigator({ navigation, route }) {
  const { setPostScreen } = useContext(PostScreenContext);
  return (
    <View style={styles.body}>
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
                  size={37}
                  color={color}
                />
              );
            },
          }}
          listeners={{ focus: () => setPostScreen('Feed') }}
        />
        <Tab.Screen
          name='CreatePost'
          component={CreatePostScreen}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name={focused ? 'add' : 'add-outline'}
                  size={30}
                  color={color}
                  style={{
                    width: 30,
                    height: 30,
                    borderWidth: 2.5,
                    borderRadius: 10,
                    borderColor: focused ? Colors.dark : Colors.grey,
                  }}
                />
              );
            },
          }}
        />
        <Tab.Screen
          name='Gallery'
          component={DrawerNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name={focused ? 'image' : 'image-outline'}
                  size={40}
                  color={color}
                />
              );
            },
          }}
          listeners={{ focus: () => setPostScreen('Gallery') }}
        />
        <Tab.Screen
          name='Discussion'
          component={DrawerNavigator}
          options={{
            tabBarIcon: ({ focused, color }) => {
              return (
                <Ionicons
                  name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
                  size={40}
                  color={color}
                />
              );
            },
          }}
          listeners={{ focus: () => setPostScreen('Discussion') }}
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
          }}
        />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: Colors.light,
  },
});
