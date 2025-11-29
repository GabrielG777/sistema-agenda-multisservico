import React, { useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet, ScrollView, Alert } from "react-native";
import { useAgendamentoController } from "../controller/useAgendamentoController";

export default function ResumoAgendamento({ visible, onClose, dados }) {
    if (!dados) return null;

    const { servico, data, horario, prestadores } = dados;
    const { criar } = useAgendamentoController();

    const [profissionalSelecionado, setProfissionalSelecionado] = useState(null);

    const dataFormatada = (() => {
        if (!data || !(data instanceof Date)) return String(data);
        return `${String(data.getDate()).padStart(2, "0")}/${String(data.getMonth() + 1).padStart(2, "0")}/${data.getFullYear()}`;
    })();

    // --- VARIÁVEIS FIXAS SEGUINDO O PADRÃO QUE VOCÊ FORNECEU ---
    // (A API pode estar esperando esses valores exatos)
    const ID_CLIENTE_FIXO = 3;
    const ID_EMPRESA_FIXO = 1;
    const STATUS_FIXO = "pendente";
    // ------------------------------------------------------------


    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={stylesResumo.overlay}>
                <View style={stylesResumo.box}>
                    <ScrollView>

                        <Text style={stylesResumo.titulo}>Resumo do Agendamento</Text>

                        <Text style={stylesResumo.item}>
                            <Text style={stylesResumo.label}>Serviço: </Text>{servico?.nome ?? '-'}
                        </Text>

                        <Text style={stylesResumo.item}>
                            <Text style={stylesResumo.label}>Data: </Text>{dataFormatada}
                        </Text>

                        <Text style={stylesResumo.item}>
                            <Text style={stylesResumo.label}>Horário: </Text>{horario}
                        </Text>

                        <Text style={[stylesResumo.label, { marginTop: 15 }]}>Profissionais disponíveis:</Text>

                        {/* LISTA DE PROFISSIONAIS */}
                        {Array.isArray(prestadores) && prestadores.length > 0 ? (
                            prestadores.map((p) => {
                                const isSelected = profissionalSelecionado?.id === p.id;

                                return (
                                    <Pressable
                                        key={p.id}
                                        style={({ pressed }) => [
                                            stylesResumo.profissionalCard,
                                            isSelected && stylesResumo.profissionalSelecionado,
                                            { opacity: pressed ? 0.8 : 1 }
                                        ]}
                                        onPress={() => setProfissionalSelecionado(isSelected ? null : p)}
                                    >
                                        <View style={stylesResumo.checkboxWrapper}>
                                            <View style={[stylesResumo.checkbox, isSelected && stylesResumo.checkboxMarcado]} />
                                        </View>

                                        <View style={{ flex: 1 }}>
                                            <Text style={stylesResumo.profissionalNome}>
                                                {p.usuario?.nome ?? p.nome ?? "-"}
                                            </Text>
                                            <Text style={stylesResumo.profissionalServico}>
                                                {p.servico?.nome ?? "-"}
                                            </Text>
                                        </View>
                                    </Pressable>
                                );
                            })
                        ) : (
                            <Text style={{ marginTop: 8 }}>Nenhum profissional encontrado.</Text>
                        )}

                        <Text style={[stylesResumo.label, { marginTop: 20 }]}>Seus dados:</Text>
                        <Text style={stylesResumo.item}>Nome: Gabriel Gonçalves Mendonça</Text>
                        <Text style={stylesResumo.item}>Telefone: 14 99785-8866</Text>

                        {/* BOTÕES MARCAR + CANCELAR */}
                        <View style={stylesResumo.botoesRow}>

                            {/* MARCAR */}
                            <Pressable
                                style={({ pressed }) => [
                                    stylesResumo.botao, 
                                    stylesResumo.botaoMarcar,
                                    { opacity: pressed ? 0.8 : 1 }
                                ]}
                                onPress={async () => {
                                    if (!profissionalSelecionado) {
                                        alert("Selecione um profissional.");
                                        return;
                                    }

                                    const [h, m] = horario.split(':').map(Number);
                                    
                                    // 1. Criar objeto Date para o início
                                    const dataInicioObj = new Date(data);
                                    dataInicioObj.setHours(h, m, 0, 0); 
                                    
                                    // 2. Calcular o fim baseando-se na duração do serviço (em minutos)
                                    const duracaoMinutos = servico?.tempo || 60; 
                                    const dataFimObj = new Date(dataInicioObj.getTime() + duracaoMinutos * 60000);

                                    // 3. Formatar datas para o padrão ISO 8601 (sem o 'Z' de fuso zero, se a API rejeitar)
                                    // *NOTA: O padrão correto é ISOString, mas se a API falhar, remova o .split('Z')[0]
                                    const horaInicioAPI = dataInicioObj.toISOString().split('.')[0]; 
                                    const horaFimAPI = dataFimObj.toISOString().split('.')[0]; 

                                    // 4. CORREÇÃO CRÍTICA: Formatar valor para STRING com duas casas decimais
                                    const valorString = parseFloat(servico.preco).toFixed(2);
                                    
                                    const payload = {
                                        id_empresa: ID_EMPRESA_FIXO,
                                        id_prestador: profissionalSelecionado.id,
                                        id_cliente: ID_CLIENTE_FIXO,
                                        descricao: `Agendamento das ${horario}`,
                                        valor: valorString, // <-- AJUSTADO PARA STRING COM .toFixed(2)
                                        hora_inicio: horaInicioAPI,
                                        hora_fim: horaFimAPI,
                                        status: STATUS_FIXO, // <-- AJUSTADO PARA O STATUS FIXO
                                    };

                                    console.log("JSON que será enviado:", payload);

                                    // Exibir JSON no alert antes de enviar (Útil para depuração)
                                    Alert.alert("Agendamento JSON (Verifique)", JSON.stringify(payload, null, 2));

                                    // Enviar para API
                                    const result = await criar(payload);

                                    if (result) {
                                        alert("Agendamento criado com sucesso!");
                                        onClose();
                                    } else {
                                        // O erro 400 está sendo capturado no useAgendamentoController
                                        alert("Erro ao criar agendamento. Verifique os logs do servidor!");
                                    }
                                }}
                            >
                                <Text style={stylesResumo.botaoTextoMarcar}>Marcar</Text>
                            </Pressable>

                            {/* CANCELAR */}
                            <Pressable
                                style={({ pressed }) => [
                                    stylesResumo.botao, 
                                    stylesResumo.botaoCancelar,
                                    { opacity: pressed ? 0.8 : 1 }
                                ]}
                                onPress={onClose}
                            >
                                <Text style={stylesResumo.botaoTextoCancelar}>Cancelar</Text>
                            </Pressable>

                        </View>

                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
}

