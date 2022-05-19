class NoteListView {
  constructor(element) {
    this._element = element;
  }

  _template(list) {
    return list.map((noteItem) => {return new NoteItemView(noteItem).build();}).join("");
  }
  update(list) {
    this._element.innerHTML = this._template(list);
  }
}