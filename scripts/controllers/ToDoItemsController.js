class ToDoItemsController {
  constructor(noteItem) {
      console.log(noteItem)
    this.toDoItems = noteItem.getToDoItems();
    this.noteItem = noteItem;
  }
  toggleChecked(id) {
    const item = noteItemsList.getNoteById(this.noteItem.getId()).getToDoItemById(id)
    const checked = item.isChecked;
    item.isChecked = !checked;
  }
  deleteToDoItem(item){
    item.parentNode.remove(item);
  }
  build() {
    return new ToDoItemContainer(this.toDoItems).build();
  }
}
