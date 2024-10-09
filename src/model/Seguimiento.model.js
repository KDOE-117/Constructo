import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Estudiante from './Estudiante.js';
import Usuario from './Usuario.js';

class Seguimiento extends Model { }

Seguimiento.init({
    idSeguimiento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fk_idEstudiante: {
        type: DataTypes.INTEGER,
        references: {
            model: Estudiante,
            key: 'idEstudiante',
        },
    },
    fk_idUsuario: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'idUsuario',
        },
    },
}, {
    sequelize,
    modelName: 'Seguimiento',
    tableName: 'seguimiento',
    timestamps: false,
});

export default Seguimiento;
