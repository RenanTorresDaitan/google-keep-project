import { deleteNote, toggleVisibility, updateNote } from "./main-script.js";

export default function buildNoteCard(item, notesArea) {
  // Create Note Card DOM Elements from item data
  const noteCard = createDOMElement("div", {
    class: "note-card",
    tabindex: "0",
    "aria-label": `Keep\'s Note ${item.getNote().noteTitle}`,
    "data-note-id": `${item.getId()}`,
  });
  const noteCardPinBtn = createDOMElement(
    "div",
    {
      role: "button",
      class: "note-card-pin-button icon-size",
      "aria-label": "Fix note",
      "data-tooltip-text": "Fix note",
      tabindex: "0",
    },
    createDOMElement("img", { src: "./resources/svg/pin.svg" })
  );
  const noteCardMenuBtn = createDOMElement(
    "div",
    {
      role: "button",
      class: "note-card-menu-button icon-size",
      "aria-label": "Menu",
      "data-tooltip-text": "Menu",
      tabindex: "0",
    },
    createDOMElement("img", {
      src: "./resources/svg/menu.svg",
    })
  );
  const noteCardTitle = createDOMElement(
    "div",
    { class: "note-card-title p-1rem-lr" },
    createDOMElement("div", {}, item.getNote().noteTitle)
  );
  const noteCardTitleTextArea = createDOMElement("textarea", {
    name: "note-title",
    class: "note-card-title",
    id: "title-textarea",
    rows: "1",
    maxlength: "999",
    placeholder: "Title",
    style: "height: 1rem; display: none",
  });
  const noteCardDescription = createDOMElement(
    "div",
    { class: "note-card-desc p-1rem-lr" },
    createDOMElement("div", {}, item.getNote().noteDescription)
  );
  const noteCardDescriptionTextArea = createDOMElement("textarea", {
    name: "note-description",
    class: "note-card-desc",
    id: "description-textarea",
    rows: "1",
    maxlength: "19999",
    placeholder: "Take a note...",
    style: "height: 1rem; display: none",
  });
  const noteDoneBtn = createDOMElement(
    "button",
    {
      class: "note-card-done-button [ m-0625rem-lr p-1rem-lr ]",
      style: "display: none;",
    },
    "Done"
  );
  const noteDeleteBtn = createDOMElement(
    "div",
    { role: "button", class: "menu-button hide" },
    "Delete note"
  );

  // Event Listeners
  noteCard.addEventListener("click", (event) => {
    noteDoneBtn.style.display = "";
    if (event.target == noteCardTitle.firstChild) {
      noteCardTitleTextArea.value = noteCardTitle.firstChild.textContent;
      toggleVisibility(noteCardTitleTextArea);
      toggleVisibility(noteCardTitle.firstChild);
      noteCardTitleTextArea.focus();
    }
    if (event.target == noteCardDescription.firstChild) {
      noteCardDescriptionTextArea.value =
        noteCardDescription.firstChild.textContent;
      toggleVisibility(noteCardDescriptionTextArea);
      toggleVisibility(noteCardDescription.firstChild);
      noteCardDescriptionTextArea.focus();
    }
    if (event.target == noteDoneBtn) {
      noteDoneBtn.style.display = "none";
      const updatedNote = {
        _id: noteCard.getAttribute("data-note-id"),
        _item: {
          noteTitle: noteCardTitle.textContent,
          noteDescription: noteCardDescription.textContent,
          noteTime: Date.now(),
        },
      };
      updateNote(updatedNote);
    }
    if (event.target == noteCardMenuBtn) {
      noteDeleteBtn.classList.toggle("hide");
    }
    if (event.target == noteDeleteBtn) {
      deleteNote(noteCard.getAttribute("data-note-id"));
    }
  });

  noteCard.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
      event.preventDefault();
      if (event.target == noteCardTitleTextArea) {
        toggleVisibility(noteCardTitleTextArea);
        toggleVisibility(noteCardTitle.firstChild);
      }
      if (event.target == noteCardDescriptionTextArea) {
        toggleVisibility(noteCardDescriptionTextArea);
        toggleVisibility(noteCardDescription.firstChild);
      }
    }
  });

  noteCard.addEventListener("input", (event) => {
    if (event.target == noteCardTitleTextArea) {
      noteCardTitle.firstChild.textContent = noteCardTitleTextArea.value;
    }
    if (event.target == noteCardDescriptionTextArea) {
      noteCardDescription.firstChild.textContent =
        noteCardDescriptionTextArea.value;
    }
  });

  // Append DOM Elements
  noteCardTitle.appendChild(noteCardTitleTextArea);
  noteCardDescription.appendChild(noteCardDescriptionTextArea);
  noteCardMenuBtn.appendChild(noteDeleteBtn);
  noteCard.append(
    noteCardMenuBtn,
    noteCardPinBtn,
    noteCardTitle,
    noteCardDescription,
    noteDoneBtn
  );
  notesArea.appendChild(noteCard);
  return noteCard;
}

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
