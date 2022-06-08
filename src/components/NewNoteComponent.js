import plusIcon from '../resources/svg/notecard/plus-icon.svg';
import newListIcon from '../resources/svg/new-list-icon.svg';
import NewNoteController from '../controllers/NewNoteController';

export default class NewNoteComponent {
  constructor(db) {
    this.dbManager = db;
    this.newNoteController = new NewNoteController(this.dbManager);
    this._element = this._template();
  }

  build() {
    return this._element;
  }

  _template() {
    const element = document.createElement('div');
    element.setAttribute('class', 'newnote');
    element.setAttribute('id', 'new-note-dialog');
    element.innerHTML = `
      <!-- New note and new list buttons -->
      <div role="button" id="new-note-button" class="new-note-button" class="[ m-0625rem-r p-05rem-0625rem ]" tabindex="0" style="user-select: none" >
        <img class="icon-size" src="${plusIcon}" alt="">
        <span>Take a note…</span>
      </div>
      <div role="button" id="new-list-button" class="icon-button icon-size" tabindex="0" style="user-select: none"
        data-tooltip-text="New list" aria-label="New list" >
        <img class="svg-icon" src="${newListIcon}" alt="">
      </div>
      <!-- Note card to be edited after clicking -->
      <div class="editing-note hide">
        <div class="newnote-menu hide">
          <div id="archive-menu-button" class="newnote-menu-option">Archive</div>
          <div id="delete-menu-button" class="newnote-menu-option">Delete</div>
          <div id="open-menu-button" class="newnote-menu-option" style="display:flex; justify-content: center;">
            <div style=" margin-right: 0.375rem;">Open in Keep</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="#333"
              focusable="false">
              <path
                d="m15.444 15.444h-10.888v-10.888h5.444v-1.556h-5.444c-0.86 0-1.556 0.696-1.556 1.556v10.888c0 0.86 0.696 1.556 1.556 1.556h10.888c0.86 0 1.556-0.696 1.556-1.556v-5.444h-1.556v5.444zm-3.888-12.444v1.556h2.788l-7.646 7.644 1.1 1.102 7.646-7.646v2.788h1.556v-5.444h-5.444z">
              </path>
            </svg>
          </div>
        </div>
        <div class="newnote-menu-button" >
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24">
            <path
              d="M12,8.5c1,0,1.8-0.8,1.8-1.8S13,5,12,5s-1.8,0.8-1.8,1.8S11,8.5,12,8.5z M12,10.2c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8
            s1.8-0.8,1.8-1.8S13,10.2,12,10.2z M12,15.5c-1,0-1.8,0.8-1.8,1.8S11,19,12,19s1.8-0.8,1.8-1.8S13,15.5,12,15.5z" />
          </svg>
        </div>
        <div class="newnote-pin-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24">
            <path d="M16 5h.99L17 3H7v2h1v7l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2V5z"></path>
          </svg>
        </div>
        <textarea class="newnote-title-textarea" placeholder="Title"></textarea>
        <textarea class="newnote-desc-textarea" placeholder="Take a note..."></textarea>
        <!-- To do items area -->
        <div class="newnote-to-do-items-area">
          <div class="newnote-item-placeholder">
            <svg class="newnote-card-item-svg" width="20px" height="20px" viewBox="0 0 24 24" fill="#000000de">
              <path d="m19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z" />
              <path d="m0 0h24v24h-24z" fill="none" />
            </svg>
            <textarea name="" id="new-item-placeholder" cols="30" rows="10" placeholder=" List item"
              class="newnote-item-placeholder-textarea"></textarea>
          </div>
          <div class="completed-items-area hide">
            <div class="completed-items-separator"></div>
            <div class="completed-items-div">
              <div class="completed-items-btn rotate-90-cw"></div>
              <div class="completed-items-label">1 Completed item</div>
            </div>
            <div class="completed-items-list"></div>
          </div>
        </div>
        <div class="newnote-card-button-container">
          <div class="newnote-card-done-button" tabindex="0">Done</div>
        </div>
      </div>
      `;
    element
      .querySelector('#archive-menu-button')
      .addEventListener('click', () => this.createNewNote('Archive'));
    element
      .querySelector('#delete-menu-button')
      .addEventListener('click', () => this._endEditingNewNote());
    element
      .querySelector('#new-item-placeholder')
      .addEventListener('keydown', (event) => this.createNewToDoItem(event));
    element
      .querySelector('.newnote-menu-button')
      .addEventListener('click', () => this.openNewNoteMenu());
    element
      .querySelector('.newnote-pin-button')
      .addEventListener('click', () => this.pinNewNote());
    element
      .querySelector('.completed-items-div')
      .addEventListener('click', () => this.toggleCompletedItems());
    element
      .querySelector('.newnote-card-done-button')
      .addEventListener('click', () => this.createNewNote('Create'));
    element
      .querySelector('.newnote-card-done-button')
      .addEventListener('keydown', () => element.click());
    element
      .querySelector('#new-note-button')
      .addEventListener('click', () => this.startEditingNewNote('note'));
    element
      .querySelector('#new-list-button')
      .addEventListener('click', () => this.startEditingNewNote('list'));
    return element;
  }

  createNewNote(action) {
    this._endEditingNewNote();
    this.newNoteController.createNewNote(action);
  }

