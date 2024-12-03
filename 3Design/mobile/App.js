import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './app/navigation/StackNavigator';
import { CategoryProvider } from './app/context/CategoryContext';
import { PostScreenProvider } from './app/context/PostScreenContext';
import { AuthProvider } from './app/context/AuthContext';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <PostScreenProvider>
          <CategoryProvider>
            <NavigationContainer>
              <StackNavigator />
            </NavigationContainer>
          </CategoryProvider>
        </PostScreenProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
