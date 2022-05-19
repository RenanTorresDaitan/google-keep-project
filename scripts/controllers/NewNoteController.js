class NewNoteController {
  constructor() {
    this.newNoteDialog = document.querySelector("#new-note-dialog");
    this.newNoteTitle = document.querySelector(".newnote-title-textarea");
    this.newNoteToDoItemsArea = document.querySelector(
      ".newnote-to-do-items-area"
    );
    this.completedToDoItemsArea = document.querySelector(
      ".completed-items-area"
    );
    this.completedTodoItemsList = document.querySelector(
      ".completed-items-list"
    );
    this.newNoteDesc = document.querySelector(".newnote-desc-textarea");
    this.pinBtn = document.querySelector(".newnote-pin-button");
    this.cardItemPlaceholder = document.querySelector(
      ".newnote-item-placeholder"
    );
    this.itemPlaceholderTextArea = document.querySelector(
      ".newnote-item-placeholder-textarea"
    );
  }

  startEditingNewNote(noteType) {
    this.newNoteDialog.setAttribute("editing", "true");
    this._deleteExistingToDoItems();
    this.#show(document.querySelector(".editing-note"));
    this.pinBtn.classList.remove("note-pinned");
    if (noteType == "list") {
      this.#hide(this.newNoteDesc);
      this.#show(this.cardItemPlaceholder);
      this.#hide(this.completedToDoItemsArea);
      this.itemPlaceholderTextArea.focus();
    } else {
      this.#hide(this.cardItemPlaceholder);
      this.newNoteDesc.focus();
    }
  }
  createNewNote() {
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
    // Update Note fields
    newNoteToCreate.noteTitle = this.newNoteTitle.value;
    newNoteToCreate.noteDescription = this.newNoteDesc.value;
    newNoteToCreate.isPinned = this.pinBtn.classList.contains("note-pinned");
    // To do items handling
    newNoteToCreate.toDoItems = Array.from(
      this.newNoteToDoItemsArea.querySelectorAll(".newnote-to-do-item")
    ).map((item, index) => {
      if (item != this.cardItemPlaceholder) {
        const checkbox = item.querySelector(".newnote-to-do-item-checkbox");
        const textArea = item.querySelector(
          ".newnote-item-placeholder-textarea"
        );
        if (textArea.value != "") {
          return {
            id: index,
            label: textArea.value,
            isChecked:
              checkbox.getAttribute("checked") == "true" ? true : false,
          };
        }
      }
    });
    newNoteToCreate.isToDoList =
      newNoteToCreate.toDoItems.length > 0 ? true : false;
    createAndSaveNewItem(newNoteToCreate);
    this._endEditingNewNote();
  }

  createNewToDoItem(event) {
    event.preventDefault();
    const newToDoItem = document.createElement("div");
    newToDoItem.classList.add("newnote-to-do-item");
    newToDoItem.innerHTML = `
      <div class="newnote-to-do-item-checkbox" checked="false" onclick="newNoteController.toggleCheckbox(this)"></div>
      <textarea class="newnote-item-placeholder-textarea" placeholder="List item" onkeydown="newNoteController.editText(event)"></textarea>
      <div class="newnote-to-do-item-delete" onclick="newNoteController.deleteToDoItem(this)"></div>
    `;
    this.newNoteToDoItemsArea.insertBefore(
      newToDoItem,
      this.cardItemPlaceholder
    );
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const newNoteTextArea = newToDoItem.querySelector(
        ".newnote-item-placeholder-textarea"
      );
      newNoteTextArea.value = event.key;
      newNoteTextArea.focus();
    }
  }
  editText(event) {
    if (event.key === "Enter") {
      this.itemPlaceholderTextArea.focus();
      event.preventDefault();
    }
  }
  deleteToDoItem(deleteBtn) {
    this.newNoteToDoItemsArea.removeChild(deleteBtn.parentNode);
  }
  toggleCompletedItems() {
    document
      .querySelector(".completed-items-btn")
      .classList.toggle("rotate-90-cw");
    this.completedTodoItemsList.classList.toggle("hide");
  }
  toggleCheckbox(checkbox) {
    checkbox.setAttribute(
      "checked",
      checkbox.getAttribute("checked") == "true" ? "false" : "true"
    );
    this._organizeToDoItems();
  }
  _organizeToDoItems() {
    const newNoteToDoItems = Array.from(
      this.newNoteToDoItemsArea.querySelectorAll(".newnote-to-do-item")
    );
    const checkboxChecked = (item) => {
      return (
        item
          .querySelector(".newnote-to-do-item-checkbox")
          .getAttribute("checked") == "true"
      );
    };
    newNoteToDoItems.forEach((item) => {
      if (checkboxChecked(item)) {
        this.completedTodoItemsList.append(item);
      } else {
        this.newNoteToDoItemsArea.insertBefore(item, this.cardItemPlaceholder);
      }
    });
    const completedItems = this.completedTodoItemsList.children.length;
    completedItems > 0
      ? this.#show(this.completedToDoItemsArea)
      : this.#hide(this.completedToDoItemsArea);
    document.querySelector(".completed-items-label").textContent =
      completedItems > 1
        ? `${completedItems} Completed items`
        : `1 Completed item`;
    // });
  }
  openNewNoteMenu() {
    this.#show(document.querySelector(".newnote-menu"));
  }
  closeNewNoteMenu() {
    this.#hide(document.querySelector(".newnote-menu"));
  }
  pinNewNote() {
    this.#toggle(this.pinBtn, "note-pinned");
  }
  _deleteExistingToDoItems() {
    Array.from(this.newNoteToDoItemsArea.children).forEach((el) => {
      if (el !== this.cardItemPlaceholder && el !== this.completedToDoItemsArea)
        this.newNoteToDoItemsArea.removeChild(el);
    });
    Array.from(this.completedTodoItemsList.children).forEach((el) => {
      this.completedTodoItemsList.removeChild(el);
    });
  }
  _endEditingNewNote() {
    this.newNoteTitle.value = "";
    this.newNoteDesc.value = "";
    this.newNoteDialog.setAttribute("editing", "false");
    this.#hide(this.newNoteDialog.querySelector(".editing-note"));
    this.closeNewNoteMenu();
    this.#show(this.newNoteDesc);
  }
  // Visibility Helper Methods
  #toggle(domElement, className) {
    domElement.classList.toggle(className);
  }
  #hide(domElement) {
    domElement.classList.add("hide");
  }
  #show(domElement) {
    domElement.classList.remove("hide");
  }
}

// Creating new to-do items

// Event Listener for elements inside new note
// editingNote.addEventListener("click", (event) => {
//
//   const emptyFields =
//     newNoteDesc.value == "" &&
//     newNoteTitle.value == "" &&
//     newNoteToDoItems.length == 0;
//   hide(cardMenu);
//   if (
//     emptyFields &&
//     (event.target == deleteMenuBtn ||
//       event.target == archiveMenuBtn ||
//       event.target == doneBtn)
//   ) {
//     endEditingNewNote();
//     return;
//   }
//
//     newNoteToCreate.toDoItems = toDoItems;

//   }
// });
// // Event Listener for keydown events
