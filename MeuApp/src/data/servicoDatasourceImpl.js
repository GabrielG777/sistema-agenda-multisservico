import axios from "axios";

export async function listarServicosPorEmpresa(idEmpresa) {
  try {
    const response = await axios.get(
      `http://localhost:3000/api/servicos/empresa/${idEmpresa}`
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Erro ao buscar serviços";
  }
}
