class NoteItemController {
  constructor() {}

  editNote(id) {
    const note = document.querySelector(`[data-note-id="${id}"]`);
    this.#show(note.querySelector(".note-card-done-button"));
    this.handleTitleAndDescription(note);
  }
  updateNote(id) {
    const note = document.querySelector(`[data-note-id="${id}"]`);
    const updatedNote = {
      ...noteItemsList.getNoteById(id),
      noteTitle: note.querySelector("#title-textarea").value,
      noteDescription: note.querySelector("#description-textarea").value,
      isPinned: note
        .querySelector(".pin-button")
        .classList.contains("note-pinned"),
      noteTime: { creationDate: Date.now() },
      color: note.getAttribute("data-color"),
    };
    noteItemsList.removeNoteFromList(id);
    createNewNote(updatedNote);
    updateNotesOnLocalStorage();
  }
  // Buttons methods
  openMenu(id) {
    this.#show(document.querySelector(`[data-note-id="${id}"] .menu-panel`));
  }
  openColorMenu(id) {
    this.#show(
      document.querySelector(`[data-note-id="${id}"] .color-ball-container`)
    );
  }
  changeNoteColor(id, color) {
    noteItemsList.getNoteById(id).color = color;
    updateNotesOnLocalStorage();
  }
  addReminder(id) {
    noteItemsList.getNoteById(id).isReminder = true;
    updateNotesOnLocalStorage();
  }
  archiveNote(id) {
    noteItemsList.getNoteById(id).isArchived = true;
    updateNotesOnLocalStorage();
  }
  deleteNote(id) {
    noteItemsList.removeNoteFromList(id);
    updateNotesOnLocalStorage();
  }
  restoreNote(id) {
    noteItemsList.getNoteById(id).isTrashed = false;
    noteItemsList.getNoteById(id).noteTime.deletionDate = null;
    updateNotesOnLocalStorage();
  }
  trashNote(id) {
    noteItemsList.getNoteById(id).isTrashed = true;
    noteItemsList.getNoteById(id).noteTime.deletionDate =
      Date.now() + SEVEN_DAYS_IN_MILLISECONDS;
    updateNotesOnLocalStorage();
  }
  unarchiveNote(id) {
    noteItemsList.getNoteById(id).isArchived = false;
    updateNotesOnLocalStorage();
  }
  pinNote(id) {
    const noteToPin = noteItemsList.getNoteById(id);
    noteToPin.isPinned = !noteToPin.isPinned;
    updateNotesOnLocalStorage();
  }
  // Todo items
  toggleChecked(noteId, itemId) {
    const item = noteItemsList.getNoteById(noteId).getToDoItemById(itemId);
    item.isChecked = !item.isChecked;
    updateNotesOnLocalStorage();
  }
  deleteToDoItem(noteId, itemId) {
    noteItemsList.getNoteById(noteId).removeToDoItemFromList(itemId);
    updateNotesOnLocalStorage();
  }
  // Edit handling methods
  handleTitleAndDescription(note) {
    const noteTitle = note.querySelector(".note-card-title");
    const noteDescription = note.querySelector(".note-card-desc");
    const titleLabel = note.querySelector(".note-card-title > label");
    const titleTextarea = note.querySelector("#title-textarea");
    const descriptionLabel = note.querySelector(".note-card-desc > label");
    const descriptionTextarea = note.querySelector("#description-textarea");
    note.addEventListener("click", (event) => {
      // Show editable fields when you click in the note
      if (event.target == noteTitle || event.target == noteDescription) {
        if (titleLabel.textContent == "") {
          this.#show(titleTextarea);
          this.#hide(titleLabel);
          titleTextarea.focus();
        }
        if (descriptionLabel.textContent == "") {
          this.#show(descriptionTextarea);
          this.#hide(descriptionLabel);
          descriptionTextarea.focus();
        }
      }
      // Show and edit Title
      if (event.target == titleLabel || event.target == noteTitle) {
        this.#hide(titleLabel);
        titleTextarea.value = titleLabel.textContent;
        this.#show(titleTextarea);
        titleTextarea.focus();
      }
      // Show and edit Description
      if (event.target == descriptionLabel || event.target == noteDescription) {
        this.#hide(descriptionLabel);
        descriptionTextarea.value = descriptionLabel.textContent;
        this.#show(descriptionTextarea);
        descriptionTextarea.focus();
      }
    });
    // Handle input on textarea
    note.addEventListener("keydown", (event) => {
      if (event.target == titleTextarea) {
        if (event.key == "Enter") {
          this.#hide(titleTextarea);
          this.#show(titleLabel);
        }
        titleLabel.textContent = titleTextarea.value;
      }
      if (event.target == descriptionTextarea) {
        if (event.key == "Enter") {
          this.#hide(descriptionTextarea);
          this.#show(descriptionLabel);
        }
        descriptionLabel.textContent = descriptionTextarea.value;
      }
    });
  }
  changeToDoItemLabel(id, itemId) {
    const toDoItem = document
      .querySelector(`[data-note-id="${id}"]`)
      .querySelector(`[data-item-id="${itemId}"]`);
    const toDoItemLabel = toDoItem.querySelector(".to-do-item-label");
    const toDoItemTextarea = toDoItem.querySelector(".to-do-item-textarea");
    this.#show(toDoItemTextarea);
    this.#hide(toDoItemLabel);
    toDoItemTextarea.focus();
    toDoItemTextarea.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.#hide(toDoItemTextarea);
        this.#show(toDoItemLabel);
        if (toDoItemLabel.textContent != "") {
          noteItemsList.getNoteById(id).getToDoItemById(itemId).label =
            toDoItemLabel.textContent;
        } else {
          this.deleteToDoItem(id, itemId);
        }
      }
      toDoItemLabel.textContent = toDoItemTextarea.value;
    });
  }
  createNewToDoItem(id) {
    // TODO -- Add new items to the right place
    const newToDoItem = {
      id: 10,
      label: "teste",
      checked: false,
    };
    const toDoItemList = document
    .querySelector(`[data-note-id="${id}"]`)
    .querySelector(".completed-items-list");
    toDoItemList.innerHTML += ToDoItemContainer.createToDoItem(id,newToDoItem);
    event.preventDefault();
    // itemPlaceholderTextArea.addEventListener("keydown", (event) => {
    //   const newToDoItem = createToDoItem();
    //   event.preventDefault();
    //   newToDoItem.querySelector(".newnote-item-placeholder-textarea").focus();
    //   if (event.keyCode >= 65 && event.keyCode <= 90) {
    //     newToDoItem.querySelector(".newnote-item-placeholder-textarea").value =
    //       event.key;
    //   }
    // });
  }
  toggleCompletedItems(id) {
    this.#toggle(
      document.querySelector(`[data-note-id="${id}"] .completed-items-btn`),
      "rotate-90-cw"
    );
    this.#toggle(
      document.querySelector(`[data-note-id="${id}"] .completed-items-list`),
      "hide"
    );
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
