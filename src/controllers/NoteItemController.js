export default class NoteItemController {
  constructor(db) {
    this.dbManager = db;
    this.SEVEN_DAYS_IN_MILLISECONDS = 604800000;
  }

  editNote(id) {
    const noteCard = document.querySelector(`[data-note-id="${id}"]`);
    NoteItemController.#show(noteCard.querySelector('.note-card-done-button'));
    this.showNoteTitle(noteCard);
    if (this.dbManager.noteItemsList.getNoteById(id).isToDoList) {
      NoteItemController.#show(noteCard.querySelector('.to-do-item-placeholder'));
    } else {
      this.showNoteDescription(noteCard);
    }
  }

  updateNote(id) {
    const noteCard = document.querySelector(`[data-note-id="${id}"]`);
    const noteItem = {
      ...this.dbManager.noteItemsList.getNoteById(id),
      noteTitle: noteCard.querySelector('#title-textarea').value,
      isPinned: noteCard
        .querySelector('.pin-button')
        .classList.contains('note-pinned'),
      noteTime: { creationDate: Date.now() },
      color: noteCard.getAttribute('data-color'),
    };
    if (noteCard.querySelector('#description-textarea') != null) {
      noteItem.noteDescription = noteCard.querySelector('#description-textarea').value;
    }
    const toDoItems = noteCard.querySelectorAll('.to-do-item');
    if (toDoItems != null) {
      noteItem.toDoItems = Array.from(toDoItems).map((item, index) => ({
        id: index,
        label: item.querySelector('.to-do-item-label').textContent,
        isChecked:
          item.querySelector('.to-do-item-checkbox').getAttribute('checked')
          === 'true',
      }));
    }
    this.dbManager.noteItemsList.removeNoteFromList(id);
    this.dbManager.createNewNoteItem(noteItem);
    this.dbManager.updateNotesOnLocalStorage();
  }

  // Buttons methods

  changeNoteColor(id, color) {
    this.dbManager.noteItemsList.getNoteById(id).color = color;
    this.dbManager.updateNotesOnLocalStorage();
  }

  addReminder(id) {
    this.dbManager.noteItemsList.getNoteById(id).isReminder = true;
    this.dbManager.updateNotesOnLocalStorage();
  }

  archiveNote(id) {
    this.dbManager.noteItemsList.getNoteById(id).isArchived = true;
    this.dbManager.updateNotesOnLocalStorage();
  }

  deleteNote(id) {
    this.dbManager.noteItemsList.removeNoteFromList(id);
    this.dbManager.updateNotesOnLocalStorage();
  }

  deleteTrashedNotes() {
    this.dbManager.noteItemsList.getList().forEach((item) => {
      if (item.isTrashed) this.dbManager.noteItemsList.removeNoteFromList(item.id);
    });
    this.dbManager.updateNotesOnLocalStorage();
  }

  restoreNote(id) {
    this.dbManager.noteItemsList.getNoteById(id).isTrashed = false;
    this.dbManager.noteItemsList.getNoteById(id).noteTime.deletionDate = null;
    this.dbManager.updateNotesOnLocalStorage();
  }

  trashNote(id) {
    const noteToTrash = this.dbManager.noteItemsList.getNoteById(id);
    noteToTrash.isTrashed = true;
    noteToTrash.noteTime.deletionDate = Date.now() + this.SEVEN_DAYS_IN_MILLISECONDS;
    this.dbManager.updateNotesOnLocalStorage();
  }

  unarchiveNote(id) {
    this.dbManager.noteItemsList.getNoteById(id).isArchived = false;
    this.dbManager.updateNotesOnLocalStorage();
  }

  pinNote(id) {
    const noteToPin = this.dbManager.noteItemsList.getNoteById(id);
    noteToPin.isPinned = !noteToPin.isPinned;
    this.dbManager.updateNotesOnLocalStorage();
  }

  // Todo items
  toggleChecked(noteId, itemId) {
    const item = this.dbManager.noteItemsList
      .getNoteById(noteId)
      .getToDoItemById(itemId);
    item.isChecked = !item.isChecked;
    this.dbManager.updateNotesOnLocalStorage();
  }

  deleteToDoItem(noteId, itemId) {
    this.dbManager.noteItemsList
      .getNoteById(noteId)
      .removeToDoItemFromList(itemId);
    this.dbManager.updateNotesOnLocalStorage();
  }

  changeToDoItemLabel(id, itemId) {
    const itemPlaceholder = document.querySelector(`[data-note-id="${id}"] .to-do-item-placeholder`);
    NoteItemController.#show(itemPlaceholder);

    const toDoItem = document
      .querySelector(`[data-note-id="${id}"]`)
      .querySelector(`[data-item-id="${itemId}"]`);
    const toDoItemLabel = toDoItem.querySelector('.to-do-item-label');
    const toDoItemTextarea = toDoItem.querySelector('.to-do-item-textarea');
    NoteItemController.#show(toDoItemTextarea);
    toDoItemTextarea.focus();
    toDoItemTextarea.value = '';
    toDoItemTextarea.value = toDoItemLabel.textContent;
    NoteItemController.#hide(toDoItemLabel);

    toDoItemTextarea.addEventListener('keydown', (event) => {
      if (event.key === 'Shift' || event.key === 'Control' || event.key === 'Alt') return;
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        toDoItemLabel.textContent = '';

        toDoItemLabel.textContent = toDoItemTextarea.value;
      }
      if (event.key === 'Tab' || event.key === 'Enter') {
        toDoItemLabel.textContent = toDoItemTextarea.value;
        NoteItemController.#hide(toDoItemTextarea);

        NoteItemController.#show(toDoItemLabel);
        if (toDoItemLabel.textContent !== '') {
          toDoItemLabel.textContent = toDoItemTextarea.value;
          NoteItemController.#show(
            document.querySelector(`[data-note-id="${id}"] .note-card-done-button`),
          );
          itemPlaceholder.querySelector('.to-do-item-textarea').focus();
        } else {
          this.deleteToDoItem(id, itemId);
        }
      }
    });
  }

  createNewToDoItem(id, event) {
    const noteToUpdate = this.dbManager.noteItemsList.getNoteById(id);
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const newToDoItem = {
        label: event.key,
        isChecked: false,
      };
      noteToUpdate.addToDoItem(newToDoItem);
      this.dbManager.updateNotesOnLocalStorage();
      const newToDoItemEl = document.querySelector(
        `[data-note-id="${id}"] [data-item-id="${
          noteToUpdate.getToDoItemById(noteToUpdate.getToDoItems().length - 1)
            .id
        }"] > label`,
      );
      newToDoItemEl.click();
      event.preventDefault();
    } else {
      event.preventDefault();
    }
  }

  static toggleCompletedItemsList(id) {
    NoteItemController.#toggle(document.querySelector(`[data-note-id="${id}"] .completed-items-btn`), 'rotate-90-cw');
    NoteItemController.#toggle(document.querySelector(`[data-note-id="${id}"] .completed-items-list`), 'hide');
  }

  // Visibility Helper Methods
  static #toggle(domElement, className) {
    domElement.classList.toggle(className);
  }

  static #hide(domElement) {
    domElement.classList.add('hide');
  }

  static #show(domElement) {
    domElement.classList.remove('hide');
  }
}
