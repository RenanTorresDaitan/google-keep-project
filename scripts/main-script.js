import NoteList from "./note-list.js";
import NoteItem from "./note-item.js";


// Search Notes functionality:
const searchIconBtn = document.querySelector("#search-icon-btn");
const cancelSearchBtn = document.querySelector("#search-cancel-btn");
const searchPanel = document.querySelector("#search-panel");
searchIconBtn.addEventListener("click", () => toggleVisibility(searchPanel));
cancelSearchBtn.addEventListener("click", () => toggleVisibility(searchPanel));

const newNoteDiv = document.querySelector("#new-note-div");
const notesDiv = document.querySelector("#notes-area");
const APP_NAME = "Keep-Notes";
const notesList = new NoteList();

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    initializeApp();
  }
});

const initializeApp = () => {
  loadNotesFromLocalStorage();
  reloadNotes();
};

const loadNotesFromLocalStorage = () => {
  const storedList = localStorage.getItem(APP_NAME);
  if (typeof storedList !== "string") return;
  const parsedList = JSON.parse(storedList);
  parsedList.forEach((item) => {
    const newItem = createNoteItemObject(
      item._item.noteTitle,
      item._item.noteDescription,
      item._item.noteTime
    );
    notesList.addNoteToList(newItem);
  });
};

function reloadNotes() {
  deleteContents(notesDiv);
  renderNotes();
}



const createNoteItemObject = (noteTitle, noteDescription, noteTime) => {
  const note = new NoteItem();
  note.setId(noteTime);
  note.setNote({ noteTitle, noteDescription, noteTime });
  return note;
};

const buildNoteCard = (item) => {
  // Create Note Card DOM Elements from item data
  const noteCard = createDOMElement("div", {
    class: "note-card",
    tabindex: "0",
    "aria-label": `Keep\'s Note ${item.getNote().noteTitle}`,
  });
  const noteCardPinBtn = createDOMElement("div", {
    role: "button",
    class: "note-card-pin-button icon-size",
    "aria-label": "Fix note",
    "data-tooltip-text": "Fix note",
    tabindex: "0",
  }, createDOMElement("img", {src: "./resources/svg/pin.svg"}));
  const noteCardMenuBtn = createDOMElement("div", {
    role: "button",
    class: "note-card-menu-button icon-size",
    "aria-label": "Menu",
    "data-tooltip-text": "Menu",
    tabindex: "0",
  }, createDOMElement("img", {src: "./resources/svg/menu.svg"}));
  const noteCardTitle = createDOMElement(
    "div",
    { class: "note-card-title" },
    createDOMElement("div", {}, item.getNote().noteTitle)
  );
  const noteCardTitleTextArea = createDOMElement("textarea", {
    name: "note-title",
    id: "title-textarea",
    rows: "1",
    maxlength: "999",
    placeholder: "Title",
    style: "height: 17px; display: none",
  });
  const noteCardDescription = createDOMElement(
    "div",
    { class: "note-card-desc" },
    createDOMElement("div", {}, item.getNote().noteDescription)
  );
  const noteCardDescriptionTextArea = createDOMElement("textarea", {
    name: "note-description",
    id: "description-textarea",
    rows: "1",
    maxlength: "19999",
    placeholder: "Take a note...",
    style: "height: 16px; display: none",
  });
  // Append DOM Elements
  noteCardTitle.appendChild(noteCardTitleTextArea);
  noteCardDescription.appendChild(noteCardDescriptionTextArea);
  noteCard.append(
    noteCardMenuBtn,
    noteCardPinBtn,
    noteCardTitle,
    noteCardDescription
  );
  notesDiv.appendChild(noteCard);
};

const takeNewNoteBtn = document.querySelector("#new-note-button");
takeNewNoteBtn.addEventListener("click", createNewNote);

function createNewNote() {
  const newNoteForm = createDOMElement("div", { class: "note-card" });
  const title = createDOMElement("textarea", {
    class: "note-card-title",
    placeholder: "Title",
  });
  const note = createDOMElement("textarea", {
    class: "note-card-desc",
    placeholder: "Take a note...",
  });
  const doneBtn = createDOMElement(
    "button",
    { class: "button", type: "button" },
    "Done"
  );
  doneBtn.addEventListener("click", (event) => {
    newNoteForm.style.display = "none";
    newNoteDiv.style.height = "3rem";
    takeNewNoteBtn.style.display = "flex";

    if (!title.value && !note.value) {
      const noteToSave = {
        noteTitle: title.value,
        noteDescription: note.value,
        time: Date.now(),
      };
      const noteKey = `${APP_NAME}${noteToSave.time}`;
      localStorage.setItem(noteKey, JSON.stringify(noteToSave));
      reloadNotes();
    }
    return;
  });
  [title, note, doneBtn].forEach((item) => newNoteForm.appendChild(item));
  newNoteDiv.appendChild(newNoteForm);
}

// Helper functions
const renderNotes = () => {
  notesList.getList().forEach((item) => buildNoteCard(item));
};
const toggleVisibility = (domElement) => {
  if (domElement.style.display == "none") {
    domElement.style.display = "";
    return;
  }
  domElement.style.display = "none";
};
const deleteContents = (parentElement) => {
  let child = parentElement.lastElementChild;
  while (child) {
    parentElement.removeChild(child);
    child = parentElement.lastElementChild;
  }
};
const createDOMElement = (name, attrs, ...children) => {
  const dom = document.createElement(name);
  if (attrs) {
    for (let attr of Object.keys(attrs)) {
      dom.setAttribute(attr, attrs[attr]);
    }
  }
  if (children) {
    for (let child of children) {
      if (typeof child != "string") dom.appendChild(child);
      else dom.appendChild(document.createTextNode(child));
    }
  }
  return dom;
};
