import { DataTypes, Model } from "sequelize";
import sequelize from "../config/databaseConnection.js";

class Estudiante extends Model { }

Estudiante.init({
    idEstudiante: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    apellido: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    fechaNacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'Estudiante',
    tableName: 'estudiante',
    timestamps: false,
});

console.log(Estudiante === sequelize.models.Estudiante);


export default Estudiante;



