import { NavigationContainer } from '@react-navigation/native';

import StackNavigator from './app/navigation/StackNavigator';
import { CategoryProvider } from './app/context/CategoryContext';
import { PostScreenProvider } from './app/context/PostScreenContext';

export default function App() {
  return (
    <PostScreenProvider>
      <CategoryProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </CategoryProvider>
    </PostScreenProvider>
  );
}
