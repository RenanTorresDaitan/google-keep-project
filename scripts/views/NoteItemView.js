class NoteItemView {
  constructor(noteItem) {
    this.noteItem = noteItem;
    this._element = this.build().outerHTML;
  }

  _template(noteItem) {
    return `
            <div class="note-card" tabindex="0" aria-label="Keep's Note ${
              noteItem.title
            }" data-note-id="${noteItem.id}" data-color="${noteItem.color}">
                ${new ColorBallContainer(noteItem).build()}
                <div class="menu-panel hide">
                    <div role="button" class="menu-option" onclick="noteItemsController.archiveNote(${noteItem.id})">Archive</div>
                    <div role="button" class="menu-option" onclick="noteItemsController.trashNote(${noteItem.id})">Delete</div>
                </div>
                <div class="note-card-buttons-container">
                    <div role="button" class="note-card-button color-button" aria-label="Change Note Color" data-tooltip-text="Change Note Color" tabindex="0" onclick="noteItemsController.openColorMenu(${noteItem.id})"></div>
                    <div role="button" class="note-card-button menu-button" aria-label="Menu" data-tooltip-text="Menu" tabindex="0" onclick="noteItemsController.openMenu(${noteItem.id})"></div>
                    <div role="button" class="note-card-button pin-button ${noteItem.isPinned ? "note-pinned" : ""}" aria-label="Fix note" data-tooltip-text="Fix note" tabindex="0" onclick="noteItemsController.pinNote(${noteItem.id})"></div>
                </div>
                <div role="button" class="notecard-pin-button">
                    <img class="svg-icon-large" src="./resources/svg/notecard/pin-large-icon.svg">
                </div>
                <div class="note-card-title" onclick="noteItemsController.showNoteTitle(this.parentNode)">
                    <label>${noteItem.title}</label>
                    <textarea name="note-title" class="note-card-title-textarea hide" id="title-textarea" rows="1" maxlength="999" placeholder="Title" style="height: 1rem;">${noteItem.title}</textarea>
                </div>
                ${this.typeOfNoteContainer(noteItem)}
                <button class="note-card-done-button hide [ m-0625rem-lr p-05rem ]" style="user-select: none;" onclick="noteItemsController.updateNote(${noteItem.id})">Done</button>
                ${new LowerToolbarComponent(noteItem).build()}
            </div>
            `;
  }
  update(noteItem) {
    this._element.innerHTML = this._template(noteItem);
  }
  build() {
    return this._template(this.noteItem);
  }
  typeOfNoteContainer(noteItem){
    if (noteItem.isToDoList){
      return new ToDoItemContainer(noteItem).build();
    }
    return `
    <div class="note-card-desc ${noteItem.isToDoList ? "hide" : ""}" onclick="noteItemsController.editNote(${noteItem.id})">
      <label>${noteItem.description}</label>
      <textarea name="note-description" class="note-card-desc-textarea hide" id="description-textarea" rows="1" maxlength="19999" placeholder="Take a note..." style="height: 1rem;">${noteItem.description}</textarea>
    </div>
    `
  }
}