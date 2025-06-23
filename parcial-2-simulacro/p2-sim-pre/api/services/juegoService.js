import juegoRepository from "../repositories/juegoRepository.js";
import plataformaRepository from "../repositories/plataformaRepository.js";

class JuegoService {
  async obtenerTodos({ pagina = 1, limite = 10 } = {}) {
    const juegos = await juegoRepository.obtenerTodos({ pagina, limite });
    return juegos.map(this.#convertirSalida);
  }

  async obtenerPorId(id) {
    const juego = await juegoRepository.obtenerPorId(id);
    return juego ? this.#convertirSalida(juego) : null;
  }

  async crear(datos) {
    await this.#validarNombreUnico(datos.nombre);
    await this.#validarPlataformaExistente(datos.idPlataforma);
    const datosProcesados = this.#convertirEntrada(datos);
    const creado = await juegoRepository.crear(datosProcesados);
    return this.#convertirSalida(creado);
  }

  async actualizar(id, datos) {
    await this.#validarNombreUnico(datos.nombre, id);
    await this.#validarPlataformaExistente(datos.idPlataforma);
    const datosProcesados = this.#convertirEntrada(datos);
    const actualizado = await juegoRepository.actualizar(id, datosProcesados);
    return this.#convertirSalida(actualizado);
  }

  async eliminar(id) {
    return await juegoRepository.eliminar(id);
  }

  async getUltimosEstrenos() {
    const juegos = await juegoRepository.getUltimosEstrenos();
    return juegos.map(this.#convertirSalida);
  }

  async getMasPopulares() {
    const juegos = await juegoRepository.getMasPopulares();
    return juegos.map(this.#convertirSalida);
  }

  async buscarFiltrado(filtros) {
    const juegos = await juegoRepository.buscarFiltrado(filtros);
    return juegos.map(this.#convertirSalida);
  }

  async contarFiltrado(filtros) {
    return await juegoRepository.contarFiltrado(filtros);
  }

  // 🔁 Conversión de fechas
  #convertirEntrada(datos) {
    const resultado = { ...datos };
    if (resultado.fechaEstreno instanceof Date) {
      resultado.fechaEstreno = resultado.fechaEstreno.getTime();
    }
    return resultado;
  }

  #convertirSalida(juego) {
    const obj = juego.toJSON();
    if (typeof obj.fechaEstreno === "number") {
      obj.fechaEstreno = new Date(obj.fechaEstreno);
    }
    return obj;
  }


  // 🧪 Validaciones
  async #validarNombreUnico(nombre, idActual = null) {
    const existente = await juegoRepository.buscarPorNombreExacto(nombre);
    if (existente && (!idActual || existente.id !== idActual)) {
      throw new Error(`Ya existe un juego con el nombre "${nombre}".`);
    }
  }

  async #validarPlataformaExistente(idPlataforma) {
    const plataforma = await plataformaRepository.obtenerPorId(idPlataforma);
    if (!plataforma) {
      throw new Error(`La plataforma con ID ${idPlataforma} no existe.`);
    }
  }
}

export default new JuegoService();
