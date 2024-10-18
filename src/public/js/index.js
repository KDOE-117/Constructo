let currentPage = 1;
const studentsPerPage = 5;
let students = []; // Aquí se almacenarán los datos de los estudiantes

// Función para obtener los datos de la API
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

// Función para normalizar cadenas de texto eliminando tildes
function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderTable(filteredStudents = students) {
    const tableBody = document.getElementById('studentsTableBody');
    tableBody.innerHTML = '';
    const start = (currentPage - 1) * studentsPerPage;
    const end = start + studentsPerPage;
    const paginatedStudents = filteredStudents.slice(start, end);

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
                    <!-- Aquí se insertarán los detalles del estudiante -->
                </div>
            </td>
        `;
        tableBody.appendChild(detailsRow);
    });

    document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${Math.ceil(filteredStudents.length / studentsPerPage)}`;
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
            <p><strong>Código:</strong> ${codigo}</p>
            <p><strong>Nombre:</strong> ${estudiante.nombre}</p>
            <p><strong>Apellido:</strong> ${estudiante.apellido}</p>
            <p><strong>Discapacidad:</strong> ${estudiante.Discapacidades ? estudiante.Discapacidades.map(d => d.tipo).join(', ') : 'N/A'}</p>
            <p><strong>Teléfonos:</strong> ${estudiante.Telefonos ? estudiante.Telefonos.map(t => t.numero).join(', ') : 'N/A'}</p>
            <p><strong>Correos:</strong> ${estudiante.Correos ? estudiante.Correos.map(c => c.correo).join(', ') : 'N/A'}</p>
            <p><strong>Inscripciones:</strong> ${estudiante.Inscripcions ? estudiante.Inscripcions.map(i => `Periodo: ${i.Periodo}, Nota: ${i.nota}`).join('<br>') : 'N/A'}</p>
            <p><strong>Asignaturas:</strong> ${estudiante.Asignaturas ? estudiante.Asignaturas.map(a => a.nombre).join(', ') : 'N/A'}</p>
            <p><strong>Grupos:</strong> ${estudiante.Grupos ? estudiante.Grupos.map(g => g.codigo).join(', ') : 'N/A'}</p>
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
    const filteredStudents = students.filter(estudiante => {
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
        for (i = 1; i < (rows.length - 2); i += 2) { // Ajuste para incluir filas de detalles
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('TD')[n];
            y = rows[i + 2].getElementsByTagName('TD')[n]; // Ajuste para incluir filas de detalles
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
            rows[i].parentNode.insertBefore(rows[i + 2], rows[i]); // Ajuste para incluir filas de detalles
            rows[i].parentNode.insertBefore(rows[i + 3], rows[i + 1]); // Ajuste para incluir filas de detalles
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
        renderTable();
    }
}

function nextPage() {
    if (currentPage < Math.ceil(students.length / studentsPerPage)) {
        currentPage++;
        renderTable();
    }
}

// Inicializar la tabla obteniendo los datos de la API
fetchStudents();
