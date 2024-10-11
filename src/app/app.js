import express from 'express'
import morgan from 'morgan';
import routes from '../routes/index.js';
import bodyParser from 'body-parser';

const app = express();

/*MiddleWares*/
// registro de peticiones
app.use(morgan("dev"));
// Configurar body-parser para analizar JSON
app.use(bodyParser.json());
// Configurar body-parser para analizar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

//Para Uso de API - Buenas Practicas
app.use("/api/v1", routes)
export default app;
