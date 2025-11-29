// src/controller/agendamentoController.js
import { useState, useEffect } from "react";
import agendamentoService from "../service/agendamentoService";

export function useAgendamentoController(idCliente) {
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const criar = async (payload) => {
        try {
            setLoading(true);
            return await agendamentoService.criarAgendamento(payload);
        } catch (err) {
            setErro(err.toString());
            return null;
        } finally {
            setLoading(false);
        }
    };


    const carregarDados = async () => {
        setLoading(true);
        try {
            const data = await agendamentoService.listarAgendamentos(idCliente);
            setAgendamentos(data);
        } catch (err) {
            setErro(err.toString());
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (idCliente) carregarDados();
    }, [idCliente]);

    return {
        agendamentos,
        loading,
        erro,
        carregarDados,
        criar,
    };
}


