class SidebarController {
  constructor() {
    this.sidebarView = new SidebarView();
  }
  removeActiveFromSidebarItems() {
    document.querySelector("[active]").removeAttribute("active");
  }
  changeToNotesPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "" );
    pageHeadersController.changeToNotesPage();
  }
  changeToRemindersPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "" );
    pageHeadersController.changeToRemindersPage();
  }
  changeToArchivePage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "" );
    pageHeadersController.changeToArchivePage();
  }
  changeToTrashPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "" );
    pageHeadersController.changeToTrashPage();
  }
}