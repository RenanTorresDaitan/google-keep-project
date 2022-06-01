import largePinIcon from "../resources/svg/notecard/pin-large-icon.svg";
import largePinnedIcon from "../resources/svg/notecard/pin-large-pinned-icon.svg";

export class NoteItemView {
  constructor(noteItem) {
    this._element = this._template(noteItem);
  }

  _template(noteItem) {
    const { title, id, color, isArchived, isPinned } = noteItem;
    const element = document.createElement("div");
    element.setAttribute("class", "note-card");
    element.setAttribute("tabindex", "0");
    element.setAttribute("aria-label", `Keep'sNote ${title}`);
    element.setAttribute("data-note-id", `${id}`);
    element.setAttribute("data-color", `${color}`);
    element.innerHTML = `
      ${new ColorBallContainer(noteItem).build()}
      <div class="menu-panel hide">
          <div role="button" class="menu-option ${
            isArchived ? "hide" : ""
          }" onclick="noteItemsController.archiveNote(${id})">Archive</div>
          <div role="button" class="menu-option" onclick="noteItemsController.trashNote(${id})">Delete</div>
      </div>
      <div class="note-card-buttons-container">
          <div role="button" class="note-card-button color-button" aria-label="Change Note Color" data-tooltip-text="Change Note Color" tabindex="0" onclick="noteItemsController.openColorMenu(${id})"></div>
          <div role="button" class="note-card-button menu-button" aria-label="Menu" data-tooltip-text="Menu" tabindex="0" onclick="noteItemsController.openMenu(${id})"></div>
          <div role="button" class="note-card-button pin-button ${
            isPinned ? "note-pinned" : ""
          }" aria-label="Fix note" data-tooltip-text="Fix note" tabindex="0" onclick="noteItemsController.pinNote(${id})"></div>
      </div>
      <div role="button" class="notecard-pin-button ${
        isPinned ? "note-pinned" : ""
      }" aria-label="Fix note" data-tooltip-text="Fix note" tabindex="0" onclick="noteItemsController.pinNote(${id})">
          <img class="svg-icon-large"  ${
            isPinned ? `src="${largePinnedIcon}"` : `src="${largePinIcon}"`
          }>
      </div>
      <div class="note-card-title" onclick="noteItemsController.showNoteTitle(this.parentNode)">
          <label>${title}</label>
          <textarea name="note-title" class="note-card-title-textarea hide" id="title-textarea" rows="1" maxlength="999" placeholder="Title" style="height: 1rem;">${title}</textarea>
      </div>
      ${this.typeOfNoteContainer(noteItem)}
      <button class="note-card-done-button hide [ m-0625rem-lr p-05rem ]" style="user-select: none;" onclick="noteItemsController.updateNote(${id})">Done</button>
      ${new LowerToolbarComponent(noteItem).build()}
    `;
    return element;
  }
  typeOfNoteContainer(noteItem) {
    const { description, id, isToDoList } = noteItem;
    if (isToDoList) {
      return new ToDoItemContainer(noteItem).build();
    }
    return `
    <div class="note-card-desc ${
      isToDoList ? "hide" : ""
    }" onclick="noteItemsController.editNote(${id})">
      <label>${description}</label>
      <textarea name="note-description" class="note-card-desc-textarea hide" id="description-textarea" rows="1" maxlength="19999" placeholder="Take a note..." style="height: 1rem;">${description}</textarea>
    </div>
    `;
  }
}
