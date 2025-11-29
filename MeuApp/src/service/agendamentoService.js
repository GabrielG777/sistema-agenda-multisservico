// src/service/agendamentoService.js
import agendamentoRepository from "../repository/agendamentoRepository";

class AgendamentoService {
    async listarAgendamentos(idCliente) {
        try {
            return await agendamentoRepository.listarPorCliente(idCliente);
        } catch (e) {
            throw new Error("Falha ao carregar histórico de agendamentos.");
        }
    }
    async criarAgendamento(payload) {
        try {
            return await agendamentoRepository.criar(payload);
        } catch (e) {
            throw new Error("Falha ao criar agendamento.");
        }
    }

}

export default new AgendamentoService();
