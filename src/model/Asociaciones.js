import Estudiante from './Estudiante.model.js';
import Correo from './Correo.model.js';
import Telefono from './Telefono.model.js';
import Docente from './Docente.model.js';
import Discapacidad from './Discapacidad.model.js';
import DiscapacidadEstudiante from './DiscapacidadEstudiante.model.js';


Estudiante.hasMany(Correo, { foreignKey: 'fk_idEstudiante' });
Correo.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });

Estudiante.hasMany(Telefono, { foreignKey: 'fk_idEstudiante' });
Telefono.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });

Docente.hasMany(Correo, { foreignKey: 'fk_idDocente' });
Correo.belongsTo(Docente, { foreignKey: 'fk_idDocente' });

Docente.hasMany(Telefono, { foreignKey: 'fk_idDocente' });
Telefono.belongsTo(Docente, { foreignKey: 'fk_idDocente' });

Estudiante.hasMany(DiscapacidadEstudiante, { foreignKey: 'fk_idEstudiante' });
Discapacidad.hasMany(DiscapacidadEstudiante, { foreignKey: 'fk_idDiscapacidad' });

DiscapacidadEstudiante.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });
DiscapacidadEstudiante.belongsTo(Discapacidad, { foreignKey: 'fk_idDiscapacidad' });

export { Estudiante, Discapacidad, DiscapacidadEstudiante, Correo, Telefono, Docente };