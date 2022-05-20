class PageHeadersController {
    constructor(noteItemsList) {
        this.noteItemsList = noteItemsList;
        this.pageHeadersView = new PageHeadersView(document.querySelector(".content"));
    }
    changeToNotesPage(){
        this.pageHeadersView.noteListView.update(this.noteItemsList.getList().filter(item => (!item.isArchived && !item.isTrashed)));
        this.pageHeadersView.update("NOTES");
    }
}