import React, { useEffect, useState } from "react";
import juegosService from "../services/juegos.service";

import './Page.css';

const UltimosEstrenos = () => {
  const [juegos, setJuegos] = useState([]);

  useEffect(() => {
    juegosService.getUltimosEstrenos().then(setJuegos);
  }, []);

  return (
    <main className="container mt-5">
      <h2 className="mb-4">Últimos Estrenos</h2>
      <ul className="list-group">
        {juegos.map((juego) => (
          <li key={juego.id} className="list-group-item">
            <strong>{juego.nombre}</strong> – {juego.plataforma?.nombre} – {new Date(juego.fechaEstreno).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default UltimosEstrenos;