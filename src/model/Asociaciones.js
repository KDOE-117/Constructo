import Estudiante from './Estudiante.model.js';
import Discapacidad from './Discapacidad.model.js';
import DiscapacidadEstudiante from './DiscapacidadEstudiante.model.js';

Estudiante.hasMany(DiscapacidadEstudiante, { foreignKey: 'fk_idEstudiante' });
Discapacidad.hasMany(DiscapacidadEstudiante, { foreignKey: 'fk_idDiscapacidad' });
DiscapacidadEstudiante.belongsTo(Estudiante, { foreignKey: 'fk_idEstudiante' });
DiscapacidadEstudiante.belongsTo(Discapacidad, { foreignKey: 'fk_idDiscapacidad' });

export { Estudiante, Discapacidad, DiscapacidadEstudiante };