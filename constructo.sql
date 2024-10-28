DROP DATABASE IF EXISTS constructo;
CREATE DATABASE IF NOT EXISTS constructo;

use constructo;

create table rol(
	idRol int Primary key auto_increment,
    codigo tinyint unique,
    nombre varchar(15) 
)auto_increment = 1;

create table usuario(
	idUsuario int Primary key auto_increment,
    nombreUsuario varchar(25) not null,
    contraseña varchar(25) not null,
    fk_idRol int,
    foreign key(fk_idRol) references rol(idRol)
)auto_increment = 1; 

CREATE TABLE programa(
    idPrograma int Primary key auto_increment,
    nombre varchar(50) not null,
    modalidad varchar(15) not null, /*Presencial-Remoto.Virtual*/
    jornada varchar(15) not null,
    codPensum varchar(25) not null /*PENSUM TSI2019-2*/
)auto_increment = 1;

create table docente(
	idDocente int Primary key auto_increment,
    nombre varchar(25) not null,
    apellido varchar(25) not null
)auto_increment = 1; 

create table asignatura(
	idAsignatura int Primary key auto_increment,
    nombre varchar(50) not null,
    creditos tinyint,
    codigo varchar(15) not null,
    fk_idDocente int,
    fk_idPrograma int,
    foreign key (fk_idDocente) references docente(idDocente),
    foreign key (fk_idPrograma) references programa(idPrograma)
)auto_increment = 1; 

create table grupo (
	idGrupo int Primary key auto_increment,
    codigo varchar(10) not null,
    fk_idDocente int,
    foreign key (fk_idDocente) references docente(idDocente)
);

create table estudiante(
	idEstudiante int Primary key auto_increment,
    codigoEstudiante varchar(10) Unique not null,
    nombre varchar(25) not null,
    apellido varchar(25) not null,
    fechaNacimiento date not null
)auto_increment = 1; 

create table discapacidad (
	idDiscapacidad int Primary key auto_increment,
    tipo varchar(50) not null,
    descripcion text
);

create table discapacidad_estudiante (
	idDiscEst int Primary key auto_increment,
    fk_idEstudiante int,
    fk_idDiscapacidad int,
    foreign key (fk_idEstudiante) references estudiante(idEstudiante),
    foreign key (fk_idDiscapacidad) references discapacidad(idDiscapacidad)
);

create table seguimiento (
	idSeguimiento int Primary key auto_increment,
	fk_idEstudiante int,
    fk_idUsuario int,
    foreign key (fk_idEstudiante) references estudiante(idEstudiante),
    foreign key (fk_idUsuario) references usuario(idUsuario)
)auto_increment = 1;

create table inscripcion (
	idInscripcion int Primary key auto_increment,
    periodo tinyint (2) not null,
    nota decimal (3,1) not null,
    fecha_inscripcion date not null,
	fk_idEstudiante int,
    fk_idAsignatura int,
    foreign key (fk_idEstudiante) references estudiante(idEstudiante),
    foreign key (fk_idAsignatura) references asignatura(idAsignatura)
)auto_increment = 1;

CREATE TABLE correo (
    idCorreo int PRIMARY KEY AUTO_INCREMENT,
    correo varchar(30) NOT NULL,
    tipoPersona enum('Estudiante', 'Docente'),
    fk_idEstudiante int,
    fk_idDocente int,
    FOREIGN KEY (fk_idEstudiante) REFERENCES estudiante(idEstudiante),
    FOREIGN KEY (fk_idDocente) REFERENCES docente(idDocente)
) AUTO_INCREMENT = 1;

CREATE TABLE telefono (
    idTelefono int PRIMARY KEY AUTO_INCREMENT,
    numero varchar(15) NOT NULL,
    esEmergencia bool,
    tipoPersona enum('Estudiante', 'Docente'),
    fk_idEstudiante int,
    fk_idDocente int,
    FOREIGN KEY (fk_idEstudiante) REFERENCES estudiante(idEstudiante),
    FOREIGN KEY (fk_idDocente) REFERENCES docente(idDocente)
) AUTO_INCREMENT = 1;

create table estudiante_grupo (
	idEstGrup int Primary key auto_increment,
    fk_idEstudiante int,
    fk_idGrupo int,
    foreign key (fk_idEstudiante) references estudiante(idEstudiante),
    foreign key (fk_idGrupo) references grupo(idGrupo)
);

