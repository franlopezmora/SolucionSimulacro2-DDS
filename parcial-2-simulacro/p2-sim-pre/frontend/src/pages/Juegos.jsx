import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import juegosService from "../services/juegos.service";
import plataformasService from "../services/plataformas.service";

const Juegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [plataformas, setPlataformas] = useState([]);
  const [filtros, setFiltros] = useState({
    texto: "",
    idPlataforma: ""
  });

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
    </div>
  );
};

export default Juegos;