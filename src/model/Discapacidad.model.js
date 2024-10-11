import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";

class Discapacidad extends Model { }

Discapacidad.init({
    idDiscapacidad: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.TEXT,
    },
}, {
    sequelize,
    modelName: 'Discapacidad',
    tableName: 'discapacidad',
    timestamps: false,
});

console.log("Discapacidad:", Discapacidad === sequelize.models.Discapacidad);
export default Discapacidad;
