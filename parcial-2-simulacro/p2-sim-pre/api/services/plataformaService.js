import plataformaRepository from "../repositories/plataformaRepository.js";

class PlataformaService {
  async obtenerTodas() {
    return await plataformaRepository.obtenerTodos();
  }
}

export default new PlataformaService();
