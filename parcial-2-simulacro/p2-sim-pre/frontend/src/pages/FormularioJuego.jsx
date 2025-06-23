import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import plataformasService from "../services/plataformas.service";
import juegosService from "../services/juegos.service";

import './Page.css';

const FormularioJuego = () => {
  const [plataformas, setPlataformas] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    plataformasService.obtenerTodas().then(setPlataformas);
    if (id) {
      juegosService.obtenerPorId(id).then((juego) => {
        juego.fechaEstreno = new Date(juego.fechaEstreno).toISOString().slice(0, 10);
        reset(juego);
      });
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    data.idPlataforma = Number(data.idPlataforma);
    data.fechaEstreno = new Date(data.fechaEstreno);
    if (id) {
      await juegosService.actualizar(id, data);
    } else {
      await juegosService.crear(data);
    }
    navigate("/juegos");
  };

  return (
    <main className="container mt-5">
      <h3 className="mb-4">{id ? "Editar Juego" : "Nuevo Juego"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">
        <div className="col-md-6">
          <label>Nombre:</label>
          <input {...register("nombre", { required: true })} className="form-control" />
          {errors.nombre && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Género:</label>
          <input {...register("genero", { required: true })} className="form-control" />
          {errors.genero && <span className="text-danger">Campo obligatorio</span>}
        </div>
        <div className="col-md-6">
          <label>Desarrollador:</label>
          <input {...register("dearrollador", { required: true })} className="form-control" />
        </div>
        <div className="col-md-6">
          <label>Fecha Estreno:</label>
          <input type="date" {...register("fechaEstreno", { required: true })} className="form-control" />
        </div>
        <div className="col-md-6">
          <label>Plataforma:</label>
          <select {...register("idPlataforma", { required: true })} className="form-select">
            <option value="">Seleccione</option>
            {plataformas.map((p) => (
              <option key={p.id} value={p.id}>{p.nombre}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label>Valoración:</label>
          <input type="number" {...register("valoracion")} className="form-control" />
        </div>
        <div className="col-md-3">
          <label>Opiniones:</label>
          <input type="number" {...register("opiniones")} className="form-control" />
        </div>
        <div className="col-12">
          <label>URL Sitio Web:</label>
          <input {...register("urlWeb")} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Clasificación ESRB</label>
          <select
            className="form-select"
            {...register("codigoEsrb", { required: true })}
          >
            <option value="">Seleccionar clasificación</option>
            <option value="E">E (Everyone)</option>
            <option value="E10">E10 (Everyone 10+)</option>
            <option value="T">T (Teen)</option>
            <option value="M">M (Mature)</option>
            <option value="AO">AO (Adults Only)</option>
            <option value="RP">RP (Rating Pending)</option>
            <option value="UR">UR (Unrated)</option>
          </select>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-success">Guardar</button>
        </div>
      </form>
    </main>
  );
};

export default FormularioJuego;