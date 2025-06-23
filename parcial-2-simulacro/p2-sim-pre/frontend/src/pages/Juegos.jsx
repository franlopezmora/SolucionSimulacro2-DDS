import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import juegosService from "../services/juegos.service";
import plataformasService from "../services/plataformas.service";

const Juegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [filtros, setFiltros] = useState({
    texto: "",
    idPlataforma: "",
    codigoEsrb: ""
  });
  const [cantidad, setCantidad] = useState(0);


  const navigate = useNavigate();

  const cargarPopulares = async () => {
    const data = await juegosService.getMasPopulares();
    setJuegos(data);
  };

  const cargarPlataformas = async () => {
    const data = await plataformasService.obtenerTodas();
    setPlataformas(data);
  };

  const buscar = async () => {
    const data = await juegosService.buscarFiltrado(filtros);
    setJuegos(data);

    const res = await juegosService.contarFiltrado(filtros);
    setCantidad(res.cantidad);
  };

  const limpiarFiltros = () => {
    setFiltros({ texto: "", idPlataforma: "" });
    cargarPopulares();
  };

  const eliminar = async (id) => {
    if (confirm("¿Seguro que desea eliminar este juego?")) {
      await juegosService.eliminar(id);
      buscar();
    }
  };

  const renderEsrbIcono = (codigo) => {
  const mapa = {
    E: ["fas fa-child text-success", "Everyone"],
    E10: ["fas fa-children text-info", "Everyone 10+"],
    T: ["fas fa-user-graduate text-primary", "Teen"],
    M: ["fas fa-user-shield text-warning", "Mature"],
    AO: ["fas fa-ban text-danger", "Adults Only"],
    RP: ["fas fa-hourglass-half text-secondary", "Rating Pending"],
    UR: ["fas fa-question-circle text-muted", "Unrated"]
  };
  const [icono, texto] = mapa[codigo] || ["fas fa-question text-muted", "Sin clasificación"];
  return <i className={icono} title={texto}></i>;
};


  useEffect(() => {
    cargarPlataformas();
    cargarPopulares();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="mb-4">Listado de Juegos</h2>
      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre, género o desarrollador"
            value={filtros.texto}
            onChange={(e) => setFiltros({ ...filtros, texto: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filtros.idPlataforma}
            onChange={(e) => setFiltros({ ...filtros, idPlataforma: e.target.value })}
          >
            <option value="">Todas las plataformas</option>
            {plataformas.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filtros.codigoEsrb}
            onChange={(e) => setFiltros({ ...filtros, codigoEsrb: e.target.value })}
          >
            <option value="">Todas las clasificaciones ESRB</option>
            <option value="E">E (Everyone)</option>
            <option value="E10">E10 (Everyone 10+)</option>
            <option value="T">T (Teen)</option>
            <option value="M">M (Mature)</option>
            <option value="AO">AO (Adults Only)</option>
            <option value="RP">RP (Rating Pending)</option>
            <option value="UR">UR (Unrated)</option>
          </select>
        </div>
        <div className="col-12 d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-primary" onClick={buscar}>Filtrar</button>
          <button type="button" className="btn btn-secondary" onClick={limpiarFiltros}>Limpiar</button>
        </div>
      </form>

      <table className="table table-striped table-bordered align-middle">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Plataforma</th>
            <th>Género</th>
            <th>Fecha Estreno</th>
            <th>Valoración</th>
            <th>Opiniones</th>
            <th>ESRB</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {juegos.map((juego) => {
            const estrellas = "★".repeat(Math.min(5, Math.max(1, Math.floor(juego.valoracion / 20))));
            return (
              <tr key={juego.id}>
                <td>{juego.nombre}</td>
                <td>{juego.plataforma?.nombre}</td>
                <td>{juego.genero}</td>
                <td>{new Date(juego.fechaEstreno).toLocaleDateString()}</td>
                <td>{estrellas}</td>
                <td>{juego.opiniones}</td>
                <td>{renderEsrbIcono(juego.codigoEsrb)}</td>
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/juegos/editar/${juego.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(juego.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-end mt-2">
        Mostrando {cantidad} {cantidad === 1 ? "juego" : "juegos"} encontrados
      </p>
    </div>
  );
};

export default Juegos;