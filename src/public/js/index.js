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
                <td>${estudiante.Correos ? estudiante.Correos.map(c => c.correo).join(', ') : 'N/A'}</td>
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
            <div class="detail-item"><strong>Discapacidad:</strong> ${estudiante.Discapacidades ? `<ul>${estudiante.Discapacidades.map(d => `<li>${d.tipo}</li>`).join('')}</ul>` : 'N/A'}</div>
            <div class="detail-item"><strong>Teléfonos:</strong> ${estudiante.Telefonos ? `<ul>${estudiante.Telefonos.map(t => `<li>${t.numero}</li>`).join('')}</ul>` : 'N/A'}</div>
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
    alert('Actualizar estudiante con código: ' + codigo);
    // Aquí puedes agregar la lógica para actualizar el estudiante
}

function deleteStudent(codigo) {
    alert('Eliminar estudiante con código: ' + codigo);
    // Aquí puedes agregar la lógica para eliminar el estudiante
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
            case 'correo':
                txtValue = estudiante.Correos ? estudiante.Correos.map(c => c.correo).join(', ') : '';
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
