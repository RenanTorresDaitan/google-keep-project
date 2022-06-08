import PageHeadersView from '../views/PageHeadersView';
import NoteItemController from './NoteItemController';
import AppHeaderView from '../views/AppHeaderView';
import SidebarView from '../views/SidebarView';

export default class PageHeadersController {
  constructor(db) {
    this.dbManager = db;
    this.appHeaderView = new AppHeaderView(this);
    this.sidebarView = new SidebarView(this);
    this.noteItemController = new NoteItemController(this.dbManager, this.sidebarView);
    this.pageHeadersView = new PageHeadersView(this.noteItemController);
  }

  showSearchedNotes(searchTerm) {
    const searchList = this.sortList().filter(
      (item) =>
        item.noteTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noteDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.toDoItems
          .map((toDoItem) => toDoItem.label.toLowerCase())
          .join(' ')
          .includes(searchTerm)
    );
    this.pageHeadersView.update('NOTES', searchList);
  }

  sortList() {
    const sortedList = this.dbManager.noteItemsList.getList();
    if (sortedList.length) {
      sortedList
        .sort((a, b) => b.getTime() - a.getTime())
        .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
    }
    return sortedList;
  }

  changeToNotesPage() {
    const notesList = this.sortList().filter((item) => !item.isArchived && !item.isTrashed);
    this.sidebarView.changeToNotesPage();
    this.pageHeadersView.update('NOTES', notesList);
    this.appHeaderView.changeAppHeader('Keep', true);
  }

  changeToRemindersPage() {
    const notesList = this.sortList().filter((item) => item.isReminder && !item.isTrashed);
    this.sidebarView.changeToRemindersPage();
    this.pageHeadersView.update('REMINDERS', notesList);
    this.appHeaderView.changeAppHeader('Reminders', false);
  }

  changeToArchivePage() {
    const notesList = this.sortList().filter((item) => item.isArchived && !item.isTrashed);
    this.sidebarView.changeToArchivePage();
    this.pageHeadersView.update('ARCHIVED', notesList);
    this.appHeaderView.changeAppHeader('Archive', false);
  }

  changeToTrashPage() {
    const notesList = this.sortList().filter((item) => item.isTrashed);
    this.sidebarView.changeToTrashPage();
    this.pageHeadersView.update('TRASH', notesList);
    this.appHeaderView.changeAppHeader('Trash', false);
  }
}
