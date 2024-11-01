import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Estudiante from './Estudiante.model.js';
import Grupo from './Grupo.model.js';


class EstudianteGrupo extends Model { }

EstudianteGrupo.init({
    idEstGrup: {
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
    fk_idGrupo: {
        type: DataTypes.INTEGER,
        references: {
            model: Grupo,
            key: 'idGrupo',
        },
    },
}, {
    sequelize,
    modelName: 'EstudianteGrupo',
    tableName: 'estudiante_grupo',
    timestamps: false,
});

console.log("EstudianteGrupo:", EstudianteGrupo === sequelize.models.EstudianteGrupo);

export default EstudianteGrupo;
