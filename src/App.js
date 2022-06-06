import { NoteListModel } from './models/NoteListModel';
import { NoteItemModel } from './models/NoteItemModel';
import { AppHeaderView } from './views/AppHeaderView';
import { PageHeadersController } from './controllers/PageHeadersController';
import { NewNoteController } from './controllers/NewNoteController';
import { NoteItemController } from './controllers/NoteItemController';
import { SearchPanelView } from './views/SearchPanelView';
import { SidebarView } from './views/SidebarView';
import { PageHeadersView } from './views/PageHeadersView';

export class App {
  constructor() {
    this.APP_NAME = 'Keep-Notes';
    this.SEVEN_DAYS_IN_MILLISECONDS = 604800000;
    this.MOBILE_SCREEN_SIZE = 900;

    this.noteItemsList = new NoteListModel();
    this.newNoteController = new NewNoteController();
    this.searchPanelView = new SearchPanelView();
    this.appHeaderView = new AppHeaderView();
    this.pageHeadersView = new PageHeadersView();
    this.pageHeadersController = new PageHeadersController();
    this.noteItemsController = new NoteItemController();
    this.sidebarView = new SidebarView();

    this.changeToNotesOnMobile = new ResizeObserver((item) => {
      if (item[0].contentRect.width < this.MOBILE_SCREEN_SIZE) {
        this.pageHeadersController.changeToNotesPage();
      }
    });
    this.changeToNotesOnMobile.observe(document.body);
  }

  loadNotesFromLocalStorage() {
    const storedList = localStorage.getItem(this.APP_NAME);
    if (typeof storedList !== 'string') return;
    const parsedList = JSON.parse(storedList);
    parsedList._list.forEach((storedNote) => {
      this.noteItemsList.addNoteToList(new NoteItemModel(storedNote));
    });
    this.reloadNotes();
  }

  createNewNoteItem(noteInfo) {
    const newNoteItem = new NoteItemModel(noteInfo);
    this.noteItemsList.addNoteToList(newNoteItem);
    this.updateNotesOnLocalStorage();
  }

  reloadNotes() {
    this.noteItemsList.getList().forEach((item) => {
      if (item.checkTimeToDelete()) {
        this.noteItemsList.removeNoteFromList(item.getId());
      }
    });
    this.sidebarView.changeToActiveSidebar();
  }

  updateNotesOnLocalStorage() {
    localStorage.setItem(this.APP_NAME, JSON.stringify(this.noteItemsList));
    this.reloadNotes();
  }
}
