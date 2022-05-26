import { SidebarView } from "../views/SidebarView";
import { pageHeadersController } from "../../main-script";

export class SidebarController {
  constructor() {
    this.sidebarView = new SidebarView();
  }
  removeActiveFromSidebarItems() {
    document.querySelector("[active]").removeAttribute("active");
  }
  changeToActiveSidebar() {
    document.querySelector("[active]").click();
  }
  changeToNotesPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "");
    pageHeadersController.changeToNotesPage();
  }
  changeToRemindersPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "");
    pageHeadersController.changeToRemindersPage();
  }
  changeToArchivePage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "");
    pageHeadersController.changeToArchivePage();
  }
  changeToTrashPage(sidebar) {
    this.removeActiveFromSidebarItems();
    sidebar.setAttribute("active", "");
    pageHeadersController.changeToTrashPage();
  }
}