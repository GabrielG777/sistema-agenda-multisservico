import api from '../config/api'; // Axios configurado

class ServicoRepository {

  // Lista serviços por empresa
  async getByEmpresaId(idEmpresa) {
    // endpoint: GET /servicos/empresa/:id
    const response = await api.get(`/servicos/empresa/${idEmpresa}`);
    return response.data;
  }

}

export default new ServicoRepository();
