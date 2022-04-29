export default class NoteItem {
  constructor({
    _id = null,
    noteTitle = "",
    noteDescription = "",
    noteTime = 0,
    isPinned = false,
    isToDoList = false,
    isReminder = false,
    isArchived = false,
    isTrashed = false,
    toDoItems = [],
    color = "white",
  } = {}) {
    this._id = _id;
    this.noteTitle = noteTitle;
    this.noteDescription = noteDescription;
    this.noteTime = noteTime;
    this.isPinned = isPinned;
    this.isToDoList = isToDoList;
    this.isReminder = isReminder;
    this.isArchived = isArchived;
    this.isTrashed = isTrashed;
    this.toDoItems = toDoItems;
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
  getColor() {
    return this.color;
  }
  setColor(color) {
    this.color = color;
  }
  getToDoItems() {
    return this.toDoItems;
  }
  addToDoItem(item) {
    this.toDoItems.push(item);
  }
}
