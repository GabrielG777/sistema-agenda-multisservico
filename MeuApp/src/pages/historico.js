import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
    Modal,
    ScrollView 
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import { useAgendamentoController } from "../controller/useAgendamentoController";

export default function Historico() {
    const navigation = useNavigation();
    const idCliente = 3;

    const { agendamentos, loading, erro } = useAgendamentoController(idCliente);

    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);

    function abrirPopup(item) {
        setSelected(item);
        setVisible(true);
    }

    function fecharPopup() {
        setVisible(false);
        setSelected(null);
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => abrirPopup(item)}
        >
            <Text style={styles.title}>{item.descricao}</Text>
            <Text style={styles.sub}>Prestador: {item.prestador.usuario.nome}</Text>
            <Text style={styles.sub}>Serviço: {item.prestador.servico.nome}</Text>
            <Text style={styles.sub}>Valor: R$ {item.valor}</Text>
            <Text style={styles.sub}>Início: {new Date(item.hora_inicio).toLocaleString()}</Text>
        </TouchableOpacity>
    );

    const ListEmpty = () => (
        <View style={styles.emptyContainer}> 
            <Text style={styles.emptyText}>Nenhum agendamento encontrado.</Text>
        </View>
    );

    // Estilo para garantir rolagem no ambiente web (MESCLA DE ESTILOS)
    const flatListWebStyle = {
        flex: 1, // Base Flexbox
        // Propriedades CSS específicas para React Native Web/navegadores
        overflow: 'auto', 
        WebkitOverflowScrolling: 'touch', 
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}> 
            
            {/* APP BAR */}
            <View style={styles.appBar}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={26} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.appBarTitle}>Histórico</Text>
                <View style={{ width: 26 }} />
            </View>

            {/* LOADING */}
            {loading && (
                <View style={styles.center}>
                    <ActivityIndicator size="large" color="#F75306" />
                    <Text style={{ color: "#09191F", marginTop: 10 }}>Carregando histórico...</Text>
                </View>
            )}

            {/* ERRO */}
            {erro && (
                <View style={styles.center}>
                    <Text style={{ color: "red" }}>Erro ao carregar histórico</Text>
                </View>
            )}

            {/* TELA PRINCIPAL COM LISTA E SCROLL (FlatList) */}
            {!loading && !erro && (
                <FlatList
                    data={agendamentos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                    // APLICANDO ESTILO CORRIGIDO DIRETAMENTE AQUI
                    style={flatListWebStyle} 
                    contentContainerStyle={
                        agendamentos?.length > 0
                            ? { padding: 20 }
                            : { flexGrow: 1, justifyContent: 'center' }
                    }
                    ListEmptyComponent={ListEmpty}
                />
            )}

            {/* POP-UP (Modal) */}
            <Modal visible={visible} transparent animationType="fade">
                <View style={styles.modalFundo}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>Detalhes do Agendamento</Text>

                        <ScrollView 
                            style={{ maxHeight: 400 }}
                            contentContainerStyle={{ paddingVertical: 10 }}
                        >
                            {selected && (
                                <>
                                    <Text style={styles.modalText}>
                                        <Text style={styles.bold}>Descrição: </Text>
                                        {selected.descricao}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        <Text style={styles.bold}>Prestador: </Text>
                                        {selected.prestador.usuario.nome}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        <Text style={styles.bold}>Serviço: </Text>
                                        {selected.prestador.servico.nome}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        <Text style={styles.bold}>Valor: </Text>
                                        R$ {selected.valor}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        <Text style={styles.bold}>Tempo: </Text>
                                        {/* CORREÇÃO AQUI: Usar ?? 0 para evitar falha se 'tempo' for null */}
                                        {selected.prestador.servico.tempo ?? 0} min
                                    </Text>
                                    <Text style={styles.modalText}>
                                        <Text style={styles.bold}>Início: </Text>
                                        {new Date(selected.hora_inicio).toLocaleString()}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        <Text style={styles.bold}>Status: </Text>
                                        {selected.status}
                                    </Text>
                                </>
                            )}
                        </ScrollView>

                        <TouchableOpacity style={styles.btnFechar} onPress={fecharPopup}>
                            <Text style={styles.btnText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    // Removendo flatList daqui, pois o estilo específico do web está sendo aplicado inline.
    card: {
        backgroundColor: "#09191F",
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
    },
    title: {
        color: "#F75306",
        fontSize: 18,
        fontWeight: "bold",
    },
    sub: {
        color: "#fff",
        marginTop: 4,
    },
    // ESTILOS PARA LISTA VAZIA
    emptyContainer: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
    },
    emptyText: {
        color: "#09191F",
        fontSize: 16,
    },

    // MODAL
    modalFundo: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.6)",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 20
    },
    modalBox: {
        width: "100%",
        backgroundColor: "#09191F",
        padding: 20,
        borderRadius: 14,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        color: "#F75306",
        fontWeight: "bold",
        marginBottom: 15,
        textAlign: "center"
    },
    modalText: {
        color: "#fff",
        fontSize: 15,
        marginBottom: 6,
    },
    bold: {
        fontWeight: "bold",
        color: "#F75306",
    },
    btnFechar: {
        marginTop: 20,
        backgroundColor: "#F75306",
        paddingVertical: 12,
        borderRadius: 10,
    },
    btnText: {
        color: "#fff",
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
    }
});