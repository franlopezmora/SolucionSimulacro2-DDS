import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Plataforma from "./plataforma.js";

class Juego extends Model {}

Juego.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID_JUEGO"
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "NOMBRE"
    },
    fechaEstreno: {
      type: DataTypes.NUMERIC,
      field: "FECHA_ESTRENO"
    },
    urlWeb: {
      type: DataTypes.TEXT,
      field: "URL_WEB"
    },
    genero: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "GENERO"
    },
    dearrollador: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "DEARROLLADOR"
    },
    valoracion: {
      type: DataTypes.INTEGER,
      field: "VALORACION"
    },
    opiniones: {
      type: DataTypes.INTEGER,
      field: "OPINIONES"
    },
    idPlataforma: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "ID_PLATAFORMA"
    },
    codigoEsrb: {
      type: DataTypes.TEXT,
      field: "CODIGO_ESRB"
    },
  },
  {
    sequelize,
    modelName: "Juego",
    tableName: "INFO_JUEGOS",
    timestamps: false
  }
);

// Asociación
Juego.belongsTo(Plataforma, {
  foreignKey: "idPlataforma",
  as: "plataforma"
});

// Comentado a propósito por la cantidad de juegos que podría llegar a cargar una plataforma.
// Plataforma.hasMany(Juego, {
//   foreignKey: "ID_PLATAFORMA",
//   as: "juegos"
// });

export default Juego;
