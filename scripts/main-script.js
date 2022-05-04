import { startEditingNewNote } from "./create-new-note-dom-element.js";
import NoteList from "./note-list.js";
import NoteItem from "./note-item.js";
import buildNoteCard from "./note-card-dom-element.js";

const notesDiv = document.querySelector("#notes-area");
const APP_NAME = "Keep-Notes";
export const notesList = new NoteList();

// Search Notes functionality:
const searchIconBtn = document.querySelector("#search-icon-btn");
const searchPanel = document.querySelector("#search-panel");
const searchInput = document.querySelector("#search-input");
const cancelSearchBtn = document.querySelector("#search-cancel-btn");
searchIconBtn.addEventListener("click", () => {
  searchPanel.classList.remove("hide");
  searchInput.focus();
});
cancelSearchBtn.addEventListener("click", (event) => {
  searchInput.value = "";
  Array.from(notesDiv.children).forEach((note) => {
    note.classList.remove("hide");
  });
  searchPanel.classList.add("hide");
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
  reloadNotes();
};

const loadNotesFromLocalStorage = () => {
  const storedList = localStorage.getItem(APP_NAME);
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList._list.forEach((note) => {
    createNewNote(note);
  });
};

function reloadNotes() {
  deleteContents(notesDiv);
  renderNotes();
}
// Take new notes
const takeNewNoteBtn = document.querySelector("#new-note-button");
takeNewNoteBtn.addEventListener("click", () => {
  startEditingNewNote();
});

export function createAndSaveNewItem(newItem) {
  createNewNote(newItem);
  updateNotesOnLocalStorage();
}


// Create a list
const makeNewListBtn = document.querySelector("#new-list-button");
makeNewListBtn.addEventListener("click", () => createAndSaveNewItem(true));
// Get side bar buttons
const notesSideBarBtn = document.querySelector("#sidebar-item-notes");
const remindersSideBarBtn = document.querySelector("#sidebar-item-reminders");
const editLabelsSideBarBtn = document.querySelector("#sidebar-item-edit-labels");
const archiveSideBarBtn = document.querySelector("#sidebar-item-archive");
const trashSideBarBtn = document.querySelector("#sidebar-item-trash");
// Change active Sidebar Item
[notesSideBarBtn,remindersSideBarBtn,editLabelsSideBarBtn,archiveSideBarBtn,trashSideBarBtn].forEach((item) => {
  item.addEventListener("click", (event) => {
    removeActiveFromSidebarItems();
    item.setAttribute("active", "");
    showNotesFromSidebar(item);
  });
});

function showNotesFromSidebar() {
  const activeSidebar = document.querySelector("[id^='sidebar-item-'][active]");
  showDefaultSidebarContent(activeSidebar);
  Array.from(notesDiv.children).forEach((note) => {
    const noteItem = notesList.getNoteById(note.getAttribute("data-note-id"));
    note.classList.add("hide");
    if (activeSidebar == notesSideBarBtn && !noteItem.isTrashed && !noteItem.isArchived) {
      note.classList.remove("hide");
    }
    if (activeSidebar == remindersSideBarBtn && noteItem.isReminder && !noteItem.isTrashed && !noteItem.isArchived) {
      note.classList.remove("hide");
    }
    if (activeSidebar == archiveSideBarBtn && noteItem.isArchived && !noteItem.isTrashed) {
      note.classList.remove("hide");
    }
    if (activeSidebar == trashSideBarBtn && noteItem.isTrashed) {
      note.classList.remove("hide");
    }
  });
}

function showDefaultSidebarContent(activeSidebar) {
  
  const noNotesDiv = document.querySelector(".no-notes-found");
  const noRemindersDiv = document.querySelector(".no-reminders-found");
  const noArchivedDiv = document.querySelector(".no-archived-found");
  const noTrashedDiv = document.querySelector(".no-trashed-found");
  const trashHeader = document.querySelector(".trash-header");
  trashHeader.classList.add("hide");
  noRemindersDiv.classList.add("hide");
  noArchivedDiv.classList.add("hide");
  noTrashedDiv.classList.add("hide");
  noNotesDiv.classList.add("hide");
  if (activeSidebar == notesSideBarBtn) {
    const currentNotes = notesList.getList().filter(item => !item.isTrashed && !item.isArchived).length;
    currentNotes > 0 ? noNotesDiv.classList.add("hide") : noNotesDiv.classList.remove("hide");
  }
  if (activeSidebar == remindersSideBarBtn) {
    const currentNotes = notesList.getList().filter(item => item.isReminder).length;
    currentNotes > 0 ? noRemindersDiv.classList.add("hide") : noRemindersDiv.classList.remove("hide");
  }
  if (activeSidebar == archiveSideBarBtn) {
    const currentNotes = notesList.getList().filter(item => item.isArchived).length;
    currentNotes > 0 ? noArchivedDiv.classList.add("hide") : noArchivedDiv.classList.remove("hide");
  }
  if (activeSidebar == trashSideBarBtn) {
    const currentNotes = notesList.getList().filter(item => item.isTrashed).length;
    currentNotes > 0 ? noTrashedDiv.classList.add("hide") : noTrashedDiv.classList.remove("hide");
    trashHeader.classList.remove("hide");
  }
}
function removeActiveFromSidebarItems() {
  document
    .querySelectorAll("[id^='sidebar-item-']")
    .forEach((el) => el.removeAttribute("active"));
}




function createNewNote(noteInfo) {
  const newNote = new NoteItem(noteInfo);
  notesList.addNoteToList(newNote);
}

// Exported note functions

export function addReminder(id) {
  notesList.getNoteById(id).isReminder = true;
  updateNotesOnLocalStorage();
}
export function archiveNote(id) {
  notesList.getNoteById(id).isArchived = true;
  updateNotesOnLocalStorage();
}
export function deleteNote(id) {
  notesList.removeNoteFromList(id);
  updateNotesOnLocalStorage();
}
export function restoreNote(id) {
  notesList.getNoteById(id).isTrashed = false;
  updateNotesOnLocalStorage();
}
export function trashNote(id) {
  notesList.getNoteById(id).isTrashed = true;
  updateNotesOnLocalStorage();
}
export function unarchiveNote(id) {
  notesList.getNoteById(id).isArchived = false;
  updateNotesOnLocalStorage();
}
export function pinNote(id) {
  const noteToPin = notesList.getNoteById(id);
  noteToPin.isPinned = noteToPin.isPinned ? false : true;
  updateNotesOnLocalStorage();
}
export function updateNote(noteInfo) {
  const updatedNote = { ...notesList.getNoteById(noteInfo._id), ...noteInfo };
  notesList.removeNoteFromList(noteInfo._id);
  createNewNote(updatedNote);
  updateNotesOnLocalStorage();
}

// Helper functions
const renderNotes = () => {
  document.querySelector("#new-note-div").style.display = "";
  const sortedList = notesList.getList();
  if (sortedList.length) {
    sortedList
      .sort((a, b) => b.getTime() - a.getTime())
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
    const createdNoteCards = sortedList.map((item) => buildNoteCard(item));
    createdNoteCards.forEach(note => notesDiv.append(note));
    showNotesFromSidebar();
  }
};

function toggleVisibility(domElement) {
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
