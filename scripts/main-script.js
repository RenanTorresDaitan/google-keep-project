const APP_NAME = "Keep-Notes";
const SEVEN_DAYS_IN_MILLISECONDS = 604800000;

const noteItemsList = new NoteListModel();
const appHeaderController = new AppHeaderController();
const pageHeadersController = new PageHeadersController();
const newNoteController = new NewNoteController();
const noteItemsController = new NoteItemController();
const searchPanelController = new SearchPanelController();

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

// // Get side bar buttons
const notesSideBarBtn = document.querySelector("#sidebar-item-notes");
notesSideBarBtn.addEventListener("click", () =>
  pageHeadersController.changeToNotesPage()
);
const remindersSideBarBtn = document.querySelector("#sidebar-item-reminders");
remindersSideBarBtn.addEventListener("click", () => {
  pageHeadersController.changeToRemindersPage();
});
const archiveSideBarBtn = document.querySelector("#sidebar-item-archive");
archiveSideBarBtn.addEventListener("click", () => {
  pageHeadersController.changeToArchivePage();
});
const trashSideBarBtn = document.querySelector("#sidebar-item-trash");
trashSideBarBtn.addEventListener("click", () => {
  pageHeadersController.changeToTrashPage();
});

// Change active Sidebar Item
[
  notesSideBarBtn,
  remindersSideBarBtn,
  archiveSideBarBtn,
  trashSideBarBtn,
].forEach((item) => {
  item.addEventListener("click", (event) => {
    removeActiveFromSidebarItems();
    item.setAttribute("active", "");
  });
});

function removeActiveFromSidebarItems() {
  document.querySelector("[active]").removeAttribute("active");
}

// const appIcon = document.querySelector(".header-icon");
// const pageTitle = document.querySelector(".header-title");
// function changeAppHeader(activeSidebar) {
//   pageTitle.textContent = activeSidebar;
//   if (activeSidebar === "Keep") {
//     show(appIcon);
//     show(pageTitle);
//   } else {
//     hide(appIcon);
//   }
// }
