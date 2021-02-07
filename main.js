// i am doing a learn

const url = 'http://localhost:3000/notes/'
const noteForm = document.querySelector('#note-form')
const noteList = document.querySelector('#note-list')
console.log(noteForm)
// add some event listeners here ya dum dum

noteForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log('clicked')
    const noteTitle = document.querySelector('#inputTitle').value
    const noteBody = document.querySelector('#inputBody').value
    createNote(noteTitle, noteBody)
    
})

noteList.addEventListener ('click', function (event) {
    if (event.target.classList.contains('delete')) {
        deleteNote(event.target)
    }
    if (event.target.classList.contains('edit')) {
        editNote(event.target)
    }
    if (event.target.classList.contains('update-note')) {
        updateNote(event.target)
    }
    if (event.target.classList.contains('cancel-note')) {
        hideEditControl(event.target.parentElement)
    }
})


// CRUD STUFF

//  list the notes

function allNotes () {
    fetch (url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            for (let note of data) {
                console.log(note)
                renderNoteItem(note)
            }
        })
}

// create post request

function createNote (noteTitle, noteBody) {
    fetch (url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
            title: noteTitle,
            body: noteBody,
            created_at: moment().format('MMMM Do YYYY, h:mm;ss a')
        })
    })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                renderNoteItem(data)
                })
    }

// delete function

function deleteNote (element) {
    const noteId = element.parentElement.id
    fetch(`http://localhost:3000/notes/${noteId}`, {
        method: 'DELETE'
    })
        .then(function () {
            element.parentElement.remove()
        })
}

// create update note function

function updateNote (element) {
    const noteId = element.parentElement.id
    const noteBody = document.querySelector('.edit-text')
        fetch(`http://localhost:3000/notes/${noteId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                body: noteBody.value,
                updated_at: moment().format('MMMM Do YYYY, h:mm;ss a')
            })
        })
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
                renderNoteText(element.parentElement, data)
            })
}


// render notes to page - 

function renderNoteItem (noteObj) {
    const noteEl = document.createElement('li')
    noteEl.id = noteObj.id
    renderNoteText(noteEl, noteObj)
    noteList.appendChild(noteEl)
    clearInputs()
}

function renderNoteText (noteListItem, noteObj) {
    noteListItem.innerHTML = `<p>${noteObj.body}</p>`
}

// show/hide edit, edit functions

function editNote (element) {
    renderEditInput(element, parentElement)
}

function renderEditInput (noteItem) {
    noteItem.innerHTML = `
        <input class="edit-text" type="text" value="${noteItem.textContent}" autofocus>
        <button class="update-note" data-note=${noteItem.id}>save notes?</button>
        <button class="cancel-note">cancel notes?</button>
        `
        noteItem.querySelector('input').select()
}

function hideEditControl (noteItem) {
    fetch (`http://localhost:3000/notes/${noteItem.id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            renderNoteItem(noteItem, data)
        })
}

// clear input function

function clearInputs () {
    const inputs = document.querySelectorAll('input')
    for (let field of inputs) {
        field.value = ''
    }
}

allNotes ()