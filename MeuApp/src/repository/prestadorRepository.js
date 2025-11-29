import api from "../config/api";

class PrestadorRepository {
  async listarPorEmpresa(idEmpresa) {
    const response = await api.get(`/prestador/empresa/${idEmpresa}`);
    return response.data;
  }
}

export default new PrestadorRepository();
