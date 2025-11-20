import { useState, useEffect } from 'react';
import empresaService from '../service/empresaService';

export function useEmpresaController() {
    const [empresa, setEmpresa] = useState(null);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    const carregarDados = async () => {
        setLoading(true);
        try {
            const dadosEmpresa = await empresaService.buscarEmpresaPrincipal();
            setEmpresa(dadosEmpresa);
        } catch (err) {
            console.log("ERRO NO CONTROLLER EMPRESA:", err);

            if (err.response) {
                // Erro vindo da API
                setErro(JSON.stringify(err.response.data));
            } else {
                // Erro de rede / erro interno
                setErro(err.toString());
            }
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    return {
        empresa,
        loading,
        erro,
        carregarDados // Opção de recarregar dados manualmente
    };
}