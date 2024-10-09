import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";

class Rol extends Model { }

Rol.init({
    idRol: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo: {
        type: DataTypes.TINYINT,
        unique: true,
    },
    nombre: {
        type: DataTypes.STRING(15),
    },
}, {
    sequelize,
    modelName: 'Rol',
    tableName: 'rol',
    timestamps: false,
});

export default Rol;
