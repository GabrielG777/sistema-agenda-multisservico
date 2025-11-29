import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function DetalhesAgendamento() {
  const navigation = useNavigation();
  const route = useRoute();
  const { agendamento } = route.params;

  return (
    <View style={{ flex: 1 }}>
      
      {/* APP BAR */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={26} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.appBarTitle}>Detalhes</Text>

        <View style={{ width: 26 }} />
      </View>

      <View style={styles.container}>
        
        <Text style={styles.title}>{agendamento.descricao}</Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Prestador: </Text>
          {agendamento.prestador.usuario.nome}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Serviço: </Text>
          {agendamento.prestador.servico.nome}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Valor: </Text>
          R$ {agendamento.valor}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Início: </Text>
          {new Date(agendamento.hora_inicio).toLocaleString()}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Fim: </Text>
          {new Date(agendamento.hora_fim).toLocaleString()}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Status: </Text>
          {agendamento.status}
        </Text>

        <Text style={styles.item}>
          <Text style={styles.label}>Empresa: </Text>
          {agendamento.empresa.nome}
        </Text>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appBar: {
    height: 60,
    backgroundColor: "#09191F",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  appBarTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    padding: 20,
  },
  title: {
    color: "#F75306",
    fontSize: 22,
    marginBottom: 20,
  },
  item: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    color: "#F75306",
    fontWeight: "bold",
  },
});
