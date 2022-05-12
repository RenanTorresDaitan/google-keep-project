class ToDoItemContainer {
  constructor(noteItem) {
    this.noteItem = noteItem;
    this.checkedToDoItems = this.noteItem.getToDoItems().filter(item => item.isChecked).length;
  }
  _template() {
    return `
        <div class="note-to-do-items ${this.noteItem.isToDoList ? "" : "hide"}">
    ${this.noteItem.getToDoItems().reduce((uncheckedToDoItems, toDoItem) => {
        return uncheckedToDoItems +=  (toDoItem.isChecked ? '' : this.createToDoItem(toDoItem));
    }, "")}
          <div class="to-do-item-placeholder hide">
          <img class="svg-icon-large" src="./resources/svg/notecard/plus-icon.svg">
          <textarea class="to-do-item-textarea" placeholder="List item"></textarea>
        </div>
          <div class="completed-items-area ${this.noteItem.isToDoList ? "" : "hide"}">
            <div class="completed-items-separator"></div>
            <div class="completed-items-div">
              <div class="completed-items-btn rotate-90-cw"></div>
              <label class="completed-items-label">${this.checkedToDoItems > 1
                ? `${this.checkedToDoItems} Completed items`
                : '1 Completed item'}</label>
            </div>
            <div class="completed-items-list">
            ${this.noteItem.getToDoItems().reduce((checkedToDoitems, toDoItem) => {
                return checkedToDoitems +=  (toDoItem.isChecked ? this.createToDoItem(toDoItem) : '');
            }, "")}
            </div>
          </div>
        </div>`;
  }
  build() {
    return this._template();
  }
  createToDoItem(toDoItem) {
    return `
      <div class="to-do-item">
        <div class="to-do-item-checkbox" checked="${toDoItem.isChecked}"></div>
        <textarea class="to-do-item-textarea" placeholder="List item">${toDoItem.label}</textarea>
        <div class="newnote-to-do-item-delete" onclick=""></div>
      </div>
      `;
  }
}
