class NoteItemController {
  constructor() {}
  
  openMenu(id) {
    document
      .querySelector(`[data-note-id="${id}"] .menu-panel`)
      .classList.remove("hide");
  }
  openColorMenu(id){
    document
    .querySelector(`[data-note-id="${id}"] .color-ball-container`)
    .classList.remove("hide");
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
    noteToPin.isPinned = noteToPin.isPinned ? false : true;
    updateNotesOnLocalStorage();
  }
}
