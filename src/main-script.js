import { NoteListModel } from "./scripts/models/NoteListModel";
import { NoteItemModel } from "./scripts/models/NoteItemModel";
import { AppHeaderController } from "./scripts/controllers/AppHeaderController";
import { PageHeadersController } from "./scripts/controllers/PageHeadersController";
import { NewNoteController } from "./scripts/controllers/NewNoteController";
import { NoteItemController } from "./scripts/controllers/NoteItemController";
import { SearchPanelController } from "./scripts/controllers/SearchPanelController";
import { SidebarController} from "./scripts/controllers/SidebarController";

const APP_NAME = "Keep-Notes";
const SEVEN_DAYS_IN_MILLISECONDS = 604800000;
const MOBILE_SCREEN_SIZE = 900;

export const noteItemsList = new NoteListModel();
export const appHeaderController = new AppHeaderController();
export const pageHeadersController = new PageHeadersController();
export const newNoteController = new NewNoteController();
export const noteItemsController = new NoteItemController();
export const searchPanelController = new SearchPanelController();
export const sidebarController = new SidebarController();

// If window is smaller than 900px, change to Notes page
const changeToNotesOnMobile = new ResizeObserver((item) => {
  if (item[0].contentRect.width < MOBILE_SCREEN_SIZE) {
    pageHeadersController.changeToNotesPage();
  }
});
changeToNotesOnMobile.observe(document.body);

export const loadNotesFromLocalStorage = () => {
  const storedList = localStorage.getItem(APP_NAME);
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList._list.forEach((storedNote) => {
    noteItemsList.addNoteToList(new NoteItemModel(storedNote));
  });
  reloadNotes();
};

function createNewNoteItem(noteInfo) {
  const newNoteItem = new NoteItemModel(noteInfo);
  noteItemsList.addNoteToList(newNoteItem);
  updateNotesOnLocalStorage();
}

function reloadNotes() {
  noteItemsList.getList().filter((item) => {
    if (item.checkTimeToDelete()) {
      noteItemsList.removeNoteFromList(item.getId());
    } else {
      return item;
    }
  });
  sidebarController.changeToActiveSidebar();
}

function updateNotesOnLocalStorage() {
  localStorage.setItem(APP_NAME, JSON.stringify(noteItemsList));
  reloadNotes();
}
