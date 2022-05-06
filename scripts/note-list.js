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
    noteObj._id = this._calculateNextId();
    this._list.push(noteObj);
  }

  getNoteById(id) {
    return this.getList().find((item) => item.getId() == id);
  }

  removeNoteFromList(id) {
    this._list = this.getList().filter((item) => item.getId() != id);
  }
  _calculateNextId() {
    const list = this.getList().sort((a, b) => a.getId() - b.getId());
    let nextId = 1;
    if (list.length > 0) {
      nextId = list[list.length - 1].getId() + 1;
    }
    return nextId;
  }
}
