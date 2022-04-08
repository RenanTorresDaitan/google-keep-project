import NoteList from "./note-list.js";
import NoteItem from "./note-item.js";
import buildNoteCard from "./note-card-dom-element.js";

const notesDiv = document.querySelector("#notes-area");
const APP_NAME = "Keep-Notes";
const notesList = new NoteList();

// Search Notes functionality:
const searchIconBtn = document.querySelector("#search-icon-btn");
const searchPanel = document.querySelector("#search-panel");
const searchInput = document.querySelector("#search-input");
const cancelSearchBtn = document.querySelector("#search-cancel-btn");
searchIconBtn.addEventListener("click", () => toggleVisibility(searchPanel));
cancelSearchBtn.addEventListener("click", (event) => {
  searchInput.value = "";
  Array.from(notesDiv.children).forEach((note) => {
    note.classList.remove("hide");
  });
  toggleVisibility(searchPanel);
});
searchInput.addEventListener("input", (event) => {
  Array.from(notesDiv.children).forEach((note) => {
    note.classList.toggle(
      "hide",
      !note.innerText.toLowerCase().includes(event.target.value.toLowerCase())
    );
  });
});

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initializeApp();
  }
});

const initializeApp = () => {
  loadNotesFromLocalStorage();
  reloadNotes();
};

const updateNotesOnLocalStorage = () => {
  localStorage.setItem(APP_NAME, JSON.stringify(notesList));
};

const loadNotesFromLocalStorage = () => {
  const storedList = localStorage.getItem(APP_NAME);
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList._list.forEach((note) => {
    const newItem = createNoteItemObject(note);
    notesList.addNoteToList(newItem);
  });
};

function reloadNotes() {
  deleteContents(notesDiv);
  renderNotes();
}

const createNoteItemObject = (noteInfo) => {
  const noteId = noteInfo._id;
  const { noteTitle, noteDescription, noteTime } = noteInfo._item;
  const note = new NoteItem();
  note.setId(noteId);
  note.setNote({ noteTitle, noteDescription, noteTime });
  return note;
};

const takeNewNoteBtn = document.querySelector("#new-note-button");
takeNewNoteBtn.addEventListener("click", () => {
  createNewNote({
    _id: Date.now().toString(),
    _item: {
      noteTitle: "",
      noteDescription: "",
      noteTime: Date.now(),
    },
  });
  notesDiv.querySelector(".note-card-title").firstChild.click();
  notesDiv.querySelector(".note-card-desc").firstChild.click();
});

function createNewNote(noteInfo) {
  const newNote = createNoteItemObject(noteInfo);
  notesList.addNoteToList(newNote);
  updateNotesOnLocalStorage();
  reloadNotes();
}

export function deleteNote(id) {
  notesList.removeNoteFromList(id);
  updateNotesOnLocalStorage();
  reloadNotes();
  
}
export function updateNote(noteInfo) {
  notesList.removeNoteFromList(noteInfo._id);
  createNewNote(noteInfo);
}

// Helper functions
const renderNotes = () => {
  if (notesList.getList().length >= 0) {
    document.querySelector(".no-notes-found").classList.toggle("hide", notesList.getList().length);
    notesList
      .getList()
      .sort((a, b) => b.getNote().noteTime - a.getNote().noteTime)
      .forEach((item) => buildNoteCard(item, notesDiv));
  }
};
export function toggleVisibility(domElement) {
  if (domElement.style.display == "none") {
    domElement.style.display = "";
    return;
  }
  domElement.style.display = "none";
}
const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};
