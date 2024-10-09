import { Router } from 'express';
import Estudiante from '../model/Estudiante.model.js';

const routes = Router()
/*Get All*/
routes.get('/estudiantes', async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll();
        res.render('index', { titulo: 'Estudiantes', estudiantes });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/*Get One*/
routes.get('/About', (req, res) =>
    res.render('About', { numero: 30 }))
/*Create*/
routes.post('/GenerarEstudiante', async (req, res) => {

});

/*Update One*/
routes.put('/About', (req, res) =>
    res.render('About', { numero: 30 }))
/*delete One*/
routes.delete('/About', (req, res) =>
    res.render('About', { numero: 30 }))

export default routes