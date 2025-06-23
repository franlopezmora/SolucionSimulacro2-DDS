import axios from "./axios.config.js";

const obtenerTodas = async () => {
  const response = await axios.get("/plataformas");
  return response.data;
};

export default {
  obtenerTodas
};