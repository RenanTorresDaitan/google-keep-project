class PageHeadersController {
  constructor() {
    this.pageHeadersView = new PageHeadersView(
      document.querySelector(".content")
    );
  }
  update(list){
    this.pageHeadersView.update("NOTES",list);
  }
  changeToNotesPage() {
    const notesList = noteItemsList
      .getList()
      .filter((item) => !item.isArchived && !item.isTrashed);
    this.pageHeadersView.update("NOTES", notesList);
  }
}
