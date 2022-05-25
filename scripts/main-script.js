const APP_NAME = "Keep-Notes";
const SEVEN_DAYS_IN_MILLISECONDS = 604800000;
const MOBILE_SCREEN_SIZE = 900;

const noteItemsList = new NoteListModel();
const appHeaderController = new AppHeaderController();
const pageHeadersController = new PageHeadersController();
const newNoteController = new NewNoteController();
const noteItemsController = new NoteItemController();
const searchPanelController = new SearchPanelController();
const sidebarController = new SidebarController();

// If window is smaller than 900px, change to Notes page
const changeToNotesOnMobile = new ResizeObserver((item) => {
  if (item[0].contentRect.width < MOBILE_SCREEN_SIZE) {
    pageHeadersController.changeToNotesPage();
  }
});
changeToNotesOnMobile.observe(document.body);

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    loadNotesFromLocalStorage();
  }
});

const loadNotesFromLocalStorage = () => {
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
  const sortedList = noteItemsList.getList().filter((item) => {
    if (item.checkTimeToDelete()) {
      noteItemsList.removeNoteFromList(item.getId());
    } else {
      return item;
    }
  });
  pageHeadersController.changeToNotesPage();
}

function updateNotesOnLocalStorage() {
  localStorage.setItem(APP_NAME, JSON.stringify(noteItemsList));
  reloadNotes();
}
