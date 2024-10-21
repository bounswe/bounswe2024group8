import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './app/navigation/StackNavigator';
import { CategoryProvider } from './app/context/CategoryContext';
import { PostScreenProvider } from './app/context/PostScreenContext';
import { AuthProvider } from './app/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <PostScreenProvider>
        <CategoryProvider>
          <NavigationContainer>
            <StackNavigator />
          </NavigationContainer>
        </CategoryProvider>
      </PostScreenProvider>
    </AuthProvider>
  );
}
