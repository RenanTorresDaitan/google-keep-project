import { createAndSaveNewItem, notesList } from "./main-script.js";

const newNotesArea = document.querySelector(".take-new-notes");

const editingNote = document.querySelector(".editing-note");
const newNoteTitle = document.querySelector(".card-title-textarea");
const newNoteDesc = document.querySelector(".card-desc-textarea");

const doneBtn = document.querySelector(".card-done-button");
const pinBtn = document.querySelector(".card-pin-button");
const menuBtn = document.querySelector(".card-menu-button");

const cardMenu = document.querySelector(".card-menu");
const deleteMenuBtn = document.querySelector("#delete-menu-button");
const archiveMenuBtn = document.querySelector("#archive-menu-button");

editingNote.addEventListener("click", (event) => {
  const emptyFields = newNoteDesc.value == "" && newNoteTitle.value == "";
  cardMenu.classList.add("hide");
  if (
    emptyFields &&
    (event.target == deleteMenuBtn ||
      event.target == archiveMenuBtn ||
      event.target == doneBtn)
  ) {
    endEditingNewNote();
    return;
  }
  if (event.target == pinBtn) pinBtn.classList.toggle("note-pinned");
  if (event.target == menuBtn) cardMenu.classList.remove("hide");
  if (event.target == doneBtn) {
    const newItem = {
        _id: calculateNextId(),
        noteTitle: newNoteTitle.value,
        noteDescription: newNoteDesc.value,
        noteTime: Date.now(),
        isPinned: pinBtn.classList.contains("note-pinned"),
      };
      createAndSaveNewItem(newItem);
      endEditingNewNote();    
  }

});

export function startEditingNewNote(noteType) {
  newNotesArea.setAttribute("editing", "true");
  editingNote.classList.remove("hide");
  pinBtn.classList.remove("note-pinned");
  document.querySelector(".card-desc-textarea").focus();
}

function endEditingNewNote() {
  newNoteTitle.value = "";
  newNoteDesc.value = "";
  newNotesArea.setAttribute("editing", "false");
  editingNote.classList.add("hide");
  cardMenu.classList.add("hide");
}



// Helper Functions
function calculateNextId() {
  const list = notesList.getList().sort((a, b) => a.getId() - b.getId());
  let nextId = 1;
  if (list.length > 0) {
    nextId = list[list.length - 1].getId() + 1;
  }
  return nextId;
}
