import largePinIcon from "../resources/svg/notecard/pin-large-icon.svg";
import largePinnedIcon from "../resources/svg/notecard/pin-large-pinned-icon.svg";
import { ColorBallContainer } from "../components/ColorBallContainer";
import { ToDoItemContainer } from "../components/ToDoItemContainer";
import { LowerToolbarComponent } from "../components/LowerToolbarComponent";
import { app } from "..";

export class NoteItemView {
  constructor(noteItem) {
    this._element = this._template(noteItem);
    return this._element;
  }

  _template(noteItem) {
    const { title, id, color, isArchived, isPinned, isToDoList } = noteItem;
    const element = document.createElement("div");
    element.setAttribute("class", "note-card");
    element.setAttribute("tabindex", "0");
    element.setAttribute("aria-label", `Keep'sNote ${title}`);
    element.setAttribute("data-note-id", `${id}`);
    element.setAttribute("data-color", `${color}`);
    element.innerHTML = `
      <div class="menu-panel hide">
          <div role="button" class="menu-option ${
            isArchived ? "hide" : ""
          }" data-button="archive-button">Archive</div>
          <div role="button" class="menu-option" data-button="delete-button">Delete</div>
      </div>
      <div class="note-card-buttons-container">
          <div role="button" class="note-card-button color-button" aria-label="Change Note Color" data-tooltip-text="Change Note Color" tabindex="0" ></div>
          <div role="button" class="note-card-button menu-button" aria-label="Menu" data-tooltip-text="Menu" tabindex="0" ></div>
          <div role="button" class="note-card-button pin-button ${
            isPinned ? "note-pinned" : ""
          }" aria-label="Fix note" data-tooltip-text="Fix note" tabindex="0" ></div>
      </div>
      <div role="button" class="notecard-pin-button ${
        isPinned ? "note-pinned" : ""
      }" aria-label="Fix note" data-tooltip-text="Fix note" tabindex="0" >
          <img class="svg-icon-large"  ${
            isPinned ? `src="${largePinnedIcon}"` : `src="${largePinIcon}"`
          }>
      </div>
      <div class="note-card-title">
          <label>${title}</label>
          <textarea name="note-title" class="note-card-title-textarea hide" id="title-textarea" rows="1" maxlength="999" placeholder="Title" style="height: 1rem;">${title}</textarea>
      </div>
      <button class="note-card-done-button hide [ m-0625rem-lr p-05rem ]" style="user-select: none;" >Done</button>
    `;
    element.insertBefore(
      new ColorBallContainer(noteItem),
      element.querySelector(".menu-panel")
    );
    if (noteItem.isToDoList) {
      element.insertBefore(
        new ToDoItemContainer(noteItem),
        element.querySelector(".notecard-done-button")
      );
    } else {
      const descriptionEl = document.createElement("div");
      descriptionEl.classList.add("note-card-desc");
      descriptionEl.innerHTML = `
          <label>${noteItem.description}</label>
          <textarea name="note-description" class="note-card-desc-textarea hide" id="description-textarea" rows="1" maxlength="19999" placeholder="Take a note..." style="height: 1rem;">${noteItem.description}</textarea>
        `;
      element.insertBefore(
        descriptionEl,
        element.querySelector(".notecard-done-button")
      );
    }
    element.append(new LowerToolbarComponent(noteItem));
    // Event Listeners
    element.addEventListener("click", () =>
      app.noteItemsController.editNote(id)
    );
    element
      .querySelector(".note-card-done-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        app.noteItemsController.updateNote(id);
      });
    element
      .querySelector(".note-card-title")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        app.noteItemsController.showNoteTitle(element);
      });
    if (!isToDoList) {
      element
        .querySelector(".note-card-desc")
        .addEventListener("click", (event) => {
          event.stopPropagation();
          app.noteItemsController.showNoteDescription(element);
        });
    }
    element
      .querySelector("[data-button='archive-button']")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        app.noteItemsController.archiveNote(id);
      });
    element
      .querySelector("[data-button='delete-button']")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        app.noteItemsController.trashNote(id);
      });
    element
      .querySelector(".color-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        app.noteItemsController.openColorMenu(id);
      });
    element.querySelector(".menu-button").addEventListener("click", (event) => {
      event.stopPropagation();
      app.noteItemsController.openMenu(id);
    });
    element.querySelector(".pin-button").addEventListener("click", (event) => {
      event.stopPropagation();
      app.noteItemsController.pinNote(id);
    });
    element
      .querySelector(".notecard-pin-button")
      .addEventListener("click", (event) => {
        event.stopPropagation();
        app.noteItemsController.pinNote(id);
      });

    return element;
  }
}
