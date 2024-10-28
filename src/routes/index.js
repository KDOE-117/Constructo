import { Router } from 'express';
import { Estudiante, Discapacidad, Correo, Telefono, Asignatura, Inscripcion, DiscapacidadEstudiante, EstudianteGrupo } from '../model/Asociaciones.js';
import Usuario from '../model/Usuario.model.js';
import Grupo from '../model/Grupo.model.js';
import Seguimiento from '../model/Seguimiento.model.js';

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
        res.render('index');
    } catch (error) {
        res.status(500).render('error', { message: 'Error al cargar la página de inicio' });
    }
});

/*RUTAS API*/
/*Datos Estudiante*/
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
            attributes: ['codigoEstudiante', 'nombre', 'apellido', 'fechaNacimiento'],
        });
        res.json({ estudiantes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los estudiantes' });
    }
});
/*Update One*/
routes.put('/actualizarEstudiante/:codigoEstudiante', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const estudiante = await Estudiante.findOne({
            where: { codigoEstudiante: req.params.codigoEstudiante },
        });
        if (estudiante) {
            await estudiante.update({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                fechaNacimiento: req.body.fechaNacimiento
            });

            // Actualizar correos
            if (req.body.Correos) {
                console.log('Actualizando correos:', req.body.Correos);
                await Correo.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });
                await Correo.bulkCreate(req.body.Correos.map(c => ({ ...c, fk_idEstudiante: estudiante.idEstudiante })));
            }

            // Actualizar teléfonos
            if (req.body.Telefonos) {
                console.log('Actualizando teléfonos:', req.body.Telefonos);
                await Telefono.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });
                await Telefono.bulkCreate(req.body.Telefonos.map(t => ({ ...t, fk_idEstudiante: estudiante.idEstudiante })));
            }

            // Actualizar discapacidades
            if (req.body.Discapacidades) {
                console.log('Actualizando discapacidades:', req.body.Discapacidades);
                await estudiante.setDiscapacidades([]);
                const discapacidades = await Discapacidad.findAll({
                    where: { tipo: req.body.Discapacidades.map(d => d.tipo) }
                });
                await estudiante.addDiscapacidades(discapacidades);
            }

            console.log(`Estudiante actualizado:`);
            res.status(200).json(estudiante);
        } else {
            res.status(404).json({ error: 'No se encontró al estudiante.' });
        }
    } catch (error) {
        console.error('Error al actualizar el estudiante:', error);
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

            await Correo.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });

            await Telefono.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });

            await DiscapacidadEstudiante.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });

            await EstudianteGrupo.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });

            await Inscripcion.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });

            await Seguimiento.destroy({ where: { fk_idEstudiante: estudiante.idEstudiante } });

            // Finalmente, eliminar el estudiante
            await estudiante.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Estudiante no encontrado' });
        }
    } catch (error) {
        console.error('Error al eliminar el estudiante:', error);
        res.status(400).json({ error: error.message });
    }
});
export default routes