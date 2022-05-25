class SidebarView {
  constructor() {
    this._element = document.querySelector(".sidebar-container");
    this._element.innerHTML = this._template();
  }
  _template() {
    return `
      <nav class="sidebar">
        <div class="sidebar-item" id="sidebar-item-notes" active onclick="sidebarController.changeToNotesPage(this)">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="./resources/svg/lamp-icon.svg">
            <span class="sidebar-item-label">Notes</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-reminders" onclick="sidebarController.changeToRemindersPage(this)">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="./resources/svg/bell-icon.svg">
            <span class="sidebar-item-label">Reminders</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-edit-labels">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="./resources/svg/pencil-icon.svg">
            <span class="sidebar-item-label">Edit labels</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-archive" onclick="sidebarController.changeToArchivePage(this)">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="./resources/svg/box-icon.svg">
            <span class="sidebar-item-label">Archive</span>
          </div>
        </div>
        <div class="sidebar-item" id="sidebar-item-trash" onclick="sidebarController.changeToTrashPage(this)">
          <div class="sidebar-item-icon">
            <img class="svg-icon-large" src="./resources/svg/trash-icon.svg">
            <span class="sidebar-item-label">Trash</span>
          </div>
        </div>
      </nav>
  `;
  }
}
