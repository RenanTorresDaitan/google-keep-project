import { startEditingNewNote } from "./create-new-note-dom-element.js";
import NoteList from "./note-list.js";
import NoteItem from "./note-item.js";
import buildNoteCard from "./note-card-dom-element.js";

const APP_NAME = "Keep-Notes";
const SEVEN_DAYS_IN_MILLISECONDS = 604800000;
const MOBILE_SCREEN_SIZE = 900;

const notesArea = document.querySelector("#notes-area");
export const noteItemsList = new NoteList();

const changeToNotesOnMobile = new ResizeObserver((item) => {
  if (item[0].contentRect.width < MOBILE_SCREEN_SIZE) {
    notesSideBarBtn.click();
  }
});
changeToNotesOnMobile.observe(document.body);

// Search Notes functionality:
const searchIconBtn = document.querySelector("#search-icon-btn");
const searchPanel = document.querySelector("#search-panel");
const searchInput = document.querySelector("#search-input");
const cancelSearchBtn = document.querySelector("#search-cancel-btn");
searchIconBtn.addEventListener("click", () => {
  show(searchPanel);
  searchInput.focus();
});
cancelSearchBtn.addEventListener("click", (event) => {
  searchInput.value = "";
  Array.from(notesArea.children).forEach((note) => {
    show(note);
  });
  hide(searchPanel);
});
searchInput.addEventListener("input", (event) => {
  const searchTerm = event.target.value.toLowerCase();
  Array.from(notesArea.children).forEach((note) => {
    toggleVisibility(note, !note.innerText.toLowerCase().includes(searchTerm));
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
  localStorage.setItem(APP_NAME, JSON.stringify(noteItemsList));
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
  deleteContents(notesArea);
  renderNotes();
}
// Take new notes
const takeNewNoteBtn = document.querySelector("#new-note-button");
takeNewNoteBtn.addEventListener("click", () => startEditingNewNote("note"));
// Create a list
const makeNewListBtn = document.querySelector("#new-list-button");
makeNewListBtn.addEventListener("click", () => startEditingNewNote("list"));

export function createAndSaveNewItem(newItem) {
  createNewNote(newItem);
  updateNotesOnLocalStorage();
}

// Get side bar buttons
const notesSideBarBtn = document.querySelector("#sidebar-item-notes");
const remindersSideBarBtn = document.querySelector("#sidebar-item-reminders");
const editLabelsSideBarBtn = document.querySelector(
  "#sidebar-item-edit-labels"
);
const archiveSideBarBtn = document.querySelector("#sidebar-item-archive");
const trashSideBarBtn = document.querySelector("#sidebar-item-trash");
// Change active Sidebar Item
[
  notesSideBarBtn,
  remindersSideBarBtn,
  editLabelsSideBarBtn,
  archiveSideBarBtn,
  trashSideBarBtn,
].forEach((item) => {
  item.addEventListener("click", (event) => {
    removeActiveFromSidebarItems();
    item.setAttribute("active", "");
    showNotesFromSidebar(item);
  });
});

const emptyTrashBtn = document.querySelector(".empty-trash-btn");
emptyTrashBtn.addEventListener("click", () => {
  noteItemsList.getList().filter((item) => {
    if (item.isTrashed) noteItemsList.removeNoteFromList(item.getId());
  });
  updateNotesOnLocalStorage();
});
function showNotesFromSidebar() {
  const activeSidebar = document.querySelector("[id^='sidebar-item-'][active]");
  showDefaultSidebarContent(activeSidebar);
  Array.from(notesArea.children).forEach((note) => {
    const noteItem = noteItemsList.getNoteById(
      note.getAttribute("data-note-id")
    );
    hide(note);
    if (
      activeSidebar == notesSideBarBtn &&
      !noteItem.isTrashed &&
      !noteItem.isArchived
    )
      show(note);
    if (
      activeSidebar == remindersSideBarBtn &&
      noteItem.isReminder &&
      !noteItem.isTrashed &&
      !noteItem.isArchived
    )
      show(note);
    if (
      activeSidebar == archiveSideBarBtn &&
      noteItem.isArchived &&
      !noteItem.isTrashed
    )
      show(note);

    if (activeSidebar == trashSideBarBtn && noteItem.isTrashed) show(note);
  });
}

function showDefaultSidebarContent(activeSidebar) {
  const noNotesDiv = document.querySelector(".no-notes-found");
  const noRemindersDiv = document.querySelector(".no-reminders-found");
  const noArchivedDiv = document.querySelector(".no-archived-found");
  const noTrashedDiv = document.querySelector(".no-trashed-found");
  const trashHeader = document.querySelector(".trash-header");
  hide(trashHeader);
  hide(noRemindersDiv);
  hide(noArchivedDiv);
  hide(noTrashedDiv);
  hide(noNotesDiv);
  if (activeSidebar == notesSideBarBtn) {
    const currentNotes = noteItemsList
      .getList()
      .filter((item) => !item.isTrashed && !item.isArchived).length;
    currentNotes > 0 ? hide(noNotesDiv) : show(noNotesDiv);
    changeAppHeader("Keep");
  }
  if (activeSidebar == remindersSideBarBtn) {
    const currentNotes = noteItemsList
    .getList()
    .filter((item) => item.isReminder).length;
    currentNotes > 0 ? hide(noRemindersDiv) : show(noRemindersDiv);
    changeAppHeader("Reminders");
  }
  if (activeSidebar == archiveSideBarBtn) {
    const currentNotes = noteItemsList
    .getList()
    .filter((item) => item.isArchived).length;
    currentNotes > 0 ? hide(noArchivedDiv) : show(noArchivedDiv);
    changeAppHeader("Archive");
  }
  if (activeSidebar == trashSideBarBtn) {
    const currentNotes = noteItemsList
    .getList()
    .filter((item) => item.isTrashed).length;
    currentNotes > 0 ? hide(noTrashedDiv) : show(noTrashedDiv);
    show(trashHeader);
    changeAppHeader("Trash");
  }
}
function removeActiveFromSidebarItems() {
  document
    .querySelectorAll("[id^='sidebar-item-']")
    .forEach((el) => el.removeAttribute("active"));
}
const appIcon = document.querySelector(".header-icon");
const pageTitle = document.querySelector(".header-title");
function changeAppHeader(activeSidebar) {
  pageTitle.textContent = activeSidebar;
  if (activeSidebar === "Keep") {
    show(appIcon);
    show(pageTitle);
  } else {
    hide(appIcon);
  }
}

function createNewNote(noteInfo) {
  const newNote = new NoteItem(noteInfo);
  noteItemsList.addNoteToList(newNote);
}

// Exported note functions

export function addReminder(id) {
  noteItemsList.getNoteById(id).isReminder = true;
  updateNotesOnLocalStorage();
}
export function archiveNote(id) {
  noteItemsList.getNoteById(id).isArchived = true;
  updateNotesOnLocalStorage();
}
export function deleteNote(id) {
  noteItemsList.removeNoteFromList(id);
  updateNotesOnLocalStorage();
}
export function restoreNote(id) {
  noteItemsList.getNoteById(id).isTrashed = false;
  noteItemsList.getNoteById(id).noteTime.deletionDate = null;
  updateNotesOnLocalStorage();
}
export function trashNote(id) {
  noteItemsList.getNoteById(id).isTrashed = true;
  noteItemsList.getNoteById(id).noteTime.deletionDate =
    Date.now() + SEVEN_DAYS_IN_MILLISECONDS;
  updateNotesOnLocalStorage();
}
export function unarchiveNote(id) {
  noteItemsList.getNoteById(id).isArchived = false;
  updateNotesOnLocalStorage();
}
export function pinNote(id) {
  const noteToPin = noteItemsList.getNoteById(id);
  noteToPin.isPinned = noteToPin.isPinned ? false : true;
  updateNotesOnLocalStorage();
}
export function updateNote(noteInfo) {
  const updatedNote = {
    ...noteItemsList.getNoteById(noteInfo._id),
    ...noteInfo,
  };
  noteItemsList.removeNoteFromList(noteInfo._id);
  createNewNote(updatedNote);
  updateNotesOnLocalStorage();
}

// Helper functions
const renderNotes = () => {
  const sortedList = noteItemsList.getList().filter((item) => {
    if (item.checkTimeToDelete()) {
      noteItemsList.removeNoteFromList(item.getId());
    } else {
      return item;
    }
  });
  if (sortedList.length) {
    sortedList
      .sort((a, b) => b.getTime() - a.getTime())
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
    const createdNoteCards = sortedList.map((item) => buildNoteCard(item));
    createdNoteCards.forEach((note) => notesArea.append(note));
    showNotesFromSidebar();
  }
};

function toggleVisibility(domElement, force) {
  domElement.classList.toggle("hide", force);
}
const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};
function hide(domElement) {
  domElement.classList.add("hide");
}
function show(domElement) {
  domElement.classList.remove("hide");
}
