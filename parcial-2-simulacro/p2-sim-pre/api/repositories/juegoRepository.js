import RepositorioBase from "./repositorioBase.js";
import Juego from "../models/juego.js";
import Plataforma from "../models/plataforma.js";
import { Op } from "sequelize";

class JuegoRepository extends RepositorioBase {
  constructor() {
    super(Juego);
  }

  async obtenerTodos({ pagina = 1, limite = 10 } = {}) {
    const offset = (pagina - 1) * limite;
    return this.modelo.findAll({
      limit: limite,
      offset,
      include: {
        model: Plataforma,
        as: "plataforma"
      }
    });
  }

  async obtenerPorId(id) {
    return this.modelo.findByPk(id, {
      include: {
        model: Plataforma,
        as: "plataforma"
      }
    });
  }

  async buscarPorNombreExacto(nombre) {
    return this.modelo.findOne({
      where: {
        nombre: { [Op.eq]: nombre }
      }
    });
  }

  async getUltimosEstrenos() {
    return this.modelo.findAll({
      order: [["fechaEstreno", "DESC"]],
      limit: 10,
      include: { model: Plataforma, as: "plataforma" }
    });
  }

  async getMasPopulares() {
    return this.modelo.findAll({
      where: {
        opiniones: { [Op.gt]: 500 }
      },
      order: [["valoracion", "DESC"]],
      limit: 10,
      include: { model: Plataforma, as: "plataforma" }
    });
  }

  async buscarFiltrado({ texto, idPlataforma, codigoEsrb } = {}) {
    const condiciones = [];

    if (texto) {
      const likeTexto = { [Op.like]: `%${texto}%` };
      condiciones.push({
        [Op.or]: [
          { nombre: likeTexto },
          { genero: likeTexto },
          { dearrollador: likeTexto } // O desarrollador si corregís el typo
        ]
      });
    }

    if (idPlataforma) {
      condiciones.push({ idPlataforma });
    }

    if (codigoEsrb) {
      condiciones.push({ codigoEsrb });
    }

    return this.modelo.findAll({
      where: { [Op.and]: condiciones },
      include: { model: Plataforma, as: "plataforma" },
      order: [["fechaEstreno", "DESC"]],
      limit: 25
    });
  }

  async contarFiltrado({ texto, idPlataforma, codigoEsrb } = {}) {
    const condiciones = [];

    if (texto) {
      const likeTexto = { [Op.like]: `%${texto}%` };
      condiciones.push({
        [Op.or]: [
          { nombre: likeTexto },
          { genero: likeTexto },
          { dearrollador: likeTexto }
        ]
      });
    }

    if (idPlataforma) {
      condiciones.push({ idPlataforma });
    }
    
    if (codigoEsrb) {
      condiciones.push({ codigoEsrb });
    }


    return this.modelo.count({
      where: { [Op.and]: condiciones }
    });
  }
}

export default new JuegoRepository();
