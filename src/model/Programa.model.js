import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";

class Programa extends Model { }

Programa.init({
    idPrograma: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    modalidad: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    jornada: {
        type: DataTypes.STRING(15),
        allowNull: false,
    },
    codPensum: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Programa',
    tableName: 'programa',
    timestamps: false,
});

export default Programa;
