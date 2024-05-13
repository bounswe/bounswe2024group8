import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./App/Screens/LoginScreen";
import RegisterScreen from "./App/Screens/RegisterScreen";
import FeedScreen from "./App/Screens/FeedScreen";
import SettingsScreen from "./App/Screens/SettingsScreen";
import PostCreationScreen from "./App/Screens/PostCreationScreen";
import SearchResultScreen from "./App/Screens/SearchResultScreen";
import PostScreen from "./App/Screens/PostScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Post"
          component={PostCreationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={SearchResultScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PostScreen" component={PostScreen}
          options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
