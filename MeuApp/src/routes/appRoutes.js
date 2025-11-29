import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { AgendamentoStack } from "./stack.agendamento.routes";
import { HistoricoStack } from "./stack.historico.routes";
import {DetalhesAgendamento} from "../components/DetalhesAgendamento";

const Drawer = createDrawerNavigator();

export function AppRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,

        drawerStyle: {
          backgroundColor: "#09191F",   // fundo escuro
          width: 260,
        },

        drawerActiveTintColor: "#F75306", // item selecionado = laranja padrão
        drawerInactiveTintColor: "#FFFFFF", // itens normais = branco

        drawerActiveBackgroundColor: "rgba(255, 255, 255, 0.1)", // leve brilho

        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: "500",
        },
      }}
    >
      <Drawer.Screen
        name="Agendamento"
        component={AgendamentoStack}
        options={{ drawerLabel: "Agendamento" }}
      />

      <Drawer.Screen
        name="Historico"
        component={HistoricoStack}
        options={{ drawerLabel: "Histórico" }}
      />

    </Drawer.Navigator>
  );
}
