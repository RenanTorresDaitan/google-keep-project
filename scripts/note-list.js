export default class NoteList {
  constructor() {
    this._list = [];
  }

  getList() {
    return this._list;
  }

  clearList() {
    this._list = [];
  }

  addNoteToList(noteObj) {
    this._list.push(noteObj);
  }

  getNoteById(id) {
    return this.getList().find((item) => item.getId() == id);
  }

  removeNoteFromList(id) {
    this._list = this.getList().filter((item) => item.getId() != id);
  }
}
