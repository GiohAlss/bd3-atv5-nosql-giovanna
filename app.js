const studentsList = document.querySelector('#students-list');

function renderStudents(doc) {

    let li = document.createElement('li');
    let aluno = document.createElement('span');
    let excluir = document.createElement('div');
    excluir.textContent='x'

    li.setAttribute('data-id', doc.id);
    aluno.textContent = doc.data().aluno;
    
    li.appendChild(aluno);
    li.appendChild(excluir);

    excluir.addEventListener('click', (event)=>{
        event.stopPropagation();
        let id = event.target.parentElement.getAttribute('data-id');

        db.collection('students-firestore').doc(id).delete()
        .then(()=>{window.location.reload ()})
    });

    studentsList.appendChild(li);
}

db.collection('students-firestore')
    .get()
    .then(
        (snapshot)=> {
            snapshot.docs.forEach(doc => {
                renderStudents(doc);
            });
        }
    )

const form = document.querySelector('#add-student-form');

form.addEventListener('submit', (event)=> {

    event.preventDefault();
    db.collection('students-firestore').add({
        aluno: form.aluno.value
    }).then(()=> {
        form.aluno.value = '';
        window.location.reload(); 
    });
})
