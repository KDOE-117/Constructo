import { Model, DataTypes } from 'sequelize';
import sequelize from "../config/databaseConnection.js";
import Rol from './Rol.model.js';

class Usuario extends Model { }

Usuario.init({
    idUsuario: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombreUsuario: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING(25),
        allowNull: false,
    },
    fk_idRol: {
        type: DataTypes.INTEGER,
        references: {
            model: Rol,
            key: 'idRol',
        },
    },
}, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario',
    timestamps: false,
});

console.log("Usuario:", Usuario === sequelize.models.Usuario);

export default Usuario;
