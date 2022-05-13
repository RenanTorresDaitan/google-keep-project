// import { createAndSaveNewItem, noteItemsList } from "./main-script.js";

// New Note to be Created
const newNoteToCreate = {
  noteTitle: "",
  noteDescription: "",
  noteTime: { creationDate: Date.now(), deletionDate: null },
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
const completedTodoItemsList = document.querySelector(".completed-items-list");
const completedItemsLabel = document.querySelector(".completed-items-label");
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
  newToDoItem.addEventListener("click", (event) => {
    if (event.target == checkbox) {
      if (checkbox.getAttribute("checked") == "true") {
        checkbox.setAttribute("checked", "false");
        newNoteToDoItemsArea.insertBefore(newToDoItem, cardItemPlaceholder);
      } else {
        checkbox.setAttribute("checked", "true");
        completedTodoItemsList.append(newToDoItem);
      }
    }
    if (event.target == deleteItem) {
      newToDoItem.remove();
    }
    const completedItems = completedTodoItemsList.children.length;
    completedItems > 0
      ? show(completedToDoItemsArea)
      : hide(completedToDoItemsArea);
    completedItemsLabel.textContent =
      completedItems > 1
        ? `${completedItems} Completed items`
        : `1 Completed item`;
  });
  textArea.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      itemPlaceholderTextArea.focus();
      event.preventDefault();
    }
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
  const completedItemsBtn = document.querySelector(".completed-items-btn");
  if (
    event.target == completedItemsBtn ||
    event.target == completedItemsLabel
  ) {
    completedItemsBtn.classList.toggle("rotate-90-cw");
    completedTodoItemsList.classList.toggle("hide");
  }
  if (event.target == menuBtn) show(cardMenu);
  if (event.target == doneBtn) {
    // Update Note fields
    newNoteToCreate.noteTitle = newNoteTitle.value;
    newNoteToCreate.noteDescription = newNoteDesc.value;
    newNoteToCreate.isPinned = pinBtn.classList.contains("note-pinned");
    // To do items handling
    const toDoItems = [];
    newNoteToDoItems.forEach((item, index) => {
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
          toDoItemToSave.id = index;
          toDoItems.push(toDoItemToSave);
        }
      }
    });
    newNoteToCreate.toDoItems = toDoItems;

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

/*export*/ function startEditingNewNote(noteType) {
  newNotesArea.setAttribute("editing", "true");
  deleteExistingToDoItems();
  show(editingNote);
  pinBtn.classList.remove("note-pinned");
  if (noteType == "list") {
    newNoteToCreate.isToDoList = true;
    hide(newNoteDesc);
    show(cardItemPlaceholder);
    hide(completedToDoItemsArea);
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
  Array.from(completedTodoItemsList.children).forEach((el) => {
    completedTodoItemsList.removeChild(el);
  });
}
