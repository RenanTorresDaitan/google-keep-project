import unarchiveIcon from '../resources/svg/notecard/unarchive-note-icon.svg';
import archiveIcon from '../resources/svg/notecard/archive-note-icon.svg';
import addReminderIcon from '../resources/svg/notecard/add-reminder-icon.svg';
import menuCirclesIcon from '../resources/svg/notecard/menu-circles-icon.svg';
import colorPaletteIcon from '../resources/svg/notecard/color-palette-icon.svg';
import restoreNoteIcon from '../resources/svg/notecard/restore-note-icon.svg';
import deleteForeverIcon from '../resources/svg/notecard/delete-forever-icon.svg';
import NoteItemController from '../controllers/NoteItemController';

export default class LowerToolbarComponent {
  constructor(noteItem) {
    this.noteItem = noteItem;
    this.noteItemsController = new NoteItemController();
    this._element = this._template();
  }

  build() {
    return this._element;
  }

  _template() {
    const { id, isArchived, isTrashed } = this.noteItem;
    const element = document.createElement('div');
    element.classList.add('note-lower-toolbar');
    element.innerHTML = `
<!-- Standard note buttons -->
  <div class="lower-toolbar-button ${isTrashed ? 'hide' : ''}" data-button="add-reminder">
    <img class="svg-icon" src="${addReminderIcon}">
  </div>
  <div class="lower-toolbar-button ${isTrashed ? 'hide' : ''}" data-button="color-button" >
    <img class="svg-icon" src="${colorPaletteIcon}">
  </div>
  <div class="lower-toolbar-button ${isTrashed ? 'hide' : ''}" data-button="archive-button" >
  <img class="svg-icon" src="${isArchived ? unarchiveIcon : archiveIcon}">
  </div>
  <div class="lower-toolbar-button ${isTrashed ? 'hide' : ''}" data-button="menu-button" >
    <img class="svg-icon" src="${menuCirclesIcon}">
  </div>
<!-- Trashed note buttons -->
  <div class="lower-toolbar-button ${isTrashed ? '' : 'hide'}" data-button="restore-button" >
  <img class="svg-icon" src="${restoreNoteIcon}">
</div>
<div class="lower-toolbar-button ${isTrashed ? '' : 'hide'}" data-button="delete-button">
  <img class="svg-icon" src="${deleteForeverIcon}">
</div>
    `;
    element
      .querySelector("[data-button='add-reminder']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.addReminder(id);
      });
    element
      .querySelector("[data-button='color-button']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.openColorMenu(id);
      });
    element
      .querySelector("[data-button='menu-button']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.openMenu(id);
      });
    element
      .querySelector("[data-button='restore-button']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.restoreNote(id);
      });
    element
      .querySelector("[data-button='delete-button']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.deleteNote(id);
      });
    element
      .querySelector("[data-button='archive-button']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        if (isArchived) {
          this.noteItemsController.unarchiveNote(id);
        } else {
          this.noteItemsController.archiveNote(id);
        }
      });
    return element;
  }
}
