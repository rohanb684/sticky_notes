const notesContainer = document.getElementById("app")
const addNoteBtn = notesContainer.querySelector(".add-note");


getNotes().forEach((note) => {
    const noteElement = createElement(note.id, note.content);
    notesContainer.insertBefore(noteElement, addNoteBtn);
});

addNoteBtn.addEventListener("click",()=> addNote());

function getNotes(){
    return JSON.parse(localStorage.getItem("sticky-notes") || "[]");
}

function saveNotes(notes){
    localStorage.setItem("sticky-notes",JSON.stringify(notes));
}

function createElement(id, content){
  const container = document.createElement("div");
  container.classList.add("note-container");

  const noteElement  = document.createElement("textarea");

  noteElement.classList.add("note");
  noteElement.value = content;
  noteElement.placeholder = "Empty Sticky Note";

  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-btn")
 
  container.appendChild(noteElement);
  container.appendChild(deleteIcon);

  container.addEventListener("change",()=>{   // why do we have this eventlisteners inside a function
      updateNote(id, noteElement.value);   
  });

  deleteIcon.addEventListener("click",()=>{   // why do we have this eventlisteners inside a function
    const doDelete = confirm("Do you want to delete?");

    if(doDelete){
        deleteNote(id, container);
    }
  })

  return container
}

function addNote(){
   const notes = getNotes();
   const noteObject = {id: Math.random()*1000 , content: ""};

   const noteElement = createElement(noteObject.id, noteObject.content);
   notesContainer.insertBefore(noteElement, addNoteBtn);

   notes.push(noteObject);
   saveNotes(notes);
}

function updateNote(id, newContent){
  const notes = getNotes();
  const targetNote = notes.filter(note=>note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes)
}

function deleteNote(id, element){  
    const notes = getNotes().filter(note=>note.id != id)
    saveNotes(notes);
    notesContainer.removeChild(element);
    // unable to understand if we are just taking out the ids
}