import { Router } from 'express';
import Estudiante from '../model/Estudiante.model.js';
import Usuario from '../model/Usuario.model.js';
import Discapacidad from '../model/Discapacidad.model.js';
import { DiscapacidadEstudiante } from '../model/Asociaciones.js';
const routes = Router()

/*RUTAS PAGINA*/
//Login
routes.get('/login', (req, res) => {
    res.render('login')
});
routes.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { nombreUsuario: username } });
        if (usuario && usuario.contraseña === password) {
            res.render('loading');
        } else {
            res.status(401).render('login', { error: 'Usuario o contraseña incorrectos.' });
        }
    } catch (err) {
        res.status(500).render('login', { error: 'Error del servidor. Por favor, inténtelo de nuevo más tarde.' });
    };
});

//Inicio
routes.get('/inicio', async (req, res) => {
    const estudiantes = await Estudiante.findAll();
    res.render('index', { titulo: 'Estudiantes', estudiantes });
});


/*RUTAS API*/
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
// GET Estudiante por Discapacidad

routes.get('/estudiantes/discapacidad/:tipo', async (req, res) => {
    const { tipo } = req.params;
    try {
        const discapacidad = await Discapacidad.findOne({ where: { tipo } });
        if (!discapacidad) {
            return res.status(404).json({ error: 'Discapacidad no encontrada' });
        }

        const estudiantes = await Estudiante.findAll({
            include: {
                model: DiscapacidadEstudiante,
                where: { fk_idDiscapacidad: discapacidad.idDiscapacidad },
                include: [Discapacidad]
            }
        });

        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los estudiantes' });
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