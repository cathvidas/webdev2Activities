let studentList = [[1, "Cath", 19, "CCT", 1], [2, "Vidas", 20,"BSIT", 2]];
let count = studentList.length + 1;
let tableBody = document.getElementsByTagName('tbody')[0];
let modal = document.getElementById('modal');
let modalHeading = document.getElementById('modalHeading');
let modalForm = document.getElementById('modalForm');
let inputField = modalForm.getElementsByTagName('input');
let studId = document.getElementById('studId');

renderTable()

modalForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default action of the form submit event
});

// Display Add modal
function showAddModal(){
    modal.style.display = 'block'
    modalForm.getElementsByTagName('label')[0].style.display = 'block';
    inputField[0].style.display = 'block';
    modalHeading.innerHTML = "Add New Student";
    document.getElementById('idHolder').style.display = 'none';
    for(let i = 0; i < inputField.length; i++){
        inputField[i].value = "";
    }
}

// Display Edit modal
function showEditModal(index) {
    modal.style.display = 'block';
    modalHeading.innerHTML = "Edit Student Information";
    document.getElementById('idHolder').style.display = 'block';
    studId.innerHTML = studentList[index][0];
    for (let i = 0; i < inputField.length; i++) {
        inputField[i].value = studentList[index][i+1];
    }
}

// Render Table
function renderTable() {
    tableBody.innerHTML = '';
    for (let i = 0; i < studentList.length; i++) {
        let row = document.createElement('tr');
        for (let d = 0; d < studentList[i].length; d++) {
            let tableData = document.createElement('td');
            tableData.innerHTML = studentList[i][d];
            row.appendChild(tableData);
        }
        let actionCol = document.createElement('td');
        actionCol.setAttribute('id', i);
        actionCol.className = 'act-col';
        actionCol.innerHTML ="<button>Edit</button><button>Delete</button>";
        row.appendChild(actionCol);
        tableBody.appendChild(row)
        let editBtn = actionCol.getElementsByTagName('button')[0];
        editBtn.addEventListener('click', function(){
            showEditModal(actionCol.id)
        })
        let delBtn = actionCol.getElementsByTagName('button')[1];
        delBtn.addEventListener('click', function(){
            studentList.splice(actionCol.id, 1)
            renderTable()
        })
    }
}

function editOrAddStudent(){
    if (modalHeading.innerHTML == 'Add New Student') {
        let inputList = [];
        inputList[0] = count;
        for (let i = 0; i < inputField.length; i++) {
            if (inputField[i] != '') {
                inputList[i+1] = inputField[i].value;
            }
        }
        studentList.push(inputList);
        count++;
    }
    if (modalHeading.innerHTML == 'Edit Student Information') {
        for (let i = 0; i < studentList.length; i++) {
            if (studentList[i][0] == studId.innerHTML) {
                for (let x = 0; x < inputField.length; x++) {
                    studentList[i][x+1] = inputField[x].value;
                }
            }
        }
    }
    renderTable()
    modal.style.display = 'none'
}