const stylesResumo = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "#00000088",
        justifyContent: "center",
        alignItems: "center",
    },
    box: {
        backgroundColor: "#fff",
        width: "90%",
        maxHeight: "85%",
        padding: 20,
        borderRadius: 12,
    },
    titulo: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center"
    },
    label: {
        fontWeight: "bold",
        color: "#333",
    },
    item: {
        fontSize: 16,
        marginTop: 6
    },

    profissionalCard: {
        backgroundColor: "#f1f1f1",
        padding: 12,
        borderRadius: 8,
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    profissionalSelecionado: {
        backgroundColor: "#F7530633",
        borderWidth: 1.5,
        borderColor: "#F75306",
    },

    profissionalNome: {
        fontSize: 15,
        fontWeight: "bold"
    },
    profissionalServico: {
        fontSize: 14,
        color: "#666"
    },

    checkboxWrapper: {
        marginRight: 12,
    },
    checkbox: {
        width: 22,
        height: 22,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: "#555",
        backgroundColor: "#fff",
    },
    checkboxMarcado: {
        backgroundColor: "#F75306",
        borderColor: "#F75306",
    },

    botoesRow: {
        flexDirection: "row",
        marginTop: 25,
        gap: 10,
    },

    botao: {
        flex: 1,
        padding: 12,
        borderRadius: 10,
        alignItems: "center",
    },  

    botaoMarcar: {
        backgroundColor: "#F75306",
    },
    botaoTextoMarcar: {
        color: "#fff",
        fontWeight: "bold",
    },

    botaoCancelar: {
        backgroundColor: "#ddd",
    },
    botaoTextoCancelar: {
        color: "#333",
        fontWeight: "bold",
    }
});