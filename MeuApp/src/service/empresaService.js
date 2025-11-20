import empresaRepository from '../repository/empresaRepository';

class EmpresaService {
  
  async buscarEmpresaPrincipal() {
    try {
      // Hardcode ID 1, como base. Ajuste para o seu slug ou ID real.
      const idEmpresa = 1; 
      
      const empresa = await empresaRepository.getById(idEmpresa);
      
      // Retornamos os dados limpos para o Controller
      return empresa; 
    } catch (error) {
      throw new Error('Falha ao carregar dados da empresa. Verifique a API Node.js.');
    }
  }
}

export default new EmpresaService();