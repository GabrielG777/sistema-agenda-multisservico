import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { useEmpresaController } from '../controller/empresaController';
import { useServicoController } from '../controller/servicoController';

export function Agendamento() {
  const { empresa, loading, erro } = useEmpresaController();
  const { servicos, loadingServicos, erroServicos } = useServicoController(empresa?.id);

  if (loading) {
    return (
      <View style={styles.containerCentral}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Carregando dados da empresa...</Text>
      </View>
    );
  }

  if (erro) {
    return (
      <View style={styles.containerCentral}>
        <Text style={styles.errorText}>Falha ao carregar dados.</Text>
        <Text style={styles.errorDetail}>Detalhe: {erro}</Text>
      </View>
    );
  }

  return (
    <View style={styles.fullContainer}>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Agenda++</Text>
      </View>

      <ScrollView style={styles.scroll}>
        {/* Topo laranja com ondulação */}
        <View style={styles.topSection}>
          <View style={styles.logoCircle} />

          <Text style={styles.companyName}>{empresa.nome}</Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoText}>📍 {empresa.endereco}</Text>
            <Text style={styles.infoText}>📞 {empresa.telefone}</Text>
            <Text style={styles.infoText}>📧 {empresa.email}</Text>
            <Text style={styles.infoText}>CNPJ: {empresa.cnpj}</Text>
          </View>

          {/* ONDULAÇÃO */}
          <Svg
            height="70"
            width="100%"
            viewBox="0 0 1440 320"
            style={{ position: 'absolute', bottom: -1 }}
          >
            <Path
              fill="#F75306"
              d="
        M0,160 
        C240,260 480,60 720,120 
        C960,180 1200,260 1440,200 
        V320 H0 Z
      "
            />
          </Svg>
        </View>


        <View style={styles.bottomSection}>
          <Text style={styles.servicesTitle}>Serviços disponíveis</Text>

          <View style={styles.servicesContainer}>
            {loadingServicos && <Text style={{ color: '#fff' }}>Carregando serviços...</Text>}

            {erroServicos && <Text style={{ color: 'red' }}>{erroServicos}</Text>}

            {servicos.map(s => (
              <TouchableOpacity key={s.id} style={styles.serviceButton}>
                <Text style={styles.serviceName}>{s.nome}</Text>
                <Text style={styles.serviceDescription}>{s.descricao}</Text>
                <Text style={styles.servicePrice}> {s.preco}</Text>
                <Text style={styles.serviceTime}>⏱ {s.duracao} min</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  scroll: {
    flex: 1,
  },

  /* APP BAR */
  appBar: {
    height: 60,
    backgroundColor: '#09191F',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  /* METADE SUPERIOR */
  topSection: {
    backgroundColor: '#F75306',
    paddingTop: 30,
    paddingBottom: 80,
    alignItems: 'center',
    position: 'relative',
  },


  logoCircle: {
    width: 110,
    height: 110,
    borderRadius: 100,
    backgroundColor: '#fff',
    marginBottom: 15,
  },

  companyName: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
  },

  infoCard: {
    backgroundColor: '#09191F',
    width: '85%',
    padding: 18,
    borderRadius: 12,
  },

  infoText: {
    color: '#fff',
    fontSize: 15,
    marginBottom: 4,
  },

  /* METADE INFERIOR */
  bottomSection: {
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },

  servicesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#09191F',
    marginBottom: 10,
  },

  servicesContainer: {
    backgroundColor: '#09191F',
    width: '90%',
    borderRadius: 12,
    padding: 15,
  },

  serviceButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
  },

  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#09191F',
  },
  serviceDescription: {
    fontSize: 14,
    color: '#09191F',
  },
  servicePrice: {
    marginTop: 5,
    color: '#09191F',
  },
  serviceTime: {
    color: '#09191F',
  },

  /* LOADING / ERRO */
  containerCentral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  errorDetail: {
    fontSize: 14,
    color: '#333',
    marginTop: 5,
  },
});
