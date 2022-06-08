export default class NewNoteController {
  constructor(db) {
    this.dbManager = db;
  }

  createNewNote(action) {
    const noteTitleTextarea = document.querySelector('.newnote-title-textarea').value;
    const noteDescTextarea = document.querySelector('.newnote-desc-textarea').value;
    const newNotePinned = document
      .querySelector('.newnote-pin-button')
      .classList.contains('note-pinned');
    const newNoteToDoItems = document
      .querySelector('.newnote-to-do-items-area')
      .querySelectorAll('.newnote-to-do-item');
    const emptyFields = noteTitleTextarea === '' && noteDescTextarea === '';

    const newNoteToCreate = {
      noteTitle: '',
      noteDescription: '',
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
    if (action === 'Archive') newNoteToCreate.isArchived = true;

    // To do items handling
    Array.from(newNoteToDoItems).forEach((item, index) => {
      if (item === document.querySelector('.newnote-item-placeholder')) {
        return;
      }
      const checkbox = item.querySelector('.newnote-to-do-item-checkbox');
      const textArea = item.querySelector('.newnote-item-placeholder-textarea');
      const newToDoItem = {
        id: index,
        label: textArea.value,
        isChecked: checkbox.getAttribute('checked') === 'true',
      };
      newNoteToCreate.toDoItems.push(newToDoItem);
    });
    newNoteToCreate.isToDoList = newNoteToCreate.toDoItems.length > 0;
    if (emptyFields && !newNoteToCreate.isToDoList) {
      this._endEditingNewNote();
    } else {
      this.dbManager.createNewNoteItem(newNoteToCreate);
    }
  }
}
