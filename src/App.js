import { NoteListModel } from "./scripts/models/NoteListModel";
import { NoteItemModel } from "./scripts/models/NoteItemModel";
import { AppHeaderController } from "./scripts/controllers/AppHeaderController";
import { PageHeadersController } from "./scripts/controllers/PageHeadersController";
import { NewNoteController } from "./scripts/controllers/NewNoteController";
import { NoteItemController } from "./scripts/controllers/NoteItemController";
import { SearchPanelController } from "./scripts/controllers/SearchPanelController";
import { SidebarController} from "./scripts/controllers/SidebarController";

export class App {
  constructor() {
    this.APP_NAME = "Keep-Notes";
    this.SEVEN_DAYS_IN_MILLISECONDS = 604800000;
    this.MOBILE_SCREEN_SIZE = 900;
    
    this.pageHeadersController = new PageHeadersController();
    this.noteItemsList = new NoteListModel();
    this.newNoteController = new NewNoteController();
    this.noteItemsController = new NoteItemController();
    this.sidebarController = new SidebarController();
    this.appHeaderController = new AppHeaderController();
    this.searchPanelController = new SearchPanelController();
    
    this.changeToNotesOnMobile = new ResizeObserver((item) => {
      if (item[0].contentRect.width < this.MOBILE_SCREEN_SIZE) {
        this.pageHeadersController.changeToNotesPage();
      } 
    });
    this.changeToNotesOnMobile.observe(document.body);

  }
  loadNotesFromLocalStorage() {
    const storedList = localStorage.getItem(this.APP_NAME);
    if (typeof storedList !== "string") return;
    const parsedList = JSON.parse(storedList);
    parsedList._list.forEach((storedNote) => {
      noteItemsList.addNoteToList(new NoteItemModel(storedNote));
    });
    reloadNotes();
  };
  createNewNoteItem(noteInfo) {
   const newNoteItem = new NoteItemModel(noteInfo);
   this.noteItemsList.addNoteToList(newNoteItem);
   this.updateNotesOnLocalStorage();
  }
  
  reloadNotes() {
   this.noteItemsList.getList().filter((item) => {
     if (item.checkTimeToDelete()) {
       this.noteItemsList.removeNoteFromList(item.getId());
     } else {
       return item;
     }
   });
   this.sidebarController.changeToActiveSidebar();
  }
  
  updateNotesOnLocalStorage() {
   localStorage.setItem(APP_NAME, JSON.stringify(noteItemsList));
   this.reloadNotes();
  }
}


