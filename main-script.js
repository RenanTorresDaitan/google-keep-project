const docBody = document.querySelector("body");
const newNoteDiv = document.querySelector("#new-note-form");
const notesDiv = document.querySelector("#notes");
const NOTES_PREFIX = "PNotes:Note";

const takeNewNoteBtn = createDOMElement(
  "div",
  { class: "button visible" },
  createDOMElement("span", {}, "Take a note...")
);
newNoteDiv.appendChild(takeNewNoteBtn);

takeNewNoteBtn.addEventListener("click", createNewNote);

function createNewNote() {
  takeNewNoteBtn.classList.toggle("visible");
  const newNoteForm = createDOMElement("form", { visibility: "hidden" });
  const title = createDOMElement("input", { placeholder: "Title" });
  const note = createDOMElement("input", { placeholder: "Take a note..." });
  const doneBtn = createDOMElement("button", { type: "button" }, "Done");
  doneBtn.addEventListener("click", () => {
    if (!title.value && !note.value) return;
    const noteToSave = {
      noteTitle: title.value,
      noteDescription: note.value,
      time: Date.now(),
    };
    const noteKey = `${NOTES_PREFIX}${noteToSave.time}`;
    localStorage.setItem(noteKey, JSON.stringify(noteToSave));
    reloadNotes();

    takeNewNoteBtn.classList.toggle("visible");
    newNoteForm.classList.toggle("visible");
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
