import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Estudiante from './Estudiante.model.js';
import Discapacidad from './Discapacidad.model.js';
class DiscapacidadEstudiante extends Model { }

DiscapacidadEstudiante.init({
    idDiscEst: {
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
    fk_idDiscapacidad: {
        type: DataTypes.INTEGER,
        references: {
            model: Discapacidad,
            key: 'idDiscapacidad',
        },
    },
}, {
    sequelize,
    modelName: 'DiscapacidadEstudiante',
    tableName: 'discapacidad_estudiante',
    timestamps: false,
});

Estudiante.belongsToMany(Discapacidad, { through: DiscapacidadEstudiante, foreignKey: 'fk_idEstudiante' });
Discapacidad.belongsToMany(Estudiante, { through: DiscapacidadEstudiante, foreignKey: 'fk_idDiscapacidad' });


export default DiscapacidadEstudiante;