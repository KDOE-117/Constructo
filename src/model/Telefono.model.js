import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Estudiante from './Estudiante.js';
import Docente from './Docente.js';

class Telefono extends Model { }

Telefono.init({
    idTelefono: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    numero: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    esEmergencia: {
        type: DataTypes.BOOLEAN,
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
    modelName: 'Telefono',
    tableName: 'telefono',
    timestamps: false,
});

console.log("Telefono:", Telefono === sequelize.models.Telefono);


export default Telefono;
