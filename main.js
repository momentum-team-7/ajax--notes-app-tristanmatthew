// no stealing plz
const url = 'http://localhost:3000/notes'

// fetch (url, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json'},
//     body: JSON.stringify ({
//         title: 'Another note',
//         body: 'letitsnow'
//     })
// })
const noteContainer = document.getElementById('noteContainer')
const nopeButton = document.getElementById ('nopebutton')

nopeButton.addEventListener ('click', getAllNotes)

function getAllNotes () {
    fetch (url)
        .then(function (response) {
            return response.json()
        })
        .then (function (data) {
            console.log(data)
            for (let note of data) {
                console.log(note)
                renderNoteItem(note)
            }
        })
}

function renderNoteItem (note) {
    const noteEl = document.createElement('li')
    noteEl.id = note.id
    renderNoteText(noteEl, note)
    noteContainer.appendChild(noteEl)
    // clearInputs()


}

function renderNoteText (noteEl, note) {
    noteEl.innerHTML = `<p>${note.body}</p>`
}
