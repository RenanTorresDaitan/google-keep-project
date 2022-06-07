import largePinIcon from '../resources/svg/notecard/pin-large-icon.svg';
import largePinnedIcon from '../resources/svg/notecard/pin-large-pinned-icon.svg';
import ColorBallContainer from '../components/ColorBallContainer';
import ToDoItemContainer from '../components/ToDoItemContainer';
import LowerToolbarComponent from '../components/LowerToolbarComponent';

export default class NoteItemView {
  constructor(noteItem, controller) {
    this.noteItem = noteItem;
    this.noteItemsController = controller;
    this.colorBallContainer = new ColorBallContainer(this.noteItem, this.noteItemsController);
    this.lowerToolbarComponent = new LowerToolbarComponent(this.noteItem);
    this.toDoItemContainer = new ToDoItemContainer(this.noteItem, this.noteItemsController);
    this._element = this._template(this.noteItem);
  }

  build() {
    return this._element;
  }

  _template(noteItem) {
    const {
      title, id, color, isArchived, isPinned, isToDoList,
    } = noteItem;
    const element = document.createElement('div');
    element.setAttribute('class', 'note-card');
    element.setAttribute('tabindex', '0');
    element.setAttribute('aria-label', `Keep'sNote ${title}`);
    element.setAttribute('data-note-id', `${id}`);
    element.setAttribute('data-color', `${color}`);
    element.innerHTML = `
<div class="menu-panel hide">
    <div role="button" class="menu-option ${
  isArchived ? 'hide' : ''
}" data-button="archive-button">Archive</div>
    <div role="button" class="menu-option" data-button="delete-button">Delete</div>
</div>
<div class="note-card-buttons-container">
    <div role="button" class="note-card-button color-button" aria-label="Change Note Color" data-tooltip-text="Change Note Color" tabindex="0" ></div>
    <div role="button" class="note-card-button menu-button" aria-label="Menu" data-tooltip-text="Menu" tabindex="0" ></div>
    <div role="button" class="note-card-button pin-button ${
  isPinned ? 'note-pinned' : ''
}" aria-label="Fix note" data-tooltip-text="Fix note" tabindex="0" ></div>
</div>
<div role="button" class="notecard-pin-button ${
  isPinned ? 'note-pinned' : ''
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
      this.colorBallContainer.build(),
      element.querySelector('.menu-panel'),
    );
    if (noteItem.isToDoList) {
      element.insertBefore(
        this.toDoItemContainer.build(),
        element.querySelector('.notecard-done-button'),
      );
    } else {
      const descriptionEl = document.createElement('div');
      descriptionEl.classList.add('note-card-desc');
      descriptionEl.innerHTML = `
          <label>${noteItem.description}</label>
          <textarea name="note-description" class="note-card-desc-textarea hide" id="description-textarea" rows="1" maxlength="19999" placeholder="Take a note..." style="height: 1rem;">${noteItem.description}</textarea>
        `;
      element.insertBefore(
        descriptionEl,
        element.querySelector('.notecard-done-button'),
      );
    }
    element.append(this.lowerToolbarComponent.build());
    // Event Listeners
    element.addEventListener('click', () => this.noteItemsController.editNote(id));
    element
      .querySelector('.note-card-done-button')
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.updateNote(id);
      });
    element
      .querySelector('.note-card-title')
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.showNoteTitle();
      });
    if (!isToDoList) {
      element
        .querySelector('.note-card-desc')
        .addEventListener('click', (event) => {
          event.stopPropagation();
          this.showNoteDescription();
        });
    }
    element
      .querySelector("[data-button='archive-button']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.archiveNote(id);
      });
    element
      .querySelector("[data-button='delete-button']")
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.trashNote(id);
      });
    element
      .querySelector('.color-button')
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.openColorMenu();
      });
    element.querySelector('.menu-button').addEventListener('click', (event) => {
      event.stopPropagation();
      this.openMenu();
    });
    element.querySelector('.pin-button').addEventListener('click', (event) => {
      event.stopPropagation();
      this.noteItemsController.pinNote(id);
    });
    element
      .querySelector('.notecard-pin-button')
      .addEventListener('click', (event) => {
        event.stopPropagation();
        this.noteItemsController.pinNote(id);
      });

    return element;
  }

  openColorMenu() {
    this._element.querySelector('.color-ball-container').classList.remove('hide');
  }

  openMenu() {
    this._element.querySelector('.menu-panel').classList.remove('hide');
  }

  showNoteTitle() {
    // Show and edit Title
    this._element.querySelector('.note-card-done-button').classList.remove('hide');
    const titleLabel = this._element.querySelector('.note-card-title > label');
    const titleTextarea = this._element.querySelector('#title-textarea');
    if (titleLabel.textContent === '') {
      titleTextarea.classList.remove('hide');
      titleLabel.classList.add('hide');
      titleTextarea.focus();
    } else {
      titleLabel.classList.add('hide');
      titleTextarea.value = '';
      titleTextarea.value = titleLabel.textContent;
      titleTextarea.classList.remove('hide');
      titleTextarea.focus();
    }
    titleTextarea.addEventListener('input', (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        titleLabel.textContent = titleTextarea.value;
      }
    });
    titleTextarea.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        titleTextarea.classList.add('hide');
        titleLabel.classList.remove('hide');
        if (titleLabel.textContent !== '') {
          titleLabel.textContent = titleTextarea.value;
        }
        event.preventDefault();
      }
    });
  }

  showNoteDescription() {
    // Show and edit Description
    this._element.querySelector('.note-card-done-button').classList.remove('hide');
    const descriptionLabel = this._element.querySelector('.note-card-desc > label');
    const descriptionTextarea = this._element.querySelector('#description-textarea');
    if (descriptionLabel.textContent === '') {
      descriptionTextarea.classList.remove('hide');
      descriptionLabel.classList.add('hide');
      descriptionTextarea.focus();
    } else {
      descriptionLabel.classList.add('hide');
      descriptionTextarea.value = '';
      descriptionTextarea.value = descriptionLabel.textContent;
      descriptionTextarea.classList.remove('hide');
      descriptionTextarea.focus();
    }
    // Handle input on textarea
    descriptionTextarea.addEventListener('input', (event) => {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        descriptionLabel.textContent = descriptionTextarea.value;
      }
    });
    descriptionTextarea.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        descriptionTextarea.classList.add('hide');
        descriptionLabel.classList.remove('hide');
        if (descriptionLabel.textContent !== '') {
          descriptionLabel.textContent = descriptionTextarea.value;
        }
        event.preventDefault();
      }
    });
  }
}
