import routes from './routes/index.js'
import express from 'express'
import app from './app/app.js'
import path from 'path'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv/config'
import bodyParser from 'body-parser';


const port = process.env.PORT || 3001;
const __dirname = dirname(fileURLToPath(import.meta.url))
//Definir EJS como motor de vistas.
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
//Analizar JSON y datos de formularios.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Configurar archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes)
app.listen(port);
console.log(`-----------Port Ready: ${port}`);
