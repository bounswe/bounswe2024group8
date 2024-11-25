import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabNavigator from './TabNavigator';
import PostScreen from "../screens/PostScreen";
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Register'
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Home'
        component={TabNavigator}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{
          title: 'Post',
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{ title: 'Leaderboard' }}
      />
    </Stack.Navigator>
  );
}
