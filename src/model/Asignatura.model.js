import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Docente from './Docente.model.js';
import Programa from './Programa.model.js';

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
console.log("Asignatura:", Asignatura === sequelize.models.Asignatura);


export default Asignatura;
