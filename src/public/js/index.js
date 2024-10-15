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
    const filterInput = document.getElementById('filterInput').value.toLowerCase();
    const table = document.getElementById('studentsTable');
    const tr = table.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        const td = tr[i].getElementsByTagName('td');
        let txtValue = '';
        switch (filterSelect) {
            case 'codigoEstudiante':
                txtValue = td ? td.textContent || td.innerText : '';
                break;
            case 'nombre':
                txtValue = td ? td.textContent || td.innerText : '';
                break;
            case 'apellido':
                txtValue = td ? td.textContent || td.innerText : '';
                break;
            case 'discapacidad':
                txtValue = td ? td.textContent || td.innerText : '';
                break;
            case 'telefono':
                txtValue = td ? td.textContent || td.innerText : '';
                break;
            case 'correo':
                txtValue = td ? td.textContent || td.innerText : '';
                break;
        }
        if (txtValue.toLowerCase().indexOf(filterInput) > -1) {
            tr[i].style.display = '';
        } else {
            tr[i].style.display = 'none';
        }
    }
}

function sortTable(n) {
    const table = document.getElementById('studentsTable');
    let rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    switching = true;
    dir = 'asc';

    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('TD')[n];
            y = rows[i + 1].getElementsByTagName('TD')[n];
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
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
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
