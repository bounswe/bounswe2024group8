import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Colors } from '../constants/Colors';
import { Categories } from '../constants/Categories';
import { CategoryContext } from '../context/CategoryContext';

import GalleryScreen from '../screens/GalleryScreen';
import DiscussionScreen from '../screens/DiscussionScreen';
import { PostScreenContext } from '../context/PostScreenContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator({ navigation, route }) {
  const { setCategory } = useContext(CategoryContext);
  const { postScreen } = useContext(PostScreenContext);

  return (
    <Drawer.Navigator
      screenOptions={{
        drawerActiveTintColor: Colors.light,
        drawerActiveBackgroundColor: Colors.dark,
        drawerStyle: {
          backgroundColor: Colors.light,
          width: '50%',
        },
        drawerType: 'slide',
        headerShown: false,
      }}
    >
      {Categories.map((category) =>
        postScreen === 'Gallery' ? (
          <Drawer.Screen
            key={category}
            name={category}
            component={GalleryScreen}
            listeners={{ focus: () => setCategory(category) }}
          />
        ) : (
          <Drawer.Screen
            key={category}
            name={category}
            component={DiscussionScreen}
            listeners={{ focus: () => setCategory(category) }}
          />
        )
      )}
    </Drawer.Navigator>
  );
}
