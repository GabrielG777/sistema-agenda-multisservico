// src/datasource/agendamentoDatasourceImpl.js
import axios from "axios";

export async function listarAgendamentosPorCliente(idCliente) {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/agendamentos/${idCliente}`
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Erro ao buscar agendamentos";
    }


}

export async function criarAgendamento(payload) {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/agendamentos",
            payload
        );
        return response.data;
    } catch (error) {
        throw error.response?.data?.message || "Erro ao criar agendamento";
    }
}

