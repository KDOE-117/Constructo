import Estudiante from './Estudiante.model.js';
import Correo from './Correo.model.js';
import Telefono from './Telefono.model.js';
import Docente from './Docente.model.js';
import Discapacidad from './Discapacidad.model.js';
import DiscapacidadEstudiante from './DiscapacidadEstudiante.model.js';
import Asignatura from './Asignatura.model.js';
import Inscripcion from './Inscripcion.model.js';
import Programa from './Programa.model.js';
import Grupo from './Grupo.model.js';
import EstudianteGrupo from './EstudianteGrupo.model.js';
import GrupoAsignatura from './GrupoAsignatura.model.js';
import Seguimiento from './Seguimiento.model.js';
import Usuario from './Usuario.model.js';


Estudiante.hasMany(Correo, { foreignKey: 'fk_idEstudiante' });
Correo.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });

Estudiante.hasMany(Telefono, { foreignKey: 'fk_idEstudiante' });
Telefono.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });

Docente.hasMany(Correo, { foreignKey: 'fk_idDocente' });
Correo.belongsTo(Docente, { foreignKey: 'fk_idDocente' });

Docente.hasMany(Telefono, { foreignKey: 'fk_idDocente' });
Telefono.belongsTo(Docente, { foreignKey: 'fk_idDocente' });

Docente.hasMany(Asignatura, { foreignKey: 'fk_idDocente' });
Asignatura.belongsTo(Docente, { foreignKey: 'fk_idDocente' });

Docente.hasMany(Grupo, { foreignKey: 'fk_idDocente' });
Grupo.belongsTo(Docente, { foreignKey: 'fk_idDocente' });

Estudiante.hasMany(DiscapacidadEstudiante, { foreignKey: 'fk_idEstudiante' });
Discapacidad.hasMany(DiscapacidadEstudiante, { foreignKey: 'fk_idDiscapacidad' });

DiscapacidadEstudiante.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });
DiscapacidadEstudiante.belongsTo(Discapacidad, { foreignKey: 'fk_idDiscapacidad' });

Estudiante.hasMany(Inscripcion, { foreignKey: 'fk_idEstudiante' });
Inscripcion.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });




Estudiante.hasMany(EstudianteGrupo, { foreignKey: 'fk_idEstudiante' });
EstudianteGrupo.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });

Estudiante.belongsToMany(Grupo, { through: EstudianteGrupo, foreignKey: 'fk_idEstudiante' });
Grupo.belongsToMany(Estudiante, { through: EstudianteGrupo, foreignKey: 'fk_idGrupo' });

Grupo.hasMany(EstudianteGrupo, { foreignKey: 'fk_idGrupo' });
EstudianteGrupo.belongsTo(Grupo, { foreignKey: 'fk_idGrupo' });

Estudiante.hasMany(Seguimiento, { foreignKey: 'fk_idEstudiante' });
Seguimiento.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });

Estudiante.belongsToMany(Usuario, { through: Seguimiento, foreignKey: 'fk_idEstudiante' });
Usuario.belongsToMany(Estudiante, { through: Seguimiento, foreignKey: 'fk_idUsuario' });

Usuario.hasMany(Seguimiento, { foreignKey: 'fk_idUsuario' });
Seguimiento.belongsTo(Usuario, { foreignKey: 'fk_idUsuario' });


Asignatura.hasMany(Inscripcion, { foreignKey: 'fk_idAsignatura' });
Inscripcion.belongsTo(Asignatura, { foreignKey: 'fk_idAsignatura' });

Grupo.belongsToMany(Asignatura, { through: GrupoAsignatura, foreignKey: 'fk_idGrupo' });
Asignatura.belongsToMany(Grupo, { through: GrupoAsignatura, foreignKey: 'fk_idAsignatura' });

Programa.hasMany(Asignatura, { foreignKey: 'fk_idPrograma' });
Asignatura.belongsTo(Programa, { foreignKey: 'fk_idPrograma' });

export { Estudiante, Discapacidad, DiscapacidadEstudiante, Correo, Telefono, Docente, Asignatura, Inscripcion, Programa, GrupoAsignatura, EstudianteGrupo };