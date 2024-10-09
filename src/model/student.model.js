import { DataTypes, Sequelize } from "sequelize";
import connection from "../config/databaseConnection.js";

const connection = new Sequelize('mysql::memory');

const estudiante = Sequelize.afterDefine('estudiante', {

});