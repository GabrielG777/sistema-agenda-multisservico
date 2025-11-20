// App.js
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

// Importe seu arquivo de rotas centralizado
import { AppRoutes } from './src/routes/appRoutes'; 

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <AppRoutes /> {/* Onde definimos as telas */}
    </NavigationContainer>
  );
}