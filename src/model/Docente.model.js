import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";


class Docente extends Model { }

Docente.init({
    idDocente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Docente',
    tableName: 'docente',
    timestamps: false,
});

export default Docente;
