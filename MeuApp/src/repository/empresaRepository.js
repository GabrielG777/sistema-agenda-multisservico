import api from '../config/api'; // Seu Axios configurado

class EmpresaRepository {
  
  // Busca a empresa pelo ID (assumindo ID 1 para a empresa principal)
  async getById(id) {
    // Endpoint: GET /empresas/1
    const response = await api.get(`/empresas/${id}`);  
    return response.data;
  }
}

export default new EmpresaRepository();