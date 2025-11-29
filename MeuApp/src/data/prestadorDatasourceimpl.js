// src/datasource/prestadorDatasourceImpl.js
import axios from "axios";

export async function listarPrestadoresPorEmpresa(idEmpresa) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/prestadores/empresa/${idEmpresa}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao buscar prestadores";
  }
}
