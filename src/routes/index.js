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
routes.get('/estudiantes/:codigoEstudiante', async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({
            where: { codigoEstudiante: req.params.codigoEstudiante },
        });
        if (estudiante) {
            res.status(200).json(estudiante);
        } else {
            res.status(404).json({ error: 'No se encontró al estudiante.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/*Create*/
routes.post('/generarEstudiante', async (req, res) => {
    try {
        const estudiante = await Estudiante.create(req.body);
        console.log(`Estudiante creado: ${estudiante.nombre} ${estudiante.apellido}`);
        res.status(201).json(estudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/*Update One*/
routes.put('/actualizarEstudiante/:codigoEstudiante', async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({
            where: { codigoEstudiante: req.params.codigoEstudiante },
        });
        if (estudiante) {
            await estudiante.update(req.body);
            console.log(`Estudiante actualizado:`);
            res.status(200).json(estudiante);
        } else {
            res.status(404).json({ error: 'No se encontró al estudiante.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


/*delete One*/
routes.delete('/borrarEstudiante/:codigoEstudiante', async (req, res) => {
    try {
        const estudiante = await Estudiante.findOne({
            where: { codigoEstudiante: req.params.codigoEstudiante },
        });
        if (estudiante) {
            await estudiante.destroy();
            console.log(`El Estudiante Ha Sido Eliminado!`);
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

export default routes