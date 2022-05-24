class NewNoteController {
  constructor() {}

  startEditingNewNote(noteType) {
    const noteItemPlaceholder = document.querySelector(
      ".newnote-item-placeholder"
    );
    const noteDescTextarea = document.querySelector(".newnote-desc-textarea");
    const newNoteDialog = document.querySelector("#new-note-dialog");

    newNoteDialog.setAttribute("editing", "true");
    this._deleteExistingToDoItems();
    this.#show(document.querySelector(".editing-note"));
    document
      .querySelector(".newnote-pin-button")
      .classList.remove("note-pinned");
    if (noteType == "list") {
      this.#hide(noteDescTextarea);
      this.#show(noteItemPlaceholder);
      this.#hide(document.querySelector(".completed-items-area"));
      document.querySelector(".newnote-item-placeholder-textarea").focus();
    } else {
      this.#hide(noteItemPlaceholder);
      noteDescTextarea.focus();
    }
  }
  _endEditingNewNote() {
    const noteTitleTextarea = document.querySelector(".newnote-title-textarea");
    const noteDescTextarea = document.querySelector(".newnote-desc-textarea");
    const newNoteDialog = document.querySelector("#new-note-dialog");

    noteTitleTextarea.value = "";
    noteDescTextarea.value = "";
    newNoteDialog.setAttribute("editing", "false");
    this.#hide(document.querySelector(".editing-note"));
    this.closeNewNoteMenu();
    this.#show(noteDescTextarea);
  }
  createNewNote(action) {
    const noteTitleTextarea = document.querySelector(".newnote-title-textarea").value;
    const noteDescTextarea = document.querySelector(".newnote-desc-textarea").value;
    const newNotePinned = document.querySelector(".newnote-pin-button").classList.contains("note-pinned");
    const newNoteToDoItems = document.querySelector(".newnote-to-do-items-area").querySelectorAll(".newnote-to-do-item");
    const emptyFields = noteTitleTextarea == "" && noteDescTextarea == "";

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
    newNoteToCreate.noteTitle = noteTitleTextarea;
    newNoteToCreate.noteDescription = noteDescTextarea;
    newNoteToCreate.isPinned = newNotePinned;
    if (action === "Archive") newNoteToCreate.isArchived = true;

    // To do items handling
    newNoteToCreate.toDoItems = Array.from(newNoteToDoItems).map(
      (item, index) => {
        if (item != document.querySelector(".newnote-item-placeholder")) {
          const checkbox = item.querySelector(".newnote-to-do-item-checkbox");
          const textArea = item.querySelector(".newnote-item-placeholder-textarea");
          if (textArea.value !== "") {
            return {
              id: index,
              label: textArea.value,
              isChecked:
                checkbox.getAttribute("checked") == "true" ? true : false,
            };
          }
        }
      }
    );
    newNoteToCreate.isToDoList =
      newNoteToCreate.toDoItems.length > 0 ? true : false;
    if (emptyFields && !newNoteToCreate.isToDoList) {
      this._endEditingNewNote();
    } else {
      createNewNoteItem(newNoteToCreate);
    }
  }
  createNewToDoItem(event) {
    if (event.key == 'Tab') return;
    event.preventDefault();
    const newToDoItem = document.createElement("div");
    newToDoItem.classList.add("newnote-to-do-item");
    newToDoItem.innerHTML = `
      <div class="newnote-to-do-item-checkbox" checked="false" onclick="newNoteController.toggleCheckbox(this)"></div>
      <textarea class="newnote-item-placeholder-textarea" placeholder="List item" onkeydown="newNoteController.editText(event)"></textarea>
      <div class="newnote-to-do-item-delete" onclick="newNoteController.deleteToDoItem(this)"></div>
    `;
    document
      .querySelector(".newnote-to-do-items-area")
      .insertBefore(
        newToDoItem,
        document.querySelector(".newnote-item-placeholder")
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
    if (event.key == 'Enter') {
      document.querySelector("#new-item-placeholder").focus();
      event.preventDefault();
    }
  }
  deleteToDoItem(deleteBtn) {
    document
      .querySelector(".newnote-to-do-items-area")
      .removeChild(deleteBtn.parentNode);
  }
  toggleCompletedItems() {
    document
      .querySelector(".completed-items-btn")
      .classList.toggle("rotate-90-cw");
    document.querySelector(".completed-items-list").classList.toggle("hide");
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
      document
        .querySelector(".newnote-to-do-items-area")
        .querySelectorAll(".newnote-to-do-item")
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
        document.querySelector(".completed-items-list").append(item);
      } else {
        document
          .querySelector(".newnote-to-do-items-area")
          .insertBefore(
            item,
            document.querySelector(".newnote-item-placeholder")
          );
      }
    });
    const completedItems = document.querySelector(".completed-items-list")
      .children.length;
    completedItems > 0
      ? this.#show(document.querySelector(".completed-items-area"))
      : this.#hide(document.querySelector(".completed-items-area"));
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
    this.#toggle(document.querySelector(".newnote-pin-button"), "note-pinned");
  }
  _deleteExistingToDoItems() {
    Array.from(
      document.querySelector(".newnote-to-do-items-area").children
    ).forEach((el) => {
      if (
        el !== document.querySelector(".newnote-item-placeholder") &&
        el !== document.querySelector(".completed-items-area")
      )
        document.querySelector(".newnote-to-do-items-area").removeChild(el);
    });
    Array.from(
      document.querySelector(".completed-items-list").children
    ).forEach((el) => {
      document.querySelector(".completed-items-list").removeChild(el);
    });
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
