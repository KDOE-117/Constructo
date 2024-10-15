import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Estudiante from './Estudiante.model.js';
import Docente from './Docente.model.js';

class Correo extends Model { }

Correo.init({
    idCorreo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    correo: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    tipoPersona: {
        type: DataTypes.ENUM('Estudiante', 'Docente'),
    },
    fk_idEstudiante: {
        type: DataTypes.INTEGER,
        references: {
            model: Estudiante,
            key: 'idEstudiante',
        },
    },
    fk_idDocente: {
        type: DataTypes.INTEGER,
        references: {
            model: Docente,
            key: 'idDocente',
        },
    },
}, {
    sequelize,
    modelName: 'Correo',
    tableName: 'correo',
    timestamps: false,
});

console.log("Correo:", Correo === sequelize.models.Correo);


export default Correo;
