import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Docente from './Docente.js';
import Programa from './Programa.js';

class Asignatura extends Model { }

Asignatura.init({
    idAsignatura: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    creditos: {
        type: DataTypes.TINYINT,
    },
    codigo: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    fk_idDocente: {
        type: DataTypes.INTEGER,
        references: {
            model: Docente,
            key: 'idDocente',
        },
    },
    fk_idPrograma: {
        type: DataTypes.INTEGER,
        references: {
            model: Programa,
            key: 'idPrograma',
        },
    },
}, {
    sequelize,
    modelName: 'Asignatura',
    tableName: 'asignatura',
    timestamps: false,
});

export default Asignatura;