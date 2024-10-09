import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Estudiante from './Estudiante.js';
import Asignatura from './Asignatura.js';

class Inscripcion extends Model { }

Inscripcion.init({
    idInscripcion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    periodo: {
        type: DataTypes.TINYINT(2),
        allowNull: false,
    },
    nota: {
        type: DataTypes.DECIMAL(3, 1),
        allowNull: false,
    },
    fecha_inscripcion: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fk_idEstudiante: {
        type: DataTypes.INTEGER,
        references: {
            model: Estudiante,
            key: 'idEstudiante',
        },
    },
    fk_idAsignatura: {
        type: DataTypes.INTEGER,
        references: {
            model: Asignatura,
            key: 'idAsignatura',
        },
    },
}, {
    sequelize,
    modelName: 'Inscripcion',
    tableName: 'inscripcion',
    timestamps: false,
});

export default Inscripcion;
