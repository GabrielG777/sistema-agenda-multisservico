import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Agendamento from "../pages/empresaPage";

const Stack = createStackNavigator();

export function AgendamentoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="AgendamentoPage"
        component={Agendamento}
      />
    </Stack.Navigator>
  );
}
