export default class NoteItem {
  constructor({
    _id = null,
    noteTitle = "",
    noteDescription = "",
    noteTime = 0,
    isPinned = false,
    color = "white",
  } = {}) {
    this._id = _id;
    this.noteTitle = noteTitle;
    this.noteDescription = noteDescription;
    this.noteTime = noteTime;
    this.isPinned = isPinned;
    this.color = color;
  }

  getId() {
    return this._id;
  }
  getTitle() {
    return this.noteTitle;
  }
  setTitle(noteTitle) {
    this.noteTitle = noteTitle;
  }
  getDescription() {
    return this.noteDescription;
  }
  setDescription(noteDescription) {
    this.noteDescription = noteDescription;
  }
  getTime() {
    return this.noteTime;
  }
  isPinned() {
    return this.isPinned;
  }
  getCOlor() {
    return this.color;
  }
  setColor(color) {
    this.color = color;
  }
}
