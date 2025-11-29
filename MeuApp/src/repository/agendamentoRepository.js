// src/repository/agendamentoRepository.js
import api from "../config/api";

class AgendamentoRepository {
    async listarPorCliente(idCliente) {
        try {
            const response = await api.get(`/agendamentos/${idCliente}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar agendamentos:", error);
            // Retorna array vazio ou null em caso de erro na listagem
            return []; 
        }
    }

    async criar(data) {
        try {
            const response = await api.post("/agendamentos", data);
            
            // Retorna os dados de sucesso, que serão avaliados como TRUE no controller
            return response.data; 

        } catch (error) {
            // --- TRATAMENTO DE ERRO CRÍTICO PARA O 400 ---
            if (error.response) {
                // Erro de validação do servidor (400, 404, etc.)
                console.error("ERRO DA API (STATUS:", error.response.status, "):", error.response.data);
                
                // O controller espera um retorno FALSE ou null para saber que falhou
                return false; 
            } else if (error.request) {
                // Erro de rede (servidor inacessível, timeout)
                console.error("ERRO DE REDE:", error.request);
                return false;
            } else {
                // Outro erro de código/Axios
                console.error("ERRO DESCONHECIDO:", error.message);
                return false;
            }
        }
    }
}

export default new AgendamentoRepository();