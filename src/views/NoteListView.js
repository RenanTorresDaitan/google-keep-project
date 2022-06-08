import NoteItemView from './NoteItemView';

export default class NoteListView {
  constructor(controller) {
    this.noteItemController = controller;
    this.list = this.noteItemController.dbManager.noteItemsList.getList();
    this.update(this.list);
  }

  build() {
    return this._element;
  }

  _template(list) {
    const element = document.createElement('section');
    element.setAttribute('id', 'notes-area');
    list.forEach((noteItem) => {
      element.append(new NoteItemView(noteItem, this.noteItemController).build());
    });
    return element;
  }

  update(list) {
    this._element = this._template(list);
  }
}
