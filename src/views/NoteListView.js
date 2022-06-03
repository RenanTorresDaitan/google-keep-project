import { NoteItemView } from './NoteItemView'

export class NoteListView {
  constructor (list) {
    this._element = this._template()
    this.update(list)
    return this._element
  }

  _template () {
    const element = document.createElement('section')
    element.setAttribute('id', 'notes-area')
    return element
  }

  update (list) {
    list.forEach(noteItem => this._element.append(new NoteItemView(noteItem)))
  }
}
