const searchIconBtn = document.querySelector("#search-icon-btn");
const cancelSearchBtn = document.querySelector("#search-cancel-btn");
const searchPanel = document.querySelector("#search-panel");

searchIconBtn.addEventListener("click", () => toggleVisibility(searchPanel));
cancelSearchBtn.addEventListener("click", () => toggleVisibility(searchPanel));

function toggleVisibility(domElement) {
  if (domElement.style.display == "none") {
    domElement.style.display = "";
    return;
  }
  domElement.style.display = "none";
}
const newNoteDiv = document.querySelector("#new-note-form");
const notesDiv = document.querySelector("#notes");
const NOTES_PREFIX = "KNotes:Note";

const takeNewNoteBtn = createDOMElement(
  "div",
  { role: "button", class: "button" },
  createDOMElement("span", { class: "plus" }, "+")
);
takeNewNoteBtn.appendChild(createDOMElement("div", {}, "Take a note..."));
takeNewNoteBtn.addEventListener("click", (event) => {
  event.target.parentNode.style.display = "none";
  createNewNote();
});

newNoteDiv.appendChild(takeNewNoteBtn);

function createNewNote() {
  newNoteDiv.style.height = "10rem";
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
      const noteKey = `${NOTES_PREFIX}${noteToSave.time}`;
      localStorage.setItem(noteKey, JSON.stringify(noteToSave));
      reloadNotes();
    }
    return;
  });
  [title, note, doneBtn].forEach((item) => newNoteForm.appendChild(item));
  newNoteDiv.appendChild(newNoteForm);
}

function reloadNotes() {
  notesDiv.innerHTML = "";
  Object.keys(localStorage)
    .sort((a, b) => b.slice(NOTES_PREFIX.length) - a.slice(NOTES_PREFIX.length))
    .forEach((key) => {
      if (key.startsWith(NOTES_PREFIX)) {
        const lsNote = JSON.parse(localStorage.getItem(key));
        notesDiv.append(createNoteCard(lsNote));
      }
    });
}

reloadNotes();

function createNoteCard(noteInfo) {
  const noteCard = createDOMElement("div", {
    class: "note-card",
    "data-time": noteInfo.time,
  });
  const noteTitle = createDOMElement(
    "label",
    { class: "note-title" },
    noteInfo.noteTitle
  );
  const noteDescription = createDOMElement(
    "p",
    { class: "note-desc" },
    noteInfo.noteDescription
  );
  const deleteCardBtn = createDOMElement(
    "button",
    { class: "delete-card-btn" },
    "X"
  );
  deleteCardBtn.addEventListener("click", (event) =>
    deleteNote(event.target.parentNode.attributes["data-time"].value)
  );
  [noteTitle, noteDescription, deleteCardBtn].forEach((item) =>
    noteCard.appendChild(item)
  );
  return noteCard;
}

function deleteNote(time) {
  localStorage.removeItem(NOTES_PREFIX + time);
  reloadNotes();
}

function createDOMElement(name, attrs, ...children) {
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
}
