import NoteListModel from './NoteListModel';
import NoteItemModel from './NoteItemModel';

export default class DBManager {
  constructor(appName) {
    this.APP_NAME = appName;
    this.noteItemsList = new NoteListModel();
    this.loadNotesFromLocalStorage();
  }

  loadNotesFromLocalStorage() {
    const storedList = localStorage.getItem(this.APP_NAME);
    if (typeof storedList !== 'string') return;
    const parsedList = JSON.parse(storedList);
    parsedList._list.forEach((storedNote) => {
      const note = storedNote;
      this.noteItemsList.addNoteToList(new NoteItemModel(note));
    });
    this.reloadNotes();
  }

  reloadNotes() {
    this.noteItemsList.getList().forEach((item) => {
      if (item.checkTimeToDelete()) {
        this.noteItemsList.removeNoteFromList(item.getId());
      }
    });
  }

  updateNotesOnLocalStorage() {
    localStorage.setItem(this.APP_NAME, JSON.stringify(this.noteItemsList));
    this.reloadNotes();
  }

  createNewNoteItem(noteInfo) {
    const newNoteItem = new NoteItemModel(noteInfo);
    this.noteItemsList.addNoteToList(newNoteItem);
    this.updateNotesOnLocalStorage();
  }
}