  startEditingNewNote(noteType) {
    const noteItemPlaceholder = this._element.querySelector('.newnote-item-placeholder');
    const noteDescTextarea = this._element.querySelector('.newnote-desc-textarea');

    this._element.setAttribute('editing', 'true');
    this._deleteExistingToDoItems();
    this._element.querySelector('.editing-note').classList.remove('hide');
    this._element
      .querySelector('.newnote-pin-button')
      .classList.remove('note-pinned');
    if (noteType === 'list') {
      noteDescTextarea.classList.add('hide');
      noteItemPlaceholder.classList.remove('hide');
      this._element.querySelector('.completed-items-area').classList.add('hide');
      this._element.querySelector('.newnote-item-placeholder-textarea').focus();
    } else {
      noteItemPlaceholder.classList.add('hide');
      noteDescTextarea.focus();
    }
  }

  _endEditingNewNote() {
    const noteTitleTextarea = this._element.querySelector('.newnote-title-textarea');
    const noteDescTextarea = this._element.querySelector('.newnote-desc-textarea');

    noteTitleTextarea.value = '';
    noteDescTextarea.value = '';
    this._element.setAttribute('editing', 'false');
    this._element.querySelector('.editing-note').classList.add('hide');
    this.closeNewNoteMenu();
    noteDescTextarea.classList.remove('hide');
  }

  createNewToDoItem(event) {
    if (
      event.key === 'Tab'
      || event.key === 'Shift'
      || event.key === 'Control'
      || event.key === 'Alt'
    ) {
      return;
    }
    event.preventDefault();
    const newToDoItem = document.createElement('div');
    newToDoItem.classList.add('newnote-to-do-item');
    newToDoItem.innerHTML = `
      <div class="newnote-to-do-item-checkbox" checked="false"></div>
      <textarea class="newnote-item-placeholder-textarea" placeholder="List item"></textarea>
      <div class="newnote-to-do-item-delete"></div>
    `;
    newToDoItem
      .querySelector('.newnote-to-do-item-checkbox')
      .addEventListener('click', (btn) => this.toggleCheckbox(btn.target));
    newToDoItem
      .querySelector('.newnote-item-placeholder-textarea')
      .addEventListener('keydown', (key) => this.editText(key));
    newToDoItem
      .querySelector('.newnote-to-do-item-delete')
      .addEventListener('click', (btn) => this.deleteToDoItem(btn.target));
    this._element
      .querySelector('.newnote-to-do-items-area')
      .insertBefore(newToDoItem, this._element.querySelector('.newnote-item-placeholder'));
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      const newNoteTextArea = newToDoItem.querySelector('.newnote-item-placeholder-textarea');
      newNoteTextArea.value = event.key;
      newNoteTextArea.focus();
    }
  }

  _deleteExistingToDoItems() {
    Array.from(this._element.querySelector('.newnote-to-do-items-area').children).forEach((el) => {
      if (
        el !== this._element.querySelector('.newnote-item-placeholder')
        && el !== this._element.querySelector('.completed-items-area')
      ) {
        this._element.querySelector('.newnote-to-do-items-area').removeChild(el);
      }
    });
    Array.from(this._element.querySelector('.completed-items-list').children).forEach((el) => {
      this._element.querySelector('.completed-items-list').removeChild(el);
    });
  }

  editText(event) {
    if (event.key === 'Enter') {
      this._element.querySelector('#new-item-placeholder').focus();
      event.preventDefault();
    }
  }

  deleteToDoItem(deleteBtn) {
    this._element.querySelector('.newnote-to-do-items-area').removeChild(deleteBtn.parentNode);
  }

  toggleCompletedItems() {
    this._element
      .querySelector('.completed-items-btn')
      .classList.toggle('rotate-90-cw');
    this._element
      .querySelector('.completed-items-list')
      .classList.toggle('hide');
  }

  toggleCheckbox(checkbox) {
    checkbox.setAttribute('checked', checkbox.getAttribute('checked') === 'true' ? 'false' : 'true');
    this._organizeToDoItems();
  }

  _organizeToDoItems() {
    const newNoteToDoItems = Array.from(this._element.querySelectorAll('.newnote-to-do-items-area .newnote-to-do-item'));
    const checkboxChecked = (item) => (item.querySelector('.newnote-to-do-item-checkbox').getAttribute('checked') === 'true');

    newNoteToDoItems.forEach((item) => {
      if (checkboxChecked(item)) {
        this._element.querySelector('.completed-items-list').append(item);
      } else {
        this._element
          .querySelector('.newnote-to-do-items-area')
          .insertBefore(item, this._element.querySelector('.newnote-item-placeholder'));
      }
    });
    const completedItems = this._element.querySelector('.completed-items-list')
      .children.length;
    if (completedItems > 0) {
      this._element
        .querySelector('.completed-items-area')
        .classList.remove('hide');
    } else {
      this._element
        .querySelector('.completed-items-area')
        .classList.add('hide');
    }
    this._element.querySelector('.completed-items-label').textContent = completedItems > 1
      ? `${completedItems} Completed items`
      : '1 Completed item';
    // });
  }

  openNewNoteMenu() {
    this._element.querySelector('.newnote-menu').classList.remove('hide');
  }

  closeNewNoteMenu() {
    this._element.querySelector('.newnote-menu').classList.add('hide');
  }

  pinNewNote() {
    this._element
      .querySelector('.newnote-pin-button')
      .classList.toggle('note-pinned');
  }
}
