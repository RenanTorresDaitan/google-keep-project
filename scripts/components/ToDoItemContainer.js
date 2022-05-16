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
            .map((item) => this.createToDoItem(item))
            .join("")}
          <div class="to-do-item-placeholder hide">
          <img class="svg-icon-large" src="./resources/svg/notecard/plus-icon.svg">
          <textarea class="to-do-item-textarea" placeholder="List item"></textarea>
          </div>
          <div class="completed-items-area ${this.toDoItems.length > 1 ? "" : "hide"}">
          <div class="completed-items-separator"></div>
            <div class="completed-items-div">
              <div class="completed-items-btn rotate-90-cw"></div>
              <label class="completed-items-label">${
                this.checkedItems.length > 1
                  ? `${this.checkedItems.length} Completed items`
                  : "1 Completed item"
              }</label>
            </div>
              <div class="completed-items-list">
                ${this.checkedItems
                  .map((item) => this.createToDoItem(item))
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
  createToDoItem(toDoItem) {
    return `
      <div class="to-do-item">
        <div class="to-do-item-checkbox" checked="${toDoItem.isChecked}" data-id="${toDoItem.id}" onclick="noteItemsController.toggleChecked(${this.noteItem.id},${toDoItem.id})"></div>
        <label class="to-do-item-label">${toDoItem.label}</label>
        <textarea class="to-do-item-textarea hide" placeholder="List item"></textarea>
        <div class="to-do-item-delete" onclick="noteItemsController.deleteToDoItem(${this.noteItem.id},${toDoItem.id})">X</div>
      </div>
      `;
  }
}
