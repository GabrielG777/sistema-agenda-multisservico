// App.js
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppRoutes } from './src/routes/appRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppRoutes />
    </NavigationContainer>
  );
}
