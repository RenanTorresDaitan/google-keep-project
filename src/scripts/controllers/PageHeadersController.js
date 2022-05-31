import { PageHeadersView } from "../views/PageHeadersView";
import { app } from "../../index";

export class PageHeadersController {
  constructor() {
    this.pageHeadersView = new PageHeadersView(
      document.querySelector(".content")
    );
  }
  showSearchedNotes(searchTerm) {
    const searchList = this.sortList().filter((item) => {
      if (
        item.noteTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noteDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.toDoItems
          .map((item) => item.label.toLowerCase())
          .join(" ")
          .includes(searchTerm)
      ) {
        return item;
      }
    });
    this.pageHeadersView.update("NOTES", searchList);
  }
  sortList() {
    const sortedList = app.noteItemsList.getList();
    if (sortedList.length) {
      sortedList
        .sort((a, b) => b.getTime() - a.getTime())
        .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
    }
    return sortedList;
  }
  changeToNotesPage() {
    const notesList = this.sortList().filter(
      (item) => !item.isArchived && !item.isTrashed
    );
    this.pageHeadersView.update("NOTES", notesList);
    app.appHeaderController.changeAppHeader("Keep", true);
  }
  changeToRemindersPage() {
    const notesList = this.sortList().filter(
      (item) => item.isReminder && !item.isTrashed
    );
    this.pageHeadersView.update("REMINDERS", notesList);
    appHeaderController.changeAppHeader("Reminders", false);
  }
  changeToArchivePage() {
    const notesList = this.sortList().filter(
      (item) => item.isArchived && !item.isTrashed
    );
    this.pageHeadersView.update("ARCHIVED", notesList);
    appHeaderController.changeAppHeader("Archive", false);
  }
  changeToTrashPage() {
    const notesList = this.sortList().filter((item) => item.isTrashed);
    this.pageHeadersView.update("TRASH", notesList);
    appHeaderController.changeAppHeader("Trash", false);
  }
}
