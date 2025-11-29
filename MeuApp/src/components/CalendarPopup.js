import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const diasSemana = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

// Gera os próximos 31 dias
function gerarProximosDias(qtd = 31) {
  const hoje = new Date();
  const dias = [];

  for (let i = 0; i < qtd; i++) {
    const data = new Date();
    data.setDate(hoje.getDate() + i);

    dias.push({
      dia: data.getDate(),
      mes: data.getMonth() + 1,
      ano: data.getFullYear(),
      dataCompleta: data,
      diaSemana: diasSemana[data.getDay()]
    });
  }

  return dias;
}

// Gera horários de 30 em 30 min: 06:00 até 20:00
function gerarHorarios() {
  const horarios = [];
  let hora = 6;
  let minuto = 0;

  while (hora < 20 || (hora === 20 && minuto === 0)) {
    const h = String(hora).padStart(2, "0");
    const m = String(minuto).padStart(2, "0");
    horarios.push(`${h}:${m}`);

    minuto += 30;
    if (minuto >= 60) {
      minuto = 0;
      hora++;
    }
  }

  return horarios;
}

export function CalendarPopup({
  visible,
  onClose,
  onSelectDay,
  servico
}) {
  const dias = gerarProximosDias(31);
  const horarios = gerarHorarios();

  const [diaSelecionado, setDiaSelecionado] = useState(null);

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.box}>

          {/* Nome do serviço */}
          <Text style={styles.servicoNome}>{servico?.nome ?? ""}</Text>

          <Text style={styles.titulo}>Selecione o dia desejado:</Text>

          {/* LISTA DE DIAS */}
          <FlatList
            horizontal
            data={dias}
            keyExtractor={(_, i) => i.toString()}
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
            renderItem={({ item }) => {
              const isSelected = diaSelecionado?.dia === item.dia;

              return (
                <TouchableOpacity
                  style={[
                    styles.diaBox,
                    isSelected ? styles.diaSelecionado : null
                  ]}
                  onPress={() => {
                    if (diaSelecionado?.dia === item.dia) {
                      setDiaSelecionado(null); // desmarca se clicar de novo
                    } else {
                      setDiaSelecionado(item); // marca normalmente
                    }
                  }}
                >
                  <Text style={styles.diaData}>
                    {String(item.dia).padStart(2, "0")}/{String(item.mes).padStart(2, "0")}
                  </Text>
                  <Text style={styles.diaSemana}>
                    {item.diaSemana}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />

          {/* HORÁRIOS APARECEM SOMENTE DEPOIS DE SELECIONAR O DIA */}
          {diaSelecionado && (
            <>
              <Text style={styles.titulo2}>Escolha um horário disponível:</Text>

              <FlatList
                data={horarios}
                keyExtractor={(item, i) => i.toString()}
                numColumns={3}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                style={{ marginTop: 10 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.horarioBox}
                    onPress={() => {
                      // chamada defensiva: só chama se tiver callback
                      if (typeof onSelectDay === "function") {
                        onSelectDay({
                          data: diaSelecionado.dataCompleta,
                          horario: item
                        });
                      }
                    }}
                  >
                    <Text style={styles.horarioTexto}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          <TouchableOpacity style={styles.botaoFechar} onPress={onClose}>
            <Text style={styles.botaoTexto}>Fechar</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#00000088",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  servicoNome: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#09191F",
  },
  titulo: {
    fontSize: 16,
    marginTop: 15,
    textAlign: "center",
    color: "#333",
    fontWeight: "600"
  },
  titulo2: {
    fontSize: 16,
    marginTop: 20,
    textAlign: "left",
    color: "#333",
    fontWeight: "600"
  },
  diaBox: {
    backgroundColor: "#09191F",
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 12,
    width: 110,
    height: 80,
    justifyContent: "center"
  },

  diaSelecionado: {
    backgroundColor: "#F75306",
  },
  diaData: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  diaSemana: {
    color: "#fff",
    fontSize: 13,
    marginTop: 4,
  },
  horarioBox: {
    backgroundColor: "#09191F",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginBottom: 10,
    width: "32%",
    alignItems: "center",
  },
  horarioTexto: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  botaoFechar: {
    backgroundColor: "#F75306",
    marginTop: 25,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
  },
});
