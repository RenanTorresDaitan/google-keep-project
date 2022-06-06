export class NoteListModel {
  constructor () {
    this._list = [];
  }

  getList () {
    return this._list;
  }

  clearList () {
    this._list = [];
  }

  addNoteToList (noteObj) {
    noteObj.id = noteObj.id != null ? noteObj.id : this.#calculateNextId();
    this._list.push(noteObj);
  }

  getNoteById (id) {
    return this.getList().find((item) => item.id === id);
  }

  removeNoteFromList (id) {
    this._list = this.getList().filter((item) => item.id !== id);
  }

  #calculateNextId () {
    const list = this.getList().sort((a, b) => a.id - b.id);
    let nextId = 1;
    if (list.length > 0) {
      nextId = list[list.length - 1].id + 1;
    }
    return nextId;
  }
}
