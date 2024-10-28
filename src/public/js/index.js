let currentPage = 1;
const studentsPerPage = 5;
let students = [];
let filteredStudents = students;

async function fetchStudents() {
    try {
        const response = await fetch('/estudiante');
        const data = await response.json();
        students = data.estudiantes;
        renderTable();
    } catch (error) {
        console.error('Error al obtener los estudiantes:', error);
    }
}

function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderTable(data = students) {
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * studentsPerPage;
    const end = start + studentsPerPage;
    const paginatedStudents = data.slice(start, end);

    if (paginatedStudents.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5">No hay estudiantes para mostrar</td></tr>';
    } else {
        paginatedStudents.forEach(estudiante => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${estudiante.codigoEstudiante}</td>
                <td>${estudiante.nombre} ${estudiante.apellido}</td>
                <td>${estudiante.Discapacidades ? estudiante.Discapacidades.map(d => d.tipo).join(', ') : 'N/A'}</td>
                <td>${estudiante.Telefonos ? estudiante.Telefonos.map(t => t.numero).join(', ') : 'N/A'}</td>
                <td>${estudiante.fechaNacimiento ? new Date(estudiante.fechaNacimiento).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'N/A'}</td>
            `;
            row.onclick = () => toggleDetails(estudiante.codigoEstudiante);
            tableBody.appendChild(row);

            const detailsRow = document.createElement('tr');
            detailsRow.classList.add('details-row');
            detailsRow.id = `details-${estudiante.codigoEstudiante}`;
            detailsRow.style.display = 'none';
            detailsRow.innerHTML = `
                <td colspan="5">
                    <div class="details-card" id="details-card-${estudiante.codigoEstudiante}">
                        
                    </div>
                </td>
            `;
            tableBody.appendChild(detailsRow);
        });
    }

    document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${Math.ceil(data.length / studentsPerPage)}`;
}

function toggleDetails(codigo) {
    const detailsRow = document.getElementById(`details-${codigo}`);
    const detailsCard = document.getElementById(`details-card-${codigo}`);
    if (detailsRow.style.display === 'table-row') {
        detailsRow.style.display = 'none';
    } else {
        detailsRow.style.display = 'table-row';
        const estudiante = students.find(est => est.codigoEstudiante === codigo);
        detailsCard.innerHTML = `
            <div class="detail-item"><strong>Código:</strong> ${codigo}</div>
            <div class="detail-item"><strong>Nombre:</strong> ${estudiante.nombre}</div>
            <div class="detail-item"><strong>Apellido:</strong> ${estudiante.apellido}</div>
            <div class="detail-item"><strong>Fecha de Nacimiento:</strong> ${estudiante.fechaNacimiento ? new Date(estudiante.fechaNacimiento).toLocaleDateString('es-ES', { timeZone: 'UTC' }) : 'N/A'}</div>
            <div class="detail-item"><strong>Discapacidad:</strong> ${estudiante.Discapacidades ? `<ul>${estudiante.Discapacidades.map(d => `<li>${d.tipo}</li>`).join('')}</ul>` : 'N/A'}</div>
            <div class="detail-item"><strong>Teléfonos:</strong> ${estudiante.Telefonos ? `<ul>${estudiante.Telefonos.map(t => `<li>${t.numero} ${t.esEmergencia ? '(Emergencia)' : ''}</li>`).join('')}</ul>` : 'N/A'}</div>
            <div class="detail-item"><strong>Correos:</strong> ${estudiante.Correos ? `<ul>${estudiante.Correos.map(c => `<li>${c.correo}</li>`).join('')}</ul>` : 'N/A'}</div>
            <div class="detail-item"><strong>Inscripción:</strong> ${estudiante.Inscripcions ? `<ul>${estudiante.Inscripcions.map(i => `<li>Periodo: ${i.Periodo}, Nota: ${i.nota}</li>`).join('')}</ul>` : 'N/A'}</div>
            <div class="detail-item"><strong>Asignaturas:</strong> ${estudiante.Asignaturas ? `<ul>${estudiante.Asignaturas.map(a => `<li>${a.nombre}</li>`).join('')}</ul>` : 'N/A'}</div>
            <div class="detail-item"><strong>Grupos:</strong> ${estudiante.Grupos ? `<ul>${estudiante.Grupos.map(g => `<li>${g.codigo}</li>`).join('')}</ul>` : 'N/A'}</div>
            <div class="actions">
                <button onclick="updateStudent('${codigo}')">Actualizar</button>
                <button onclick="deleteStudent('${codigo}')">Eliminar</button>
            </div>
        `;
        detailsCard.style.opacity = 0;
        setTimeout(() => {
            detailsCard.style.opacity = 1;
        }, 10);
    }
}

function updateStudent(codigo) {
    const student = students.find(est => est.codigoEstudiante === codigo);
    if (student) {
        const formHtml = `
            <form id="updateForm">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="${student.nombre}">
                
                <label for="apellido">Apellido:</label>
                <input type="text" id="apellido" name="apellido" value="${student.apellido}">
                
                <label for="fechaNacimiento">Fecha de Nacimiento:</label>
                <input type="date" id="fechaNacimiento" name="fechaNacimiento" value="${student.fechaNacimiento ? new Date(student.fechaNacimiento).toISOString().split('T')[0] : ''}">
                
                <label for="correos">Correos:</label>
                <input type="text" id="correo1" name="correo1" value="${student.Correos[0]?.correo || ''}">
                <input type="text" id="correo2" name="correo2" value="${student.Correos[1]?.correo || ''}">
                
                <label for="telefonos">Teléfonos:</label>
                <div>
                    <input type="text" id="telefono1" name="telefono1" value="${student.Telefonos[0]?.numero || ''}">
                    <label>
                        <input type="checkbox" id="telefono1Emergencia" name="telefono1Emergencia" ${student.Telefonos[0]?.esEmergencia ? 'checked' : ''}>
                        Emergencia
                    </label>
                </div>
                <div>
                    <input type="text" id="telefono2" name="telefono2" value="${student.Telefonos[1]?.numero || ''}">
                    <label>
                        <input type="checkbox" id="telefono2Emergencia" name="telefono2Emergencia" ${student.Telefonos[1]?.esEmergencia ? 'checked' : ''}>
                        Emergencia
                    </label>
                </div>
                
                <label for="discapacidades">Discapacidades:</label>
                <select id="discapacidades" name="discapacidades" multiple>
                    <option value="Visual">Visual</option>
                    <option value="Auditiva">Auditiva</option>
                    <option value="Motora">Motora</option>
                    <option value="Intelectual">Intelectual</option>
                    <option value="Psicosocial">Psicosocial</option>
                    <option value="Lenguaje">Lenguaje</option>
                    <option value="Visceral">Visceral</option>
                    <option value="Múltiple">Múltiple</option>
                    <option value="Cognitiva">Cognitiva</option>
                    <option value="Desarrollo">Desarrollo</option>
                    <option value="Neurológica">Neurológica</option>
                    <option value="Sensorial">Sensorial</option>
                    <option value="Crónica">Crónica</option>
                    <option value="Transitoria">Transitoria</option>
                    <option value="Respiratoria">Respiratoria</option>
                    <option value="Cardíaca">Cardíaca</option>
                    <option value="Renal">Renal</option>
                    <option value="Hepática">Hepática</option>
                    <option value="Inmunológica">Inmunológica</option>
                    <option value="Dermatológica">Dermatológica</option>
                </select>
                
                <button type="button" onclick="submitUpdate('${codigo}')">Actualizar</button>
                <button type="button" onclick="closeModal()">Cerrar</button>
            </form>
        `;
        document.getElementById('modalContent').innerHTML = formHtml;
        document.getElementById('modal').style.display = 'block';

        // Preseleccionar las discapacidades del estudiante
        const select = document.getElementById('discapacidades');
        student.Discapacidades.forEach(d => {
            for (let option of select.options) {
                if (option.value === d.tipo) {
                    option.selected = true;
                }
            }
        });
    } else {
        alert('Estudiante no encontrado');
    }
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

async function submitUpdate(codigo) {
    const form = document.getElementById('updateForm');
    const updatedStudent = {
        nombre: form.nombre.value,
        apellido: form.apellido.value,
        fechaNacimiento: form.fechaNacimiento.value,
        Correos: [
            { correo: form.correo1.value },
            { correo: form.correo2.value }
        ].filter(c => c.correo), // Filtrar correos vacíos
        Telefonos: [
            { numero: form.telefono1.value, esEmergencia: form.telefono1Emergencia.checked },
            { numero: form.telefono2.value, esEmergencia: form.telefono2Emergencia.checked }
        ].filter(t => t.numero), // Filtrar teléfonos vacíos
        Discapacidades: Array.from(form.discapacidades.selectedOptions).map(option => ({ tipo: option.value }))
    };
    try {
        const response = await fetch(`/actualizarEstudiante/${codigo}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedStudent)
        });

        if (response.ok) {
            const index = students.findIndex(est => est.codigoEstudiante === codigo);
            if (index !== -1) {
                students[index] = { ...students[index], ...updatedStudent };
                filteredStudents = students; // Actualiza la lista filtrada
                renderTable();
                document.getElementById('modal').style.display = 'none';
                alert('Estudiante actualizado correctamente');
            }
        } else {
            alert('Error al actualizar el estudiante en la base de datos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al actualizar el estudiante');
    }
}

async function deleteStudent(codigo) {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar al estudiante con código: ' + codigo + '?');
    if (confirmDelete) {
        try {
            const response = await fetch(`/borrarEstudiante/${codigo}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                students = students.filter(est => est.codigoEstudiante !== codigo);
                filteredStudents = students; // Actualiza la lista filtrada
                renderTable();
                alert('Estudiante eliminado');
            } else {
                alert('Error al eliminar el estudiante en la base de datos');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al eliminar el estudiante');
        }
    }
}

function filterTable() {
    const filterSelect = document.getElementById('filterSelect').value;
    const filterInput = normalizeString(document.getElementById('filterInput').value);
    filteredStudents = students.filter(estudiante => {
        let txtValue = '';
        switch (filterSelect) {
            case 'codigoEstudiante':
                txtValue = estudiante.codigoEstudiante;
                break;
            case 'nombre':
                txtValue = estudiante.nombre;
                break;
            case 'apellido':
                txtValue = estudiante.apellido;
                break;
            case 'discapacidad':
                txtValue = estudiante.Discapacidades ? estudiante.Discapacidades.map(d => d.tipo).join(', ') : '';
                break;
            case 'telefono':
                txtValue = estudiante.Telefonos ? estudiante.Telefonos.map(t => t.numero).join(', ') : '';
                break;
        }
        return normalizeString(txtValue).includes(filterInput);
    });
    currentPage = 1; // Resetear a la primera página después de filtrar
    renderTable(filteredStudents);
}

function sortTable(n) {
    const table = document.getElementById('studentsTable');
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = 'asc';

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 2); i += 2) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('TD')[n];
            y = rows[i + 2].getElementsByTagName('TD')[n];
            if (dir === 'asc') {
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            } else if (dir === 'desc') {
                if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                    shouldSwitch = true;
                    break;
                }
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 2], rows[i]);
            rows[i].parentNode.insertBefore(rows[i + 3], rows[i + 1]);
            switching = true;
            switchcount++;
        } else {
            if (switchcount === 0 && dir === 'asc') {
                dir = 'desc';
                switching = true;
            }
        }
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderTable(filteredStudents.length ? filteredStudents : students);
    }
}

function nextPage() {
    if (currentPage < Math.ceil((filteredStudents.length ? filteredStudents : students).length / studentsPerPage)) {
        currentPage++;
        renderTable(filteredStudents.length ? filteredStudents : students);
    }
}

// Inicializar la tabla obteniendo los datos de la API
fetchStudents();
