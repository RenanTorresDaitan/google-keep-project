class LowerToolbarComponent {
  constructor(noteItem) {
    this.noteItem = noteItem;
  }
  _template() {
    return `
      <div class="note-lower-toolbar">
        ${
          this.noteItem.isTrashed
            ? this.trashedNoteButtons()
            : this.standardButtons()
        }
      </div>
    `;
  }
  build() {
    return this._template();
  }
  archiveButton() {
    if (this.noteItem.isArchived) {
      return `
        <div class="lower-toolbar-button" onclick="noteItemsController.unarchiveNote(${this.noteItem.id})">
          <img class="svg-icon" src="./resources/svg/notecard/unarchive-note-icon.svg">
        </div>
      `;
    } else {
      return `
        <div class="lower-toolbar-button" onclick="noteItemsController.archiveNote(${this.noteItem.id})">
          <img class="svg-icon" src="./resources/svg/notecard/archive-note-icon.svg">
        </div>
        `;
    }
  }
  standardButtons() {
    return `
      <div class="lower-toolbar-button" onclick="noteItemsController.addReminder(${
        this.noteItem.id
      })">
        <img class="svg-icon" src="./resources/svg/notecard/add-reminder-icon.svg">
      </div>
      <div class="lower-toolbar-button" onclick="noteItemsController.openColorMenu(${
        this.noteItem.id
      })">
        <img class="svg-icon" src="./resources/svg/notecard/color-palette-icon.svg">
      </div>
      ${this.archiveButton(this.noteItem)}
      <div class="lower-toolbar-button" onclick="noteItemsController.openMenu(${
        this.noteItem.id
      })">
        <img class="svg-icon" src="./resources/svg/notecard/menu-circles.svg">
      </div>
    `;
  }
  trashedNoteButtons() {
    return `
      <div class="lower-toolbar-button" onclick="noteItemsController.restoreNote(${this.noteItem.id})">
        <img class="svg-icon" src="./resources/svg/notecard/restore-note-icon.svg">
      </div>
      <div class="lower-toolbar-button" onclick="noteItemsController.deleteNote(${this.noteItem.id})">
        <img class="svg-icon" src="./resources/svg/notecard/delete-forever-icon.svg">
      </div>
    `;
  }
}
