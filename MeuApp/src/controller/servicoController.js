import { useState, useEffect } from 'react';
import servicoService from '../service/servicoService';

export function useServicoController(idEmpresa = 1) {
  const [servicos, setServicos] = useState([]);
  const [loadingServicos, setLoadingServicos] = useState(true);
  const [erroServicos, setErroServicos] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const data = await servicoService.listarPorEmpresa(idEmpresa);
        setServicos(data);
      } catch (error) {
        setErroServicos(error.message);
      } finally {
        setLoadingServicos(false);
      }
    }

    carregar();
  }, [idEmpresa]);

  return { servicos, loadingServicos, erroServicos };
}
