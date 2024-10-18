import { Router } from 'express';
import { Estudiante, Correo, Telefono, Docente, DiscapacidadEstudiante, Inscripcion, Programa } from '../model/Asociaciones.js';
import Usuario from '../model/Usuario.model.js';
import Discapacidad from '../model/Discapacidad.model.js';
import Asignatura from '../model/Asignatura.model.js';
import Grupo from '../model/Grupo.model.js';
//import Programa from '../model/Programa.model.js';

const routes = Router()

/*RUTAS PAGINA*/
//Login
routes.get('/login', async (req, res) => {
    res.render('login');
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
    try {
        const estudiantes = await Estudiante.findAll({
            include: [
                {
                    model: Correo
                },
                {
                    model: Telefono
                }
            ]
        });
        res.render('index', { estudiantes });
    } catch (error) {
        res.status(500).render('error', { message: 'Error al cargar la página de inicio' });
    }
});

routes.post('/inicio', async (req, res) => {
    const { codigoEstudiante, nombre, apellido, fechaNacimiento, idDiscapacidad } = req.body;
    try {
        const nuevoEstudiante = await Estudiante.create({
            codigoEstudiante,
            nombre,
            apellido,
            fechaNacimiento,
        });

        if (idDiscapacidad) {
            await DiscapacidadEstudiante.create({
                fk_idEstudiante: nuevoEstudiante.idEstudiante,
                fk_idDiscapacidad: idDiscapacidad,
            });
        }

        res.status(201).json(nuevoEstudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

routes.put('/inicio/:id', async (req, res) => {
    const { id } = req.params;
    const { codigoEstudiante, nombre, apellido, fechaNacimiento, idDiscapacidad } = req.body;
    try {
        const estudiante = await Estudiante.findByPk(id);
        if (!estudiante) {
            return res.status(404).json({ error: 'Estudiante no encontrado' });
        }

        await estudiante.update({
            codigoEstudiante,
            nombre,
            apellido,
            fechaNacimiento,
        });

        if (idDiscapacidad) {
            await DiscapacidadEstudiante.destroy({ where: { fk_idEstudiante: id } });
            await DiscapacidadEstudiante.create({
                fk_idEstudiante: id,
                fk_idDiscapacidad: idDiscapacidad,
            });
        }
        res.status(200).json(estudiante);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

/*RUTAS API*/
/*Data Estudiante*/

routes.get('/estudiante', async (req, res) => {
    try {

        const estudiantes = await Estudiante.findAll({
            include: [
                {
                    model: Discapacidad,
                    through: { attributes: [] }, // Para evitar datos de la tabla intermedia
                    // attributes: ['idDiscapacidad', 'tipo'], // Para ver datos de la tabla intermedia...
                    as: 'Discapacidades'
                },
                {
                    model: Telefono,
                    attributes: ['numero', 'tipoPersona', 'esEmergencia'],
                },
                {
                    model: Correo,
                    attributes: ['correo', 'tipoPersona'],
                },
                {
                    model: Inscripcion,
                    attributes: ['fecha_inscripcion', 'Periodo', 'nota']
                },
                {
                    model: Asignatura,
                    //attributes: ['nombre', 'creditos', 'codigo']
                    through: { attributes: [] }
                },
                {
                    model: Grupo,
                    through: { attributes: [] }
                },
            ],
            attributes: ['codigoEstudiante', 'nombre', 'apellido'],
        });
        res.json({ estudiantes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estudiantes' });
    }
});
/*Get All*/
routes.get('/allData', async (req, res) => {
    try {
        const estudiantes = await Estudiante.findAll({
            include: [
                {
                    model: Discapacidad,
                    through: { attributes: [] }, // Para evitar datos de la tabla intermedia
                    // attributes: ['idDiscapacidad', 'tipo'], // Para ver datos de la tabla intermedia...
                },
                {
                    model: Telefono,
                    attributes: ['numero', 'tipoPersona', 'esEmergencia'],
                },
                {
                    model: Correo,
                    attributes: ['correo', 'tipoPersona'],
                },
                {
                    model: Inscripcion,
                    attributes: ['fecha_inscripcion', 'Periodo', 'nota']
                },
                {
                    model: Asignatura,
                    //attributes: ['nombre', 'creditos', 'codigo']
                    through: { attributes: [] }
                },
                {
                    model: Grupo,
                    through: { attributes: [] }
                },
            ],
            attributes: ['codigoEstudiante', 'nombre', 'apellido'],
        });
        const docentes = await Docente.findAll({
            include: [
                {
                    model: Telefono,
                    attributes: ['numero', 'tipoPersona', 'esEmergencia'],
                },
                {
                    model: Correo,
                    attributes: ['correo', 'tipoPersona'],
                },
                {
                    model: Asignatura,
                    attributes: ['nombre', 'codigo']
                },
                {
                    model: Grupo,
                    attributes: ['codigo']
                }
            ],
            attributes: ['nombre', 'apellido'],
        });

        const asignaturas = await Asignatura.findAll({
            include: [
                {
                    model: Programa,
                    attributes: ['nombre', 'modalidad', 'jornada', 'codPensum']
                    //through: { attributes: [] }
                },
                {
                    model: Docente,
                    attributes: ['nombre', 'apellido']
                },
                {
                    model: Grupo,
                    through: { attributes: [] }
                }
            ],
            attributes: ['nombre', 'creditos', 'codigo'],
        });
        res.json({ asignaturas, estudiantes, docentes, });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estudiantes' });
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

routes.get('/estudiantes/discapacidad/:tipo', async (req, res) => {
    const { tipo } = req.params;
    try {
        const discapacidad = await Discapacidad.findOne({ where: { tipo } });
        if (!discapacidad) {
            return res.status(404).render('error', { message: 'Discapacidad no encontrada' });
        }

        const estudiantes = await Estudiante.findAll({
            include: {
                model: Discapacidad,
                where: { idDiscapacidad: discapacidad.idDiscapacidad },
                through: { attributes: [] }, // Excluir atributos de la tabla intermedia
            },
            order: [['nombre', 'ASC']], // Ordenar por nombre de forma ascendente
        });

        res.render('estudiante', { estudiantes, tipo });
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error); // Agregar un log para depuración
        res.status(500).render('error', { message: 'Error al obtener los estudiantes' });
    }
});

//Generar estudiantes...
routes.post('/generarEstudiantes', async (req, res) => {
    const { codigoEstudiante, nombre, apellido, fechaNacimiento, idDiscapacidad } = req.body;
    try {
        const nuevoEstudiante = await Estudiante.create({
            codigoEstudiante,
            nombre,
            apellido,
            fechaNacimiento,
        });

        if (idDiscapacidad) {
            await DiscapacidadEstudiante.create({
                fk_idEstudiante: nuevoEstudiante.idEstudiante,
                fk_idDiscapacidad: idDiscapacidad,
            });
        }

        res.status(201).json(nuevoEstudiante);
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