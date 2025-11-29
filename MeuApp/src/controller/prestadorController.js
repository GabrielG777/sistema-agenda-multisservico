import { useState, useEffect } from "react";
import prestadorRepository from "../repository/prestadorRepository";

export function usePrestadorController(idEmpresa = 1) {
  const [prestadores, setPrestadores] = useState([]);
  const [loadingPrestadores, setLoadingPrestadores] = useState(true);
  const [erroPrestadores, setErroPrestadores] = useState(null);

  async function listarPrestadores() {
    try {
      setLoadingPrestadores(true);
      const data = await prestadorRepository.listarPorEmpresa(idEmpresa);
      setPrestadores(data);
      return data;
    } catch (error) {
      setErroPrestadores(error);
      return [];
    } finally {
      setLoadingPrestadores(false);
    }
  }

  useEffect(() => {
    listarPrestadores();
  }, [idEmpresa]);

  return {
    prestadores,
    loadingPrestadores,
    erroPrestadores,
    listarPrestadores, // função pública para recarregar onde quiser
  };
}
