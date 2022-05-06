import { createAndSaveNewItem, notesList } from "./main-script.js";

// New Note to be Created
const newNoteToCreate = {
  noteTitle: "",
  noteDescription: "",
  noteTime: Date.now(),
  isPinned: false,
  isToDoList: false,
  isReminder: false,
  isArchived: false,
  isTrashed: false,
  toDoItems: [],
};

const newNotesArea = document.querySelector(".newnote");

const editingNote = document.querySelector(".editing-note");
const newNoteTitle = document.querySelector(".newnote-title-textarea");
const newNoteToDoItemsArea = document.querySelector(
  ".newnote-to-do-items-area"
);
const completedToDoItemsArea = document.querySelector(".completed-items-area");
const newNoteDesc = document.querySelector(".newnote-desc-textarea");

const doneBtn = document.querySelector(".newnote-card-done-button");
const pinBtn = document.querySelector(".newnote-pin-button");
const menuBtn = document.querySelector(".newnote-menu-button");

const cardMenu = document.querySelector(".newnote-menu");
const deleteMenuBtn = document.querySelector("#delete-menu-button");
const archiveMenuBtn = document.querySelector("#archive-menu-button");

const cardItemPlaceholder = document.querySelector(".newnote-item-placeholder");
const itemPlaceholderTextArea = document.querySelector(
  ".newnote-item-placeholder-textarea"
);

// Creating new to-do items
function createToDoItem() {
  const newToDoItem = document.createElement("div");
  const checkbox = document.createElement("div");
  const textArea = document.createElement("textarea");
  const deleteItem = document.createElement("div");
  newToDoItem.classList.add("newnote-to-do-item");
  checkbox.classList.add("newnote-to-do-item-checkbox");
  checkbox.setAttribute("checked", "false");
  textArea.classList.add("newnote-item-placeholder-textarea");
  textArea.setAttribute("placeholder", "List item");
  deleteItem.classList.add("newnote-to-do-item-delete");

  newToDoItem.append(checkbox, textArea, deleteItem);
  newNoteToDoItemsArea.insertBefore(newToDoItem, cardItemPlaceholder);
  // Event Listeners
  checkbox.addEventListener("click", () => {
    if (checkbox.getAttribute("checked") == "true") {
      checkbox.setAttribute("checked", "false");
    } else {
      checkbox.setAttribute("checked", "true");
    }
    updateCheckedToDoItems();
  });
  textArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      itemPlaceholderTextArea.focus();
      event.preventDefault();
    }
  });
  deleteItem.addEventListener("click", () => {
    newToDoItem.remove();
  });
  return newToDoItem;
}

// Event Listener for elements inside new note
editingNote.addEventListener("click", (event) => {
  const newNoteToDoItems = newNoteToDoItemsArea.querySelectorAll(
    ".newnote-to-do-item"
  );
  const emptyFields =
    newNoteDesc.value == "" &&
    newNoteTitle.value == "" &&
    newNoteToDoItems.length == 0;
  hide(cardMenu);
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
  if (event.target == menuBtn) show(cardMenu);
  if (event.target == doneBtn) {
    // Update Note fields
    newNoteToCreate.noteTitle = newNoteTitle.value;
    newNoteToCreate.noteDescription = newNoteDesc.value;
    newNoteToCreate.toDoItems = toDoItems;
    newNoteToCreate.isPinned = pinBtn.classList.contains("note-pinned");
    // To do items handling
    const toDoItems = [];
    newNoteToDoItems.forEach((item) => {
      if (item != cardItemPlaceholder) {
        const checkbox = item.querySelector(".newnote-to-do-item-checkbox");
        const textArea = item.querySelector(
          ".newnote-item-placeholder-textarea"
        );
        if (textArea.value != "") {
          const toDoItemToSave = {
            label: textArea.value,
            isChecked:
              checkbox.getAttribute("checked") == "true" ? true : false,
          };
          toDoItems.push(toDoItemToSave);
        }
      }
    });

    createAndSaveNewItem(newNoteToCreate);
    endEditingNewNote();
  }
});
// Event Listener for keydown events
itemPlaceholderTextArea.addEventListener("keydown", (event) => {
  const newToDoItem = createToDoItem();
  event.preventDefault();
  newToDoItem.querySelector(".newnote-item-placeholder-textarea").focus();
  if (event.keyCode >= 65 && event.keyCode <= 90) {
    newToDoItem.querySelector(".newnote-item-placeholder-textarea").value =
      event.key;
  }
});

export function startEditingNewNote(noteType) {
  newNotesArea.setAttribute("editing", "true");
  deleteExistingToDoItems();
  show(editingNote);
  pinBtn.classList.remove("note-pinned");
  if (noteType == "list") {
    newNoteToCreate.isToDoList = true;
    hide(newNoteDesc);
    show(cardItemPlaceholder);
    itemPlaceholderTextArea.focus();
  } else {
    hide(cardItemPlaceholder);
    newNoteDesc.focus();
  }
}

function endEditingNewNote() {
  newNoteTitle.value = "";
  newNoteDesc.value = "";
  newNotesArea.setAttribute("editing", "false");
  hide(editingNote);
  hide(cardMenu);
  show(newNoteDesc);
}

// Helper Functions
function hide(domElement) {
  domElement.classList.add("hide");
}
function show(domElement) {
  domElement.classList.remove("hide");
}
function deleteExistingToDoItems() {
  Array.from(newNoteToDoItemsArea.children).forEach((el) => {
    if (el !== cardItemPlaceholder && el !== completedToDoItemsArea)
      newNoteToDoItemsArea.removeChild(el);
  });
}
function updateCheckedToDoItems() {
  Array.from(newNoteToDoItemsArea.children).forEach((item) => {
    if (
      item != cardItemPlaceholder &&
      item
        .querySelector(".newnote-to-do-item-checkbox")
        .getAttribute("checked") == "true"
    )
      console.log();
  });
}
