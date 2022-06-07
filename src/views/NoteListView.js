import NoteItemView from './NoteItemView';

export default class NoteListView {
  constructor(controller) {
    this.noteItemController = controller;
    this.list = this.noteItemController.dbManager.noteItemsList.getList();
    this._element = this._template();
  }

  build() {
    return this._element;
  }

  _template() {
    const element = document.createElement('section');
    element.setAttribute('id', 'notes-area');
    this.list.forEach((noteItem) => {
      element.append(new NoteItemView(noteItem, this.noteItemController).build());
    });
    return element;
  }

  update() {
    this._element = this._template();
  }
}
