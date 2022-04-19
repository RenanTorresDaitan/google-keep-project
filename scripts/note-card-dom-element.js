import {
  deleteNote,
  pinNote,
  toggleVisibility,
  updateNote,
} from "./main-script.js";

export default function buildNoteCard(item, notesArea) {
  // Create Note Card DOM Elements from item data
  const noteCard = createDOMElement("div", {
    class: "note-card",
    tabindex: "0",
    "aria-label": `Keep\'s Note ${item.getTitle()}`,
    "data-note-id": `${item.getId()}`,
    "data-color": `${item.color}`,
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
  const noteCardColorBtn = createDOMElement(
    "div",
    {
      role: "button",
      class: "note-card-color-button icon-size",
      "aria-label": "Change Note Color",
      "data-tooltip-text": "Change Note Color",
      tabindex: "0",
    },
    createDOMElement("img", {
      src: "./resources/svg/drop.svg",
    })
  );
  const noteCardTitle = createDOMElement(
    "div",
    { class: "note-card-title p-1rem-lr" },
    createDOMElement("div", {}, item.getTitle())
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
    createDOMElement("div", {}, item.getDescription())
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
      class: "note-card-done-button [ m-0625rem-lr p-05rem ]",
      style: "display: none; user-select: none;",
    },
    "Done"
  );
  const noteDeleteBtn = createDOMElement(
    "div",
    { role: "button", class: "menu-button hide" },
    "Delete note"
  );
  // Note Coloring
  const colors = [
    "red",
    "orange",
    "yellow",
    "greenyellow",
    "blue",
    "violet",
    "white",
  ];
  const noteColorBtns = createDOMElement("div", {
    class: "color-ball-container hide",
  });
  colors.forEach((color) => {
    const colorBall = createDOMElement("span", {
      role: "button",
      class: "color-ball",
    });
    colorBall.style.backgroundColor = color;
    colorBall.addEventListener("click", () => {
      noteCard.setAttribute("data-color", color);
    });
    noteColorBtns.append(colorBall);
  });
  // To Dos handling
  const createToDoitem = (toDoItem) => {
    const toDoItemEl = createDOMElement("div", { class: "to-do-item" });
    const checkbox = createDOMElement("input", { type: "checkbox" });
    const label = createDOMElement(
      "span",
      { class: "to-do-item-label" },
      `${toDoItem}`
    );
    const textArea = createDOMElement("textarea", {
      class: "to-do-item-textarea",
      style: "display:none",
    });
    toDoItemEl.append(checkbox, label, textArea);
    toDoItemEl.addEventListener("click", (event) => {
      if (event.target == label) {
        toggleVisibility(label);
        toggleVisibility(textArea);
        textArea.focus();
      }
    });
    toDoItemEl.addEventListener("input", (event) => {
      if (event.inputType == "insertLineBreak") {
        event.preventDefault();
        toggleVisibility(label);
        toggleVisibility(textArea);
        textArea.blur();
      }
      label.textContent = textArea.value;
    });
    return toDoItemEl;
  };
  const toDoItems = item.getToDoItems();
  toDoItems.forEach((toDoItem) => {
    noteCardDescription.appendChild(createToDoitem(toDoItem));
  });
  noteCardPinBtn.classList.toggle("note-card-button-active", item.isPinned);

  // Event Listeners
  noteCard.addEventListener("click", (event) => {
    noteDoneBtn.style.display = "";
    if (
      event.target == noteCardTitle.firstChild ||
      event.target == noteCardTitle
    ) {
      noteCardTitleTextArea.value = noteCardTitle.firstChild.textContent;
      toggleVisibility(noteCardTitleTextArea);
      toggleVisibility(noteCardTitle.firstChild);
      noteCardTitleTextArea.focus();
    }
    if (
      event.target == noteCardDescription.firstChild ||
      (event.target == noteCardDescription && !item.isToDoList)
    ) {
      noteCardDescriptionTextArea.value =
        noteCardDescription.firstChild.textContent;
      toggleVisibility(noteCardDescriptionTextArea);
      toggleVisibility(noteCardDescription.firstChild);
      noteCardDescriptionTextArea.focus();
    }
    if (event.target == noteDoneBtn) {
      noteDoneBtn.style.display = "none";
      const toDoItems = [];
      const noteDescription = item.isToDoList
        ? ""
        : noteCardDescription.textContent;
      noteCardDescription
        .querySelectorAll(".to-do-item-label")
        .forEach((item) => toDoItems.push(item.textContent));
      const updatedNote = {
        _id: Number(noteCard.getAttribute("data-note-id")),
        noteTitle: noteCardTitle.textContent,
        noteDescription: noteDescription,
        noteTime: Date.now(),
        toDoItems: toDoItems,
        color: noteCard.getAttribute("data-color"),
      };
      updateNote(updatedNote);
    }
    if (event.target == noteCardMenuBtn) {
      noteDeleteBtn.classList.toggle("hide");
    }
    if (event.target == noteCardColorBtn) {
      noteColorBtns.classList.toggle("hide");
    }
    if (event.target == noteCardPinBtn) {
      pinNote(noteCard.getAttribute("data-note-id"));
    }
    if (event.target == noteDeleteBtn) {
      deleteNote(noteCard.getAttribute("data-note-id"));
      noteDeleteBtn.classList.toggle("hide");
    }
  });

  noteCard.addEventListener("input", (event) => {
    if (event.target == noteCardTitleTextArea) {
      noteCardTitle.firstChild.textContent = noteCardTitleTextArea.value;
    }
    if (event.target == noteCardDescriptionTextArea && !item.isToDoList) {
      noteCardDescription.firstChild.textContent =
        noteCardDescriptionTextArea.value;
    }
  });

  // Append DOM Elements
  noteCardTitle.appendChild(noteCardTitleTextArea);
  if (!item.isToDoList)
    noteCardDescription.appendChild(noteCardDescriptionTextArea);
  noteCardMenuBtn.appendChild(noteDeleteBtn);
  noteCardColorBtn.appendChild(noteColorBtns);
  noteCard.append(
    noteCardColorBtn,
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
  const domEl = document.createElement(name);
  if (attrs) {
    for (let attr of Object.keys(attrs)) {
      domEl.setAttribute(attr, attrs[attr]);
    }
  }
  if (children) {
    for (let child of children) {
      if (typeof child != "string") domEl.appendChild(child);
      else domEl.appendChild(document.createTextNode(child));
    }
  }
  return domEl;
};
