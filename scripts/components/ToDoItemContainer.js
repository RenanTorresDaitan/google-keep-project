class ToDoItemContainer {
  constructor(noteItem) {
    this._element = document.createElement("div");
    this._element.setAttribute("class", "note-to-do-items");
    this.noteItem = noteItem;
    this.toDoItems = noteItem.getToDoItems();
    this.uncheckedItems = [];
    this.checkedItems = [];

    this.update();
  }
  _template() {
    return `
          ${this.uncheckedItems
            .map((item) => this.createToDoItem(this.noteItem.id,item))
            .join("")}
          <div class="to-do-item-placeholder ${this.toDoItems.length == 0 ? "" : "hide"}">
          <img class="svg-icon-large" src="./resources/svg/notecard/plus-icon.svg">
          <textarea class="to-do-item-textarea" placeholder="List item" onkeydown="noteItemsController.createNewToDoItem(${this.noteItem.id})"></textarea>
          </div>
          <div class="completed-items-area ${this.checkedItems.length > 0 ? "" : "hide"}">
          <div class="completed-items-separator"></div>
            <div class="completed-items-div" onclick="noteItemsController.toggleCompletedItems(${this.noteItem.id})">
              <div class="completed-items-btn rotate-90-cw"></div>
              <label class="completed-items-label">${
                this.checkedItems.length > 1
                  ? `${this.checkedItems.length} Completed items`
                  : "1 Completed item"
              }</label>
            </div>
              <div class="completed-items-list">
                ${this.checkedItems
                  .map((item) => this.createToDoItem(this.noteItem.id,item))
                  .join("")}
              </div>
        </div>`;
  }
  build() {
    return this._element.outerHTML;
  }
  update() {
    this.uncheckedItems = [];
    this.checkedItems = [];
    this.toDoItems.forEach((item) => {
      if (!item.isChecked) this.uncheckedItems.push(item);
      else this.checkedItems.push(item);
    });
    this._element.innerHTML = this._template();
  }
  static createToDoItem(noteId,toDoItem) {
    return `
      <div class="to-do-item" data-item-id="${toDoItem.id}">
        <div class="to-do-item-checkbox" checked="${toDoItem.isChecked}" onclick="noteItemsController.toggleChecked(${noteId},${toDoItem.id})"></div>
        <label class="to-do-item-label" onclick="noteItemsController.changeToDoItemLabel(${noteId},${toDoItem.id})">${toDoItem.label}</label>
        <textarea class="to-do-item-textarea hide" placeholder="List item">${toDoItem.label}</textarea>
        <div class="to-do-item-delete" onclick="noteItemsController.deleteToDoItem(${noteId},${toDoItem.id})"></div>
      </div>
      `;
  }
}
