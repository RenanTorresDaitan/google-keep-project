const docBody = document.querySelector("body");
const takeNewNoteBtn = createDOMElement(
  "button",
  createDOMElement("span", { "background-color": "olive" })
);
docBody.appendChild(takeNewNoteBtn);

takeNewNoteBtn.textContent = "Take a note...";
takeNewNoteBtn.addEventListener("click", createNewNote);

function createNewNote() {
  const newNoteForm = document.createElement("form");
  const title = createDOMElement("input", {
    placeholder: "Title",
    class: "red",
  });
  const note = createDOMElement("input", { placeholder: "Take a note..." });
  const doneBtn = createDOMElement("button", { type: "button" });
  doneBtn.textContent = "Done";
  doneBtn.addEventListener("click", () => {
    const noteToSave = {
      noteTitle: title.value,
      noteDescription: note.value,
      time: Date.now(),
    };
    const noteKey = `PNotes:Note${noteToSave.time}`;
    localStorage.setItem(noteKey, JSON.stringify(noteToSave));
  });
  [title, note, doneBtn].forEach((item) => newNoteForm.appendChild(item));
  docBody.appendChild(newNoteForm);
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

for (const key in localStorage) {
  if (key.startsWith("PNotes:Note")) {
    const lsNote = JSON.parse(localStorage.getItem(key));
    const noteCard = createDOMElement("div", { class: "note-card" });
    const noteTitle = createDOMElement("label", { class: "note-title" }, lsNote.noteTitle);
    const noteDescription = createDOMElement("p", { class: "note-desc" }, lsNote.noteDescription);
    [noteTitle, noteDescription].forEach((item) => noteCard.appendChild(item));
    docBody.append(noteCard);
  }
}
