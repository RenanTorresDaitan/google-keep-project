import lampIcon from '../resources/svg/lamp-icon.svg';
import bellIcon from '../resources/svg/bell-icon.svg';
import pencilIcon from '../resources/svg/pencil-icon.svg';
import boxIcon from '../resources/svg/box-icon.svg';
import trashIcon from '../resources/svg/trash-icon.svg';

export default class SidebarView {
  constructor() {
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
      .addEventListener('click', (event) => this.changeToNotesPage(event.target));
    element
      .querySelector('#sidebar-item-reminders')
      .addEventListener('click', (event) => this.changeToRemindersPage(event.target));
    element
      .querySelector('#sidebar-item-archive')
      .addEventListener('click', (event) => this.changeToArchivePage(event.target));
    element
      .querySelector('#sidebar-item-trash')
      .addEventListener('click', (event) => this.changeToTrashPage(event.target));
    return element;
  }

  removeActiveFromSidebarItems() {
    this._element.querySelector('[active]').removeAttribute('active');
  }

  changeToActiveSidebar() {
    this._element.querySelector('[active]').click();
  }

  changeToNotesPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute('active', '');
    new PageHeadersController().changeToNotesPage();
  }

  changeToRemindersPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute('active', '');
    new PageHeadersController().changeToRemindersPage();
  }

  changeToArchivePage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute('active', '');
    new PageHeadersController().changeToArchivePage();
  }

  changeToTrashPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute('active', '');
    new PageHeadersController().changeToTrashPage();
  }
}
