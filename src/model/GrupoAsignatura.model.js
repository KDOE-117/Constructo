import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Grupo from './Grupo.model.js';
import Asignatura from './Asignatura.model.js';

class GrupoAsignatura extends Model { }

GrupoAsignatura.init({
    idGrupAsig: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fk_idGrupo: {
        type: DataTypes.INTEGER,
        references: {
            model: Grupo,
            key: 'idGrupo',
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
    modelName: 'GrupoAsignatura',
    tableName: 'grupo_asignatura',
    timestamps: false,
});

export default GrupoAsignatura;

console.log("GrupoAsignatura:", GrupoAsignatura === sequelize.models.GrupoAsignatura);
