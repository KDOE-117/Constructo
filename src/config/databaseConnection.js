import { Sequelize } from 'sequelize';
import dotenv from 'dotenv/config'

const dbName = process.env.dbName;
const dbUser = process.env.dbUser;
const host = process.env.host;
const dbPort = process.env.dbPort;
const dbPassword = process.env.dbPassword;

const connection = new Sequelize(dbName, dbUser, dbPassword, {
    host: host,
    dialect: 'mysql',
    port: dbPort
});

/*
async function testConnection() {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
testConnection();
*/

export default connection;