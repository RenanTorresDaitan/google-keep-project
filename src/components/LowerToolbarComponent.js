import unarchiveIcon from '../resources/svg/notecard/unarchive-note-icon.svg'
import archiveIcon from '../resources/svg/notecard/archive-note-icon.svg'
import addReminderIcon from '../resources/svg/notecard/add-reminder-icon.svg'
import menuCirclesIcon from '../resources/svg/notecard/menu-circles-icon.svg'
import colorPaletteIcon from '../resources/svg/notecard/color-palette-icon.svg'
import restoreNoteIcon from '../resources/svg/notecard/restore-note-icon.svg'
import deleteForeverIcon from '../resources/svg/notecard/delete-forever-icon.svg'

import { app } from '../index'

export class LowerToolbarComponent {
  constructor (noteItem) {
    this.noteItem = noteItem
    this._element = this._template()
    return this._element
  }

  _template () {
    const { id, isArchived, isTrashed } = this.noteItem
    const element = document.createElement('div')
    element.classList.add('note-lower-toolbar')
    element.innerHTML = `
    <!-- Standard note buttons -->
      <div class="lower-toolbar-button ${
        isTrashed ? 'hide' : ''
      }" data-button="add-reminder">
        <img class="svg-icon" src="${addReminderIcon}">
      </div>
      <div class="lower-toolbar-button ${
        isTrashed ? 'hide' : ''
      }" data-button="color-button" >
        <img class="svg-icon" src="${colorPaletteIcon}">
      </div>
      <div class="lower-toolbar-button ${
        isTrashed ? 'hide' : ''
      }" data-button="archive-button" >
      <img class="svg-icon" src="${isArchived ? unarchiveIcon : archiveIcon}">
      </div>
      <div class="lower-toolbar-button ${
        isTrashed ? 'hide' : ''
      }" data-button="menu-button" >
        <img class="svg-icon" src="${menuCirclesIcon}">
      </div>
    <!-- Trashed note buttons -->
      <div class="lower-toolbar-button ${
        isTrashed ? '' : 'hide'
      }" data-button="restore-button" >
      <img class="svg-icon" src="${restoreNoteIcon}">
    </div>
    <div class="lower-toolbar-button ${
      isTrashed ? '' : 'hide'
    }" data-button="delete-button">
      <img class="svg-icon" src="${deleteForeverIcon}">
    </div>
    `
    element
      .querySelector("[data-button='add-reminder']")
      .addEventListener('click', () => app.noteItemsController.addReminder(id))
    element
      .querySelector("[data-button='color-button']")
      .addEventListener('click', () =>
        app.noteItemsController.openColorMenu(id)
      )
    element
      .querySelector("[data-button='menu-button']")
      .addEventListener('click', () => app.noteItemsController.openMenu(id))
    element
      .querySelector("[data-button='restore-button']")
      .addEventListener('click', () => app.noteItemsController.restoreNote(id))
    element
      .querySelector("[data-button='delete-button']")
      .addEventListener('click', () => app.noteItemsController.deleteNote(id))
    element
      .querySelector("[data-button='archive-button']")
      .addEventListener('click', () =>
        isArchived
          ? app.noteItemsController.unarchiveNote(id)
          : app.noteItemsController.archiveNote(id)
      )
    return element
  }
}
