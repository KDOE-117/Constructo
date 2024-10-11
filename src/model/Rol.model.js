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

console.log("Rol:", Rol === sequelize.models.Rol);


export default Rol;
