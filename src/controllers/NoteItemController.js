import { app } from "../index";
export class NoteItemController {
  constructor() {}

  editNote(id) {
    const noteCard = document.querySelector(`[data-note-id="${id}"]`);
    this.#show(noteCard.querySelector(".note-card-done-button"));
    this.showNoteTitle(noteCard);
    if (app.noteItemsList.getNoteById(id).isToDoList) {
      this.#show(noteCard.querySelector(".to-do-item-placeholder"));
    } else {
      this.showNoteDescription(noteCard);
    }
  }
  updateNote(id) {
    const noteCard = document.querySelector(`[data-note-id="${id}"]`);
    const noteItem = {
      ...app.noteItemsList.getNoteById(id),
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
    app.noteItemsList.removeNoteFromList(id);
    app.createNewNoteItem(noteItem);
    app.updateNotesOnLocalStorage();
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
    app.noteItemsList.getNoteById(id).color = color;
    app.updateNotesOnLocalStorage();
  }
  addReminder(id) {
    app.noteItemsList.getNoteById(id).isReminder = true;
    app.updateNotesOnLocalStorage();
  }
  archiveNote(id) {
    app.noteItemsList.getNoteById(id).isArchived = true;
    app.updateNotesOnLocalStorage();
  }
  deleteNote(id) {
    app.noteItemsList.removeNoteFromList(id);
    app.updateNotesOnLocalStorage();
  }
  deleteTrashedNotes() {
    app.noteItemsList.getList().forEach((item) => {
      if (item.isTrashed) app.noteItemsList.removeNoteFromList(item.id);
    });
    app.updateNotesOnLocalStorage();
  }
  restoreNote(id) {
    app.noteItemsList.getNoteById(id).isTrashed = false;
    app.noteItemsList.getNoteById(id).noteTime.deletionDate = null;
    app.updateNotesOnLocalStorage();
  }
  trashNote(id) {
    app.noteItemsList.getNoteById(id).isTrashed = true;
    app.noteItemsList.getNoteById(id).noteTime.deletionDate =
      Date.now() + app.SEVEN_DAYS_IN_MILLISECONDS;
    app.updateNotesOnLocalStorage();
  }
  unarchiveNote(id) {
    app.noteItemsList.getNoteById(id).isArchived = false;
    app.updateNotesOnLocalStorage();
  }
  pinNote(id) {
    const noteToPin = app.noteItemsList.getNoteById(id);
    noteToPin.isPinned = !noteToPin.isPinned;
    app.updateNotesOnLocalStorage();
  }
  // Todo items
  toggleChecked(noteId, itemId) {
    const item = app.noteItemsList.getNoteById(noteId).getToDoItemById(itemId);
    item.isChecked = !item.isChecked;
    app.updateNotesOnLocalStorage();
  }
  deleteToDoItem(noteId, itemId) {
    app.noteItemsList.getNoteById(noteId).removeToDoItemFromList(itemId);
    app.updateNotesOnLocalStorage();
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
   
    toDoItemTextarea.addEventListener("keydown", (event) => {
      if (
        
        event.key == "Shift" ||
        event.key == "Control" ||
        event.key == "Alt"
      )
        return;
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        toDoItemLabel.textContent = "";

        toDoItemLabel.textContent = toDoItemTextarea.value;
      }
      if (event.key == "Tab" || event.key == "Enter") {
        toDoItemLabel.textContent = toDoItemTextarea.value;
        this.#hide(toDoItemTextarea);

        this.#show(toDoItemLabel);
        if (toDoItemLabel.textContent != "") {
          toDoItemLabel.textContent = toDoItemTextarea.value;
          this.#show(document.querySelector(`[data-note-id="${id}"] .note-card-done-button`));
          itemPlaceholder.querySelector(".to-do-item-textarea").focus();
        } else {
          this.deleteToDoItem(id, itemId);
        }

      }
    });
  }
  createNewToDoItem(id) {
    const noteToUpdate = app.noteItemsList.getNoteById(id);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const newToDoItem = {
        label: event.key,
        isChecked: false,
      };
      noteToUpdate.addToDoItem(newToDoItem);
      app.updateNotesOnLocalStorage();
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
