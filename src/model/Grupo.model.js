import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";


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
}, {
    sequelize,
    modelName: 'Grupo',
    tableName: 'grupo',
    timestamps: false,
});

console.log("Grupo:", Grupo === sequelize.models.Grupo);


export default Grupo;
