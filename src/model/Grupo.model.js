import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Docente from './Docente.model.js';

class Grupo extends Model { }

Grupo.init({
    idGrupo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    codigo: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    fk_idDocente: {
        type: DataTypes.INTEGER,
        references: {
            model: Docente,
            key: 'idDocente'
        }
    },
}, {
    sequelize,
    modelName: 'Grupo',
    tableName: 'grupo',
    timestamps: false,
});

console.log("Grupo:", Grupo === sequelize.models.Grupo);

export default Grupo;
