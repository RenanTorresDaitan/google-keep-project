class LowerToolbarComponent {
  constructor(noteItem) {
    this.noteItem = noteItem;
  }
  _template() {
    return `
      <div class="note-lower-toolbar">
        <div class="lower-toolbar-button" onclick="noteItemsController.addReminder(${this.noteItem.id})">
          <img class="svg-icon" src="./resources/svg/notecard/add-reminder-icon.svg">
        </div>
        <div class="lower-toolbar-button" onclick="noteItemsController.openColorMenu(${this.noteItem.id})">
          <img class="svg-icon" src="./resources/svg/notecard/color-palette-icon.svg">
        </div>
        <div class="lower-toolbar-button" onclick="noteItemsController.archiveNote(${this.noteItem.id})">
          <img class="svg-icon" src="./resources/svg/notecard/archive-note-icon.svg">
        </div>
        <div class="lower-toolbar-button" onclick="noteItemsController.openMenu(${this.noteItem.id})">
          <img class="svg-icon" src="./resources/svg/notecard/menu-circles.svg">
        </div>
      </div>
    `;
  }
  build() {
    return this._template();
  }
}