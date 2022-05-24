class NoteItemController {
  constructor() {}

  editNote(id) {
    const note = document.querySelector(`[data-note-id="${id}"]`);
    this.#show(note.querySelector(".note-card-done-button"));
    this.showNoteTitle(note);
    if (noteItemsList.getNoteById(id).isToDoList) {
      this.#show(note.querySelector(".to-do-item-placeholder"));
    } else {
      this.showNoteDescription(note);
    }
  }
  updateNote(id) {
    const noteCard = document.querySelector(`[data-note-id="${id}"]`);
    const noteItem = {
      ...noteItemsList.getNoteById(id),
      noteTitle: noteCard.querySelector("#title-textarea").value,
      isPinned: noteCard
        .querySelector(".pin-button")
        .classList.contains("note-pinned"),
      noteTime: { creationDate: Date.now() },
      color: noteCard.getAttribute("data-color"),
    };
    if (noteCard.querySelector("#description-textarea") != null) {
      noteItem.noteDescription = noteCard.querySelector(
        "#description-textarea"
      ).value;
    }
    const toDoItems = noteCard.querySelectorAll(".to-do-item");
    if (toDoItems != null) {
      noteItem.toDoItems = Array.from(toDoItems).map((item, index) => {
        return {
          id: index,
          label: item.querySelector(".to-do-item-label").textContent,
          isChecked:
            item
              .querySelector(".to-do-item-checkbox")
              .getAttribute("checked") == "true"
              ? true
              : false,
        };
      });
    }
    noteItemsList.removeNoteFromList(id);
    createNewNoteItem(noteItem);
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
  deleteTrashedNotes() {
    noteItemsList.getList().forEach((item) => {
      if (item.isTrashed) noteItemsList.removeNoteFromList(item.id);
    });
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
  showNoteTitle(note) {
    // Show and edit Title
    this.#show(note.querySelector(".note-card-done-button"));
    const titleLabel = note.querySelector(".note-card-title > label");
    const titleTextarea = note.querySelector("#title-textarea");
    if (titleLabel.textContent == "") {
      this.#show(titleTextarea);
      this.#hide(titleLabel);
      titleTextarea.focus();
    } else {
      this.#hide(titleLabel);
      titleTextarea.value = "";
      titleTextarea.value = titleLabel.textContent;
      this.#show(titleTextarea);
      titleTextarea.focus();
    }
    titleTextarea.addEventListener("input", (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        titleLabel.textContent = titleTextarea.value;
      }
    });
    titleTextarea.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.#hide(titleTextarea);
        this.#show(titleLabel);
        if (titleLabel.textContent != "") {
          titleLabel.textContent = titleTextarea.value;
        }
        event.preventDefault();
      }
    });
  }
  showNoteDescription(note) {
    // Show and edit Description
    this.#show(note.querySelector(".note-card-done-button"));
    const descriptionLabel = note.querySelector(".note-card-desc > label");
    const descriptionTextarea = note.querySelector("#description-textarea");
    if (descriptionLabel.textContent == "") {
      this.#show(descriptionTextarea);
      this.#hide(descriptionLabel);
      descriptionTextarea.focus();
    } else {
      this.#hide(descriptionLabel);
      descriptionTextarea.value = "";
      descriptionTextarea.value = descriptionLabel.textContent;
      this.#show(descriptionTextarea);
      descriptionTextarea.focus();
    }
    // Handle input on textarea
    descriptionTextarea.addEventListener("input", (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        descriptionLabel.textContent = descriptionTextarea.value;
      }
    });
    descriptionTextarea.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.#hide(descriptionTextarea);
        this.#show(descriptionLabel);
        if (descriptionLabel.textContent != "") {
          descriptionLabel.textContent = descriptionTextarea.value;
        }
        event.preventDefault();
      }
    });
  }
  changeToDoItemLabel(id, itemId) {
    const itemPlaceholder = document.querySelector(
      `[data-note-id="${id}"] .to-do-item-placeholder`
    );
    this.#show(itemPlaceholder);

    const toDoItem = document
      .querySelector(`[data-note-id="${id}"]`)
      .querySelector(`[data-item-id="${itemId}"]`);
    const toDoItemLabel = toDoItem.querySelector(".to-do-item-label");
    const toDoItemTextarea = toDoItem.querySelector(".to-do-item-textarea");
    this.#show(toDoItemTextarea);
    toDoItemTextarea.focus();
    toDoItemTextarea.value = "";
    toDoItemTextarea.value = toDoItemLabel.textContent;
    this.#hide(toDoItemLabel);
    toDoItemTextarea.addEventListener("blur", () => {
      toDoItemLabel.textContent = toDoItemTextarea.value;
    });
    toDoItemTextarea.addEventListener("input", (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        toDoItemLabel.textContent = toDoItemTextarea.value;
      }
    });
    toDoItemTextarea.addEventListener("keydown", (event) => {
      if (event.key == "Enter") {
        this.#hide(toDoItemTextarea);
        this.#show(toDoItemLabel);
        if (toDoItemLabel.textContent != "") {
          toDoItemLabel.textContent = toDoItemTextarea.value;
          this.updateNote(id);
        } else {
          this.deleteToDoItem(id, itemId);
        }
        this.#hide(itemPlaceholder);
        event.preventDefault();
      }
    });
  }
  createNewToDoItem(id) {
    const noteToUpdate = noteItemsList.getNoteById(id);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const newToDoItem = {
        label: event.key,
        isChecked: false,
      };
      noteToUpdate.addToDoItem(newToDoItem);
      updateNotesOnLocalStorage();
      const newToDoItemEl = document.querySelector(
        `[data-note-id="${id}"] [data-item-id="${
          noteToUpdate.getToDoItemById(noteToUpdate.getToDoItems().length - 1)
            .id
        }"] > label`
      );
      newToDoItemEl.click();
      event.preventDefault();
    } else {
      event.preventDefault();
    }
  }
  toggleCompletedItemsList(id) {
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
