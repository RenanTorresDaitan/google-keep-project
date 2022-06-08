import lampIcon from '../resources/svg/lamp-icon.svg';
import bellIcon from '../resources/svg/bell-icon.svg';
import pencilIcon from '../resources/svg/pencil-icon.svg';
import boxIcon from '../resources/svg/box-icon.svg';
import trashIcon from '../resources/svg/trash-icon.svg';

export default class SidebarView {
  constructor(controller) {
    this.pageHeadersController = controller;
    this._element = this._template();
  }

  _template() {
    const element = document.querySelector('.sidebar-container');
    element.innerHTML = `
      <nav class="sidebar">
        <div class="sidebar-item" id="sidebar-item-notes" active ">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="${lampIcon}">
            <span class="sidebar-item-label">Notes</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-reminders" ">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="${bellIcon}">
            <span class="sidebar-item-label">Reminders</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-edit-labels">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="${pencilIcon}">
            <span class="sidebar-item-label">Edit labels</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-archive" ">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="${boxIcon}">
            <span class="sidebar-item-label">Archive</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-trash" ">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="${trashIcon}">
            <span class="sidebar-item-label">Trash</span>
          </div>
        </div>
      </nav>
  `;
    element
      .querySelector('#sidebar-item-notes')
      .addEventListener('click', () => this.pageHeadersController.changeToNotesPage());
    element
      .querySelector('#sidebar-item-reminders')
      .addEventListener('click', () => this.pageHeadersController.changeToRemindersPage());
    element
      .querySelector('#sidebar-item-archive')
      .addEventListener('click', () => this.pageHeadersController.changeToArchivePage());
    element
      .querySelector('#sidebar-item-trash')
      .addEventListener('click', () => this.pageHeadersController.changeToTrashPage());
    return element;
  }

  removeActiveFromSidebarItems() {
    this._element.querySelector('[active]').removeAttribute('active');
  }

  changeToActiveSidebar() {
    this._element.querySelector('[active]').click();
  }

  changeToNotesPage() {
    this.removeActiveFromSidebarItems();
    this._element.querySelector('#sidebar-item-notes').setAttribute('active', '');
  }

  changeToRemindersPage() {
    this.removeActiveFromSidebarItems();
    this._element.querySelector('#sidebar-item-reminders').setAttribute('active', '');
  }

  changeToArchivePage() {
    this.removeActiveFromSidebarItems();
    this._element.querySelector('#sidebar-item-archive').setAttribute('active', '');
  }

  changeToTrashPage() {
    this.removeActiveFromSidebarItems();
    this._element.querySelector('#sidebar-item-trash').setAttribute('active', '');
  }
}
