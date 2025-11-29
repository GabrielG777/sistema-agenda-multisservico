import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Historico from "../pages/historico";

const Stack = createStackNavigator();

export function HistoricoStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoricoPage" component={Historico} />
    </Stack.Navigator>
  );
}
