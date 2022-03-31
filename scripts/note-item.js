export default class NoteItem {
  constructor() {
    this._id = null;
    this._item = null;
  }
  getId() {
    return this._id;
  }

  setId(id) {
      this._id = id;
  }

  getNote() {
      return this._item;
  }

  setNote(note) {
      this._item = note;
  }
}
