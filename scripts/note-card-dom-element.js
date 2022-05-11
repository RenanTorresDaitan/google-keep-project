import { deleteNote, pinNote, updateNote } from "./main-script.js";

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
  const noteCardTitle = createDOMElement("div", {
    class: "note-card-title p-1rem-lr",
  });
  const noteCardTitleLabel = createDOMElement("label", {}, item.getTitle());
  const noteCardTitleTextArea = createDOMElement("textarea", {
    name: "note-title",
    class: "note-card-title",
    id: "title-textarea",
    rows: "1",
    maxlength: "999",
    placeholder: "Title",
    style: "height: 1rem; display: none",
  });
  const noteCardDescription = createDOMElement("div", {
    class: "note-card-desc p-1rem-lr",
  });
  const noteCardDescriptionLabel = createDOMElement(
    "label",
    {},
    item.getDescription()
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
  const noteCardToDoItemPlaceHolder = createDOMElement(
    "div",
    { id: "to-do-item-placeholder", style: "display:none" },
    createDOMElement("img", {
      class: "icon-size",
      src: "./resources/svg/plus.svg",
    })
  );
  const noteCardToDoItemPlaceHolderTextArea = createDOMElement("textarea", {
    class: "to-do-item-textarea",
    placeholder: "List item",
  });
  noteCardToDoItemPlaceHolderTextArea.addEventListener("click", () => {
    const newToDoItem = createToDoitem({ label: "", isChecked: false });
    noteCardDescription.insertBefore(newToDoItem, noteCardToDoItemPlaceHolder);
    noteCardToDoItemPlaceHolderTextArea.blur();
    newToDoItem.querySelector(".to-do-item-label").click();
  });
  noteCardToDoItemPlaceHolder.append(noteCardToDoItemPlaceHolderTextArea);
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
    "green",
    "teal",
    "blue",
    "darkblue",
    "purple",
    "pink",
    "brown",
    "gray",
    "default",
  ];
  const noteColorBtns = createDOMElement("div", {
    class: "color-ball-container hide",
  });
  colors.forEach((color) => {
    const colorBall = createDOMElement("span", {
      role: "button",
      class: "color-ball",
      "data-color": color,
    });
    colorBall.addEventListener("click", () => {
      noteCard.setAttribute("data-color", color);
    });
    noteColorBtns.append(colorBall);
  });
  // Completed to-do-items handling
  const toDoItems = item.getToDoItems();
  const completedToDoItemsArea = createDOMElement("div", {
    class: "completed-items-area",
    style: "display:none;",
  });
  const completedToDoItemsLabel = createDOMElement("label", {
    class: "completed-items-label",
  });
  const completedToDoItemsShowBtn = createDOMElement("div", {
    class: "completed-items-btn rotate-90-cw",
  });
  const completedToDoItemsDiv = createDOMElement("div", {
    class: "completed-to-do-items-div",
  });
  completedToDoItemsDiv.addEventListener("click", (event) => {
    event.stopPropagation();
    completedTodoItemsList.classList.toggle("hide");
    completedToDoItemsShowBtn.classList.toggle("rotate-90-cw");
  });
  completedToDoItemsDiv.append(
    completedToDoItemsShowBtn,
    completedToDoItemsLabel
  );
  const completedTodoItemsList = createDOMElement("div", {
    class: "completed-items-list",
  });
  const checkedToDoItems = toDoItems.filter((item) => item.isChecked);
  completedToDoItemsLabel.textContent =
    checkedToDoItems.length > 1
      ? `${checkedToDoItems.length} Completed items`
      : "1 Completed item";
  if (checkedToDoItems.length > 0) {
    show(completedToDoItemsArea);
  }
  // To Dos handling
  const createToDoitem = (toDoItem) => {
    const toDoItemEl = createDOMElement("div", { class: "to-do-item" });
    const checkbox = createDOMElement("div", {
      role: "checkbox",
      class: "to-do-item-checkbox",
      tabindex: 0,
    });
    checkbox.classList.toggle(
      "to-do-item-checkbox-checked",
      toDoItem.isChecked
    );
    const label = createDOMElement(
      "label",
      { class: "to-do-item-label" },
      `${toDoItem.label}`
    );
    const textArea = createDOMElement("textarea", {
      class: "to-do-item-textarea",
      style: "display:none",
    });
    const deleteItemBtn = createDOMElement(
      "span",
      { role: "button", class: "to-do-item-delete" },
      "X"
    );
    toDoItemEl.addEventListener("click", (event) => {
      if (event.target == label) {
        textArea.textContent = label.textContent;
        hide(label);
        show(textArea);
        textArea.focus();
      }
      if (event.target == deleteItemBtn) {
        deleteItemBtn.parentNode.parentNode.removeChild(
          deleteItemBtn.parentNode
        );
        noteDoneBtn.click();
      }
      if (event.target == checkbox) {
        event.target.classList.toggle("to-do-item-checkbox-checked");
        noteDoneBtn.click();
      }
    });
    toDoItemEl.addEventListener("input", (event) => {
      if (event.target == checkbox) noteDoneBtn.click();
      if (event.inputType == "insertLineBreak") {
        event.preventDefault();
        show(label);
        hide(textArea);
        textArea.blur();
        noteCardToDoItemPlaceHolderTextArea.click();
      } else {
        label.textContent = textArea.value;
      }
    });
    toDoItemEl.append(checkbox, label, textArea, deleteItemBtn);
    return toDoItemEl;
  };
  toDoItems.forEach((toDoItem) => {
    const toDoItemToAppend = createToDoitem(toDoItem);
    if (toDoItem.isChecked) {
      completedTodoItemsList.appendChild(toDoItemToAppend);
    } else {
      noteCardDescription.appendChild(toDoItemToAppend);
    }
  });
  completedToDoItemsArea.append(completedToDoItemsDiv, completedTodoItemsList);
  if (item.isToDoList) {
    noteCardDescription.append(noteCardToDoItemPlaceHolder);
    noteCardDescription.append(completedToDoItemsArea);
  }

  noteCardPinBtn.classList.toggle("note-card-button-active", item.isPinned);

  // Event Listeners
  noteCard.addEventListener("click", (event) => {
    noteDoneBtn.style.display = "";
    // Show editable fields when you click in the note
    if (event.target == noteCardTitle || event.target == noteCardDescription) {
      if (noteCardTitleLabel.textContent == "") {
        noteCardTitleTextArea.value = "";
        show(noteCardTitleTextArea);
        hide(noteCardTitleLabel);
        noteCardTitleTextArea.focus();
      }
      if (noteCardDescriptionLabel.textContent == "") {
        noteCardDescriptionTextArea.value = "";
        show(noteCardDescriptionTextArea);
        hide(noteCardDescriptionLabel);
        noteCardDescriptionTextArea.focus();
      }
    }
    // Show and edit Title
    if (event.target == noteCardTitleLabel || event.target == noteCardTitle) {
      hide(noteCardTitleLabel);
      noteCardTitleTextArea.value = noteCardTitleLabel.textContent;
      show(noteCardTitleTextArea);
      noteCardTitleTextArea.focus();
    }
    // Show and edit Description
    if (
      event.target == noteCardDescriptionLabel ||
      event.target == noteCardDescription
    ) {
      hide(noteCardDescriptionLabel);
      noteCardDescriptionTextArea.value = noteCardDescriptionLabel.textContent;
      show(noteCardDescriptionTextArea);
      noteCardDescriptionTextArea.focus();
    }
    // To do list handling
    if (item.isToDoList) {
      show(noteCardToDoItemPlaceHolder);
      hide(noteCardDescriptionLabel);
      hide(noteCardDescriptionTextArea);
    }
    if (event.target == noteCardMenuBtn) {
      noteDeleteBtn.classList.toggle("hide");
    }
    if (event.target == noteCardColorBtn) {
      noteDoneBtn.style.display = "";
      noteColorBtns.classList.toggle("hide");
    }
    if (event.target == noteCardPinBtn) {
      pinNote(noteCard.getAttribute("data-note-id"));
    }
    if (event.target == noteDeleteBtn) {
      deleteNote(noteCard.getAttribute("data-note-id"));
      noteDeleteBtn.classList.toggle("hide");
    }
    if (event.target == noteDoneBtn) {
      noteDoneBtn.style.display = "none";
      const toDoItems = [];
      const descriptionToUpdate = item.isToDoList
        ? ""
        : noteCardDescriptionLabel.textContent;
      noteCardDescription.querySelectorAll(".to-do-item").forEach((item) => {
        const label = item.querySelector(".to-do-item-label");
        const checkbox = item.querySelector(".to-do-item-checkbox");
        if (label.textContent != "") {
          const toDoItemToSave = {
            label: label.textContent,
            isChecked: checkbox.classList.contains(
              "to-do-item-checkbox-checked"
            )
              ? true
              : false,
          };
          toDoItems.push(toDoItemToSave);
        }
      });
      const updatedNote = {
        _id: Number(noteCard.getAttribute("data-note-id")),
        noteTitle: noteCardTitleLabel.textContent,
        noteDescription: descriptionToUpdate,
        noteTime: Date.now(),
        toDoItems: toDoItems,
        color: noteCard.getAttribute("data-color"),
      };
      updateNote(updatedNote);
    }
  });

  noteCard.addEventListener("input", (event) => {
    if (event.target == noteCardTitleTextArea) {
      noteCardTitleLabel.textContent = noteCardTitleTextArea.value;
    }
    if (event.target == noteCardDescriptionTextArea && !item.isToDoList) {
      noteCardDescriptionLabel.textContent = noteCardDescriptionTextArea.value;
    }
  });

  // Append DOM Elements
  noteCardTitle.append(noteCardTitleLabel, noteCardTitleTextArea);
  noteCardDescription.append(
    noteCardDescriptionLabel,
    noteCardDescriptionTextArea
  );
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

function show(domElement) {
  domElement.style.display = "";
}

function hide(domElement) {
  domElement.style.display = "none";
}
