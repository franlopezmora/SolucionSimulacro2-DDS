import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";

class Plataforma extends Model {}

Plataforma.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "ID_PLATAFORMA"
    },
    nombre: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      field: "NOMBRE"
    }
  },
  {
    sequelize,
    modelName: "Plataforma",
    tableName: "PLATAFORMAS",
    timestamps: false
  }
);

export default Plataforma;
