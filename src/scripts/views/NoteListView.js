import {NoteItemView} from "./NoteItemView" 

export class NoteListView {
  constructor() {
    this._element = document.createElement("section");
    this._element.setAttribute("id", "notes-area");
  }

  _template(list) {
    return list
      .map((noteItem) => {
        return new NoteItemView(noteItem).build();
      })
      .join("");
  }
  update(list) {
    this._element.innerHTML = this._template(list);
  }
  build() {
    return this._element.outerHTML;
  }
}
