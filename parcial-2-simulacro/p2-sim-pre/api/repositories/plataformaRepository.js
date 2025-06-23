import RepositorioBase from "./repositorioBase.js";
import Plataforma from "../models/plataforma.js";

class PlataformaRepository extends RepositorioBase {
  constructor() {
    super(Plataforma);
  }

  async obtenerTodos() {
    return this.modelo.findAll({
      order: [["NOMBRE", "ASC"]]
    });
  }
}

export default new PlataformaRepository();
