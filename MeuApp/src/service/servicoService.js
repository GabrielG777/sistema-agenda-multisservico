import servicoRepository from '../repository/servicoRepository';

class ServicoService {

  async listarPorEmpresa(idEmpresa = 1) {
    try {
      const servicos = await servicoRepository.getByEmpresaId(idEmpresa);
      return servicos;
    } catch (error) {
      throw new Error('Falha ao carregar serviços. Verifique a API Node.js.');
    }
  }

}

export default new ServicoService();
