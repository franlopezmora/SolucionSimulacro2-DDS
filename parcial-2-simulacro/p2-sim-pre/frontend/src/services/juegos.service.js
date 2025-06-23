import axios from "./axios.config.js";

const obtenerTodos = async () => {
  const response = await axios.get("/juegos");
  return response.data;
};

const obtenerPorId = async (id) => {
  const response = await axios.get(`/juegos/${id}`);
  return response.data;
};

const crear = async (juego) => {
  const response = await axios.post("/juegos", juego);
  return response.data;
};

const actualizar = async (id, juego) => {
  const response = await axios.put(`/juegos/${id}`, juego);
  return response.data;
};

const eliminar = async (id) => {
  await axios.delete(`/juegos/${id}`);
};

const getUltimosEstrenos = async () => {
  const response = await axios.get("/juegos/top/ultimos");
  return response.data;
};

const getMasPopulares = async () => {
  const response = await axios.get("/juegos/top/populares");
  return response.data;
};

const buscarFiltrado = async (filtros) => {
  const params = new URLSearchParams(filtros).toString();
  const response = await axios.get(`/juegos/filtrar?${params}`);
  return response.data;
};

export default {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  getUltimosEstrenos,
  getMasPopulares,
  buscarFiltrado
};