create table grupo_asignatura (
	idGrupAsig int Primary key auto_increment,
    fk_idGrupo int,
    fk_idAsignatura int,
	FOREIGN KEY (fk_idGrupo) REFERENCES grupo(idGrupo),
    FOREIGN KEY (fk_idAsignatura) REFERENCES asignatura(idAsignatura)
);

INSERT INTO rol (codigo, nombre) VALUES (1, 'Administrativo'), (2, 'Docente');
INSERT INTO discapacidad (tipo, descripcion) VALUES('Visual', 'Pérdida total o parcial de la visión.'),('Auditiva', 'Pérdida total o parcial de la audición.'),('Motora', 'Dificultad o imposibilidad para moverse.'),('Intelectual', 'Limitaciones significativas en el funcionamiento intelectual.'),('Psicosocial', 'Trastornos mentales que afectan la vida diaria.'),('Lenguaje', 'Dificultades en la comunicación verbal.'),('Visceral', 'Afectación de órganos internos.'),('Múltiple', 'Combinación de dos o más discapacidades.'),('Cognitiva', 'Dificultades en el procesamiento de información.'),('Desarrollo', 'Trastornos que afectan el desarrollo infantil.'),('Neurológica', 'Afectación del sistema nervioso.'),('Sensorial', 'Afectación de uno o más sentidos.'),('Crónica', 'Enfermedades de larga duración que afectan la funcionalidad.'),('Transitoria', 'Discapacidad temporal debido a una lesión o enfermedad.'),('Respiratoria', 'Dificultades para respirar debido a enfermedades pulmonares.'),('Cardíaca', 'Afectación del funcionamiento del corazón.'),('Renal', 'Problemas en el funcionamiento de los riñones.'),('Hepática', 'Afectación del hígado.'),('Inmunológica', 'Problemas en el sistema inmunológico.'),('Dermatológica', 'Enfermedades de la piel que afectan la funcionalidad.');
INSERT INTO programa (nombre, modalidad, jornada, codPensum) VALUES ('Tecnología en desarrollo de sistemas informáticos', 'Presencial', 'Diurna', 'TSI2019-2'), ('Tecnología en desarrollo de sistemas informáticos', 'Remoto', 'Diurna', 'TSI2019-2'), ('Tecnología en desarrollo de sistemas informáticos', 'Presencial', 'Nocturna', 'TSI2019-2'), ('Tecnología en desarrollo de sistemas informáticos', 'Remoto', 'Nocturna', 'TSI2019-2');
INSERT INTO docente (nombre, apellido) VALUES ('Juan', 'Pérez'), ('María', 'González'), ('Carlos', 'Rodríguez'), ('Ana', 'Martínez'), ('Luis', 'Fernández');
INSERT INTO grupo (codigo, fk_idDocente) VALUES ('E191', 1), ('E112', 2), ('E115', 3), ('E192', 4), ('E193', 5);
INSERT INTO estudiante (codigoEstudiante, nombre, apellido, fechaNacimiento) VALUES ('E001', 'Laura', 'García', '2000-05-15'),('E002', 'Pedro', 'López', '1999-08-22'),('E003', 'Sofía', 'Martínez', '2001-11-30'),('E004', 'Miguel', 'Hernández', '2000-02-14'),('E005', 'Lucía', 'González', '1998-07-19'),('E006', 'Andrés', 'Pérez', '1999-12-05'),('E007', 'Mariana', 'Rodríguez', '2001-03-25'),('E008', 'Javier', 'Sánchez', '2000-09-10'),('E009', 'Valeria', 'Ramírez', '1998-04-18'),('E010', 'Diego', 'Torres', '1999-06-27'),('E011', 'Camila', 'Flores', '2001-01-12'),('E012', 'Daniel', 'Vargas', '2000-10-05'),('E013', 'Natalia', 'Morales', '1998-03-08'),('E014', 'Alejandro', 'Castro', '1999-11-21'),('E015', 'Isabella', 'Ortiz', '2001-07-02');
INSERT INTO asignatura (nombre, creditos, codigo, fk_idDocente, fk_idPrograma) VALUES ('Cálculo Diferencial', 4, 'CD101', 1, 1),('Matemáticas Discretas', 3, 'MD102', 2, 1),('Cultura Física', 3, 'CF103', 3, 1),('Herramientas Digitales', 4, 'HD104', 4, 1),('Procesos de Lectura y Escritura', 3, 'PLE105', 5, 1),('Pensamiento Algorítmico', 4, 'PA106', 1, 2),('Álgebra Superior', 3, 'AS107', 2, 2),('Sistemas Digitales', 3, 'SD108', 3, 2),('Estructura de Computadores', 4, 'EC109', 4, 2),('Mecánica', 3, 'M110', 5, 2),('Cálculo Integral', 4, 'CI111', 1, 1),('Fundamentos de POO', 3, 'FPOO112', 2, 1),('Diseño de Bases de Datos', 3, 'DBD113', 3, 1),('Planeación de Sistemas Informáticos', 4, 'PSI114', 4, 1),('Programación Orientada a Objetos', 3, 'POO115', 5, 1),('Sistemas Operativos', 4, 'SO116', 1, 2),('Programación de Dispositivos', 3, 'PD117', 2, 2),('Epistemología', 3, 'E118', 3, 2),('Motores de Bases de Datos', 4, 'MBD119', 4, 2),('Electromagnetismo', 3, 'EM120', 5, 2),('Aplicaciones Móviles', 4, 'AM121', 1, 1),('Administración de Servidores', 3, 'AS122', 2, 1),('Programación en Java', 3, 'PJ123', 3, 1),('Ética', 2, 'ET124', 4, 1),('Metodología de la Investigación I', 3, 'MI125', 5, 1),('Inglés II', 2, 'IN126', 1, 2),('Redes', 3, 'RE127', 2, 2),('Programación Web', 4, 'PW128', 3, 2),('Laboratorio de Física', 2, 'LF129', 4, 2),('Inglés I', 2, 'IN130', 5, 2),('Estructura de Datos', 3, 'ED131', 1, 1), ('Cálculo Diferencial', 4, 'CD101', 1, 3),('Matemáticas Discretas', 3, 'MD102', 2, 3),('Cultura Física', 3, 'CF103', 3, 3),('Herramientas Digitales', 4, 'HD104', 4, 3),('Procesos de Lectura y Escritura', 3, 'PLE105', 5, 3),('Pensamiento Algorítmico', 4, 'PA106', 1, 4),('Álgebra Superior', 3, 'AS107', 2, 4),('Sistemas Digitales', 3, 'SD108', 3, 4),('Estructura de Computadores', 4, 'EC109', 4, 4),('Mecánica', 3, 'M110', 5, 4);
INSERT INTO usuario (nombreUsuario, contraseña, fk_idRol) VALUES ('admin_user', 'admin_pass', 1),('docente_user', 'docente_pass', 2);
INSERT INTO seguimiento (fk_idEstudiante, fk_idUsuario) VALUES (1, 1),(2, 1),(3, 1),(4, 1),(5, 1),(6, 2),(7, 2),(8, 2),(9, 2),(10, 2),(11, 1),(12, 1),(13, 1),(14, 2),(15, 2);
INSERT INTO discapacidad_estudiante (fk_idEstudiante, fk_idDiscapacidad) VALUES (1, 1),(1, 2),(2, 3),(3, 4),(4, 5),(5, 6),(6, 7),(7, 8),(8, 9),(9, 10),(10, 11),(11, 12),(12, 13),(13, 14),(14, 15),(15, 16),(2, 17),(3, 18),(4, 19),(5, 20);
INSERT INTO estudiante_grupo (fk_idEstudiante, fk_idGrupo) VALUES (1, 1),(2, 1),(3, 2),(4, 2),(5, 3),(6, 3),(7, 4),(8, 4),(9, 5),(10, 5),(11, 1),(12, 2),(13, 3),(14, 4),(15, 5);
INSERT INTO inscripcion (periodo, nota, fecha_inscripcion, fk_idEstudiante, fk_idAsignatura) VALUES (1, 4.5, '2024-01-15', 1, 1),(1, 3.8, '2024-01-15', 2, 2),(1, 4.0, '2024-01-15', 3, 3),(1, 3.5, '2024-01-15', 4, 4),(1, 4.2, '2024-01-15', 5, 5),(1, 3.9, '2024-01-15', 6, 6),(1, 4.1, '2024-01-15', 7, 7),(1, 3.7, '2024-01-15', 8, 8),(1, 4.3, '2024-01-15', 9, 9),(1, 3.6, '2024-01-15', 10, 10),(1, 4.4, '2024-01-15', 11, 11),(1, 3.8, '2024-01-15', 12, 12),(1, 4.0, '2024-01-15', 13, 13),(1, 3.9, '2024-01-15', 14, 14),(1, 4.1, '2024-01-15', 15, 15),(2, 4.2, '2024-08-20', 1, 16),(2, 3.7, '2024-08-20', 2, 17),(2, 4.3, '2024-08-20', 3, 18),(2, 3.6, '2024-08-20', 4, 19),(2, 4.4, '2024-08-20', 5, 20),(2, 3.8, '2024-08-20', 6, 21),(2, 4.0, '2024-08-20', 7, 22),(2, 3.9, '2024-08-20', 8, 23),(2, 4.1, '2024-08-20', 9, 24),(2, 3.7, '2024-08-20', 10, 25),(2, 4.2, '2024-08-20', 11, 26),(2, 3.8, '2024-08-20', 12, 27),(2, 4.0, '2024-08-20', 13, 28),(2, 3.9, '2024-08-20', 14, 29),(2, 4.1, '2024-08-20', 15, 30);
INSERT INTO telefono (numero, esEmergencia, tipoPersona, fk_idEstudiante, fk_idDocente) VALUES ('3001234567', false, 'Estudiante', 1, NULL),('3002345678', true, 'Estudiante', 1, NULL), ('3003456789', false, 'Estudiante', 2, NULL),('3004567890', true, 'Estudiante', 2, NULL),('3005678901', false, 'Estudiante', 3, NULL),('3006789012', true, 'Estudiante', 4, NULL),('3007890123', false, 'Estudiante', 5, NULL),('3008901234', true, 'Estudiante', 6, NULL),('3009012345', false, 'Estudiante', 7, NULL),('3000123456', true, 'Estudiante', 8, NULL),('3001234561', false, 'Estudiante', 9, NULL),('3002345672', true, 'Estudiante', 10, NULL),('3003456783', false, 'Estudiante', 11, NULL),('3004567894', true, 'Estudiante', 12, NULL),('3005678905', false, 'Estudiante', 13, NULL),('3101234567', false, 'Docente', NULL, 1),('3102345678', true, 'Docente', NULL, 1),('3103456789', false, 'Docente', NULL, 2),('3104567890', true, 'Docente', NULL, 3),('3105678901', false, 'Docente', NULL, 4),('3106789012', true, 'Docente', NULL, 5),('3107890123', false, 'Docente', NULL, 5);
INSERT INTO correo (correo, tipoPersona, fk_idEstudiante, fk_idDocente) VALUES ('laura.garcia@example.com', 'Estudiante', 1, NULL),('laura.garcia2@example.com', 'Estudiante', 1, NULL), ('pedro.lopez@example.com', 'Estudiante', 2, NULL),('pedro.lopez2@example.com', 'Estudiante', 2, NULL), ('sofia.martinez@example.com', 'Estudiante', 3, NULL),('miguel.hernandez@example.com', 'Estudiante', 4, NULL),('lucia.gonzalez@example.com', 'Estudiante', 5, NULL),('andres.perez@example.com', 'Estudiante', 6, NULL),('mariana.rodriguez@example.com', 'Estudiante', 7, NULL),('javier.sanchez@example.com', 'Estudiante', 8, NULL),('valeria.ramirez@example.com', 'Estudiante', 9, NULL),('diego.torres@example.com', 'Estudiante', 10, NULL),('camila.flores@example.com', 'Estudiante', 11, NULL),('daniel.vargas@example.com', 'Estudiante', 12, NULL),('natalia.morales@example.com', 'Estudiante', 13, NULL),('alejandro.castro@example.com', 'Estudiante', 14, NULL),('isabella.ortiz@example.com', 'Estudiante', 15, NULL),('juan.perez@example.com', 'Docente', NULL, 1),('juan.perez2@example.com', 'Docente', NULL, 1),('maria.gonzalez@example.com', 'Docente', NULL, 2),('carlos.rodriguez@example.com', 'Docente', NULL, 3),('ana.martinez@example.com', 'Docente', NULL, 4),('luis.fernandez@example.com', 'Docente', NULL, 5),('luis.fernandez2@example.com', 'Docente', NULL, 5);
INSERT INTO grupo_asignatura (fk_idGrupo, fk_idAsignatura) VALUES (1, 1), (1, 11), (2, 1), (2, 12), (3, 2), (3, 13), (4, 3),  (4, 14), (5, 4),  (5, 15);