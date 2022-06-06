import { app } from '../index';

export class PageHeadersController {
  showSearchedNotes (searchTerm) {
    const searchList = this.sortList().filter((item) => {
      return (item.noteTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.noteDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.toDoItems
          .map((item) => item.label.toLowerCase())
          .join(' ')
          .includes(searchTerm));
    });
    app.pageHeadersView.update('NOTES', searchList);
  }

  sortList () {
    const sortedList = app.noteItemsList.getList();
    if (sortedList.length) {
      sortedList
        .sort((a, b) => b.getTime() - a.getTime())
        .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
    }
    return sortedList;
  }

  changeToNotesPage () {
    const notesList = this.sortList().filter(
      (item) => !item.isArchived && !item.isTrashed
    );
    app.pageHeadersView.update('NOTES', notesList);
    app.appHeaderView.changeAppHeader('Keep', true);
  }

  changeToRemindersPage () {
    const notesList = this.sortList().filter(
      (item) => item.isReminder && !item.isTrashed
    );
    app.pageHeadersView.update('REMINDERS', notesList);
    app.appHeaderView.changeAppHeader('Reminders', false);
  }

  changeToArchivePage () {
    const notesList = this.sortList().filter(
      (item) => item.isArchived && !item.isTrashed
    );
    app.pageHeadersView.update('ARCHIVED', notesList);
    app.appHeaderView.changeAppHeader('Archive', false);
  }

  changeToTrashPage () {
    const notesList = this.sortList().filter((item) => item.isTrashed);
    app.pageHeadersView.update('TRASH', notesList);
    app.appHeaderView.changeAppHeader('Trash', false);
  }
}
