import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Platform,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";

import { useEmpresaController } from '../controller/empresaController';
import { useServicoController } from '../controller/servicoController';
import { usePrestadorController } from "../controller/prestadorController";

import { CalendarPopup } from "../components/CalendarPopup";
import ResumoAgendamento from "../components/ResumoAgendamento";

function Agendamento() {
  const { empresa, loading, erro } = useEmpresaController();
  const { servicos, loadingServicos, erroServicos } = useServicoController(empresa?.id);
  const navigation = useNavigation();
  const { listarPrestadores } = usePrestadorController(1);

  const [mostrarCalendario, setMostrarCalendario] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);
  const [resumoVisible, setResumoVisible] = useState(false);
  const [resumoData, setResumoData] = useState(null);
  const [carregandoResumo, setCarregandoResumo] = useState(false);

  if (loading) return (
    <View style={styles.centerContainer}>
      <ActivityIndicator size="large" color="#F75306" />
      <Text style={styles.loadingText}>Carregando dados da empresa...</Text>
    </View>
  );

  if (erro) return (
    <View style={styles.centerContainer}>
      <Text style={styles.errorText}>Falha ao carregar dados.</Text>
      <Text style={styles.errorDetail}>{String(erro)}</Text>
    </View>
  );

  const listaServicos = Array.isArray(servicos) ? servicos : [];

  async function handleOnSelectDay({ data, horario }) {
    if (!empresa?.id) return Alert.alert('Erro', 'Empresa inválida');
    setMostrarCalendario(false);
    setCarregandoResumo(true);
    try {
      const lista = await listarPrestadores();
      setResumoData({ servico: servicoSelecionado, data, horario, prestadores: lista });
      setResumoVisible(true);
    } catch (e) {
      Alert.alert('Erro', 'Não foi possível carregar prestadores.');
    } finally {
      setCarregandoResumo(false);
    }
  }

  return (
    <View style={styles.fullContainer}>
      {/* AppBar */}
      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Icon name="menu" size={26} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Agenda++</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* ScrollView */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator
      >
        {/* Top Section */}
        <View style={styles.topSection}>
          <Image source={require("../../assets/logoBarber.jpeg")} style={styles.logoImage} />
          <Text style={styles.companyName}>{empresa?.nome ?? '—'}</Text>
          <View style={styles.infoCard}>
            <Text style={styles.infoText}>{empresa?.endereco}</Text>
            <Text style={styles.infoText}>{empresa?.telefone}</Text>
            <Text style={styles.infoText}>{empresa?.email}</Text>
          </View>
          {/* <Svg height={60} width="100%" viewBox="0 0 1440 320" style={styles.waveSvg}>
            <Path fill="#fff" d="M0,160 C480,220 960,100 1440,160 L1440,320 L0,320 Z"/>
          </Svg> */}
        </View>

        {/* Serviços */}
        <View style={styles.servicesSection}>
          <Text style={styles.servicesTitle}>Serviços disponíveis</Text>
          {loadingServicos && <Text style={styles.loadingServices}>Carregando serviços...</Text>}
          {erroServicos && <Text style={styles.errorServices}>{String(erroServicos)}</Text>}
          {!loadingServicos && listaServicos.length === 0 && (
            <Text style={styles.noServices}>Nenhum serviço disponível.</Text>
          )}

          <View style={styles.servicesContainer}>
            {listaServicos.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={styles.serviceCard}
                activeOpacity={0.8}
                onPress={() => { setServicoSelecionado(s); setMostrarCalendario(true); }}
              >
                <Text style={styles.serviceName}>{s.nome}</Text>
                <Text style={styles.serviceDescription}>{s.descricao}</Text>
                <View style={styles.serviceFooter}>
                  <Text style={styles.servicePrice}>
                    {typeof s.preco === 'number' ? `R$ ${s.preco.toFixed(2)}` : s.preco}
                  </Text>
                  <Text style={styles.serviceTime}>{s.duracao ? `${s.duracao} min` : ''}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Loading resumo */}
        {carregandoResumo && (
          <View style={styles.loadingResumo}>
            <ActivityIndicator size="small" color="#F75306" />
            <Text style={{ marginTop: 8 }}>Preparando resumo...</Text>
          </View>
        )}
      </ScrollView>

      <CalendarPopup
        visible={mostrarCalendario}
        servico={servicoSelecionado}
        onClose={() => setMostrarCalendario(false)}
        onSelectDay={handleOnSelectDay}
      />

      {resumoVisible && (
        <ResumoAgendamento
          visible={resumoVisible}
          onClose={() => setResumoVisible(false)}
          dados={resumoData}
        />
      )}
    </View>
  );
}

export default Agendamento;

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  appBar: {
    height: 60,
    backgroundColor: '#09191F',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  scroll: {
    flex: 1,
    maxHeight: '100%',
    overflowY: Platform.OS === 'web' ? 'auto' : 'visible',
  },
  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
  },
  topSection: {
    backgroundColor: '#F75306',
    paddingTop: 40,
    paddingBottom: 60,
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'relative',
  },
  logoImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    resizeMode: "cover",
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 12,
  },
  companyName: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoText: {
    color: '#09191F',
    fontSize: 15,
    marginBottom: 4,
  },
  waveSvg: {
    position: 'absolute',
    bottom: -1,
    left: 0,
  },
  servicesSection: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  servicesTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#09191F',
    marginBottom: 12,
  },
  servicesContainer: {
    marginTop: 8,
  },
  serviceCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceName: { fontSize: 16, fontWeight: 'bold', color: '#09191F' },
  serviceDescription: { fontSize: 14, color: '#555', marginTop: 4 },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  servicePrice: { fontWeight: '600', color: '#F75306' },
  serviceTime: { color: '#09191F', fontSize: 14 },
  loadingServices: { color: '#555', marginBottom: 8 },
  errorServices: { color: 'red', marginBottom: 8 },
  noServices: { color: '#555', marginBottom: 8 },
  loadingResumo: {
    padding: 16,
    alignItems: 'center',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: { marginTop: 10, fontSize: 16 },
  errorText: { fontSize: 18, color: 'red', fontWeight: 'bold' },
  errorDetail: { fontSize: 14, color: '#333', marginTop: 4 },
});
