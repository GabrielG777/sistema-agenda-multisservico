// src/routes/app.routes.jsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importe suas telas
import { Agendamento } from '../pages/empresaPage'; // Sua tela atual
// import { Login } from '../pages/Login'; // Exemplo de outra tela

// Cria a instância do Stack Navigator
const { Navigator, Screen } = createStackNavigator();

// A rota principal do seu aplicativo (após o login, se houver)
export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      
      {/* 1. Rota de Agendamento */}
      <Screen 
        name="AgendamentoPrincipal" 
        component={Agendamento} 
      />

      {/* 2. Rota de Detalhes do Agendamento (exemplo futuro) */}
      <Screen 
        name="DetalhesAgendamento" 
        component={Agendamento} 
        options={{ headerShown: true, title: 'Detalhes' }} // Exibe o cabeçalho
      />
      
      {/* 3. Outras Rotas (Serviços, Dashboard, etc.) */}
      
    </Navigator>
  );
}