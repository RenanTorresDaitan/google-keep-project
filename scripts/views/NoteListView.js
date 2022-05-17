class NoteListView {
  constructor(element) {
    this._element = element;
  }

  _template(list) {
    return list.map((noteItem) => {return new NoteItemView(noteItem).build();}).join("");
  }
  update(list) {
    this._element.innerHTML = this._template(list);
  }
}
/*
function buildNoteCard(item) {
    // Create Note Card DOM Elements from item data
   
    
    const noteCardTitle = createDOMElement("div", {
      class: "note-card-title",
    });
    const noteCardTitleLabel = createDOMElement("label", {}, item.getTitle());
    const noteCardTitleTextArea = createDOMElement("textarea", {
      name: "note-title",
      class: "note-card-title-textarea hide",
      id: "title-textarea",
      rows: "1",
      maxlength: "999",
      placeholder: "Title",
      style: "height: 1rem;",
    });
    const noteCardDescription = createDOMElement("div", {
      class: "note-card-desc",
    });
    const noteCardDescriptionLabel = createDOMElement(
      "label",
      {},
      item.getDescription()
    );
    const noteCardDescriptionTextArea = createDOMElement("textarea", {
      name: "note-description",
      class: "note-card-desc-textarea hide",
      id: "description-textarea",
      rows: "1",
      maxlength: "19999",
      placeholder: "Take a note...",
      style: "height: 1rem;",
    });
    const noteCardToDoItems = createDOMElement("div", {
      class: "note-to-do-items hide",
    });
    const noteCardToDoItemPlaceHolder = createDOMElement(
      "div",
      { class: "to-do-item-placeholder hide" },
      createDOMElement("img", {
        class: "svg-icon-large",
        src: "./resources/svg/notecard/plus-icon.svg",
      })
    );
    const noteCardToDoItemPlaceHolderTextArea = createDOMElement("textarea", {
      class: "to-do-item-textarea",
      placeholder: "List item",
    });
    noteCardToDoItemPlaceHolderTextArea.addEventListener("click", () => {
      const newToDoItem = createToDoitem({ label: "", isChecked: false });
      noteCardToDoItems.insertBefore(newToDoItem, noteCardToDoItemPlaceHolder);
      noteCardToDoItemPlaceHolderTextArea.blur();
      newToDoItem.querySelector(".to-do-item-label").click();
    });
    noteCardToDoItemPlaceHolder.append(noteCardToDoItemPlaceHolderTextArea);
    const noteDoneBtn = createDOMElement(
      "button",
      {
        class: "note-card-done-button hide [ m-0625rem-lr p-05rem ]",
        style: "user-select: none;",
      },
      "Done"
    );
    const noteArchiveBtn = createDOMElement(
      "div",
      { role: "button", class: "menu-option" },
      "Archive"
    );
    const noteDeleteBtn = createDOMElement(
      "div",
      { role: "button", class: "menu-option" },
      "Delete"
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
        noteDoneBtn.click();
      });
      noteColorBtns.append(colorBall);
    });
    // Completed to-do-items handling
    const toDoItems = item.getToDoItems();
    const completedToDoItemsArea = createDOMElement("div", {
      class: "completed-items-area hide",
    });
    const completedItemsSeparator = createDOMElement("div", {
      class: "completed-items-separator",
    });
    const completedToDoItemsDiv = createDOMElement("div", {
      class: "completed-items-div",
    });
    const completedToDoItemsLabel = createDOMElement(
      "label",
      {
        class: "completed-items-label",
      },
      "1 Completed Item"
    );
    const completedToDoItemsShowBtn = createDOMElement("div", {
      class: "completed-items-btn rotate-90-cw",
    });
    const completedTodoItemsList = createDOMElement("div", {
      class: "completed-items-list",
    });
  
    completedToDoItemsDiv.append(
      completedToDoItemsShowBtn,
      completedToDoItemsLabel
    );
  
    const checkedToDoItems = toDoItems.filter((item) => item.isChecked);
    completedToDoItemsLabel.textContent =
      checkedToDoItems.length > 1
        ? `${checkedToDoItems.length} Completed items`
        : "1 Completed item";
    if (checkedToDoItems.length > 0) {
      show(completedToDoItemsArea);
    }
  
    const lowerToolbar = createDOMElement("div", { class: "note-lower-toolbar" });
    const deleteForeverBtn = createDOMElement(
      "div",
      { class: "lower-toolbar-button" },
      createDOMElement("img", {
        class: "svg-icon",
        src: "./resources/svg/notecard/delete-forever-icon.svg",
      })
    );
    const restoreNoteBtn = createDOMElement(
      "div",
      { class: "lower-toolbar-button" },
      createDOMElement("img", {
        class: "svg-icon",
        src: "./resources/svg/notecard/restore-note-icon.svg",
      })
    );
    const addReminderBtn = createDOMElement(
      "div",
      { class: "lower-toolbar-button" },
      createDOMElement("img", {
        class: "svg-icon",
        src: "./resources/svg/notecard/add-reminder-icon.svg",
      })
    );
    const archiveNoteBtn = createDOMElement(
      "div",
      { class: "lower-toolbar-button" },
      createDOMElement("img", {
        class: "svg-icon",
        src: "./resources/svg/notecard/archive-note-icon.svg",
      })
    );
    const unarchiveNoteBtn = createDOMElement(
      "div",
      { class: "lower-toolbar-button" },
      createDOMElement("img", {
        class: "svg-icon",
        src: "./resources/svg/notecard/unarchive-note-icon.svg",
      })
    );
    const colorPalleteBtn = createDOMElement(
      "div",
      { class: "lower-toolbar-button" },
      createDOMElement("img", {
        class: "svg-icon",
        src: "./resources/svg/notecard/color-palette-icon.svg",
      })
    );
    const menuBtn = createDOMElement(
      "div",
      { class: "lower-toolbar-button" },
      createDOMElement("img", {
        class: "svg-icon",
        src: "./resources/svg/notecard/menu-circles.svg",
      })
    );
    const pinBtn = createDOMElement(
      "div",
      { class: "notecard-pin-button" },
      createDOMElement("img", {
        class: "svg-icon-large",
        src: "./resources/svg/notecard/pin-large-icon.svg",
      })
    );
  
    // To Dos handling
    const createToDoitem = (toDoItem) => {
      const toDoItemEl = createDOMElement("div", { class: "to-do-item" });
      const checkbox = createDOMElement("div", {
        role: "checkbox",
        class: "to-do-item-checkbox",
        tabindex: 0,
      });
      const label = createDOMElement(
        "label",
        { class: "to-do-item-label" },
        `${toDoItem.label}`
      );
      const textArea = createDOMElement("textarea", {
        class: "to-do-item-textarea hide",
      });
      const deleteItemBtn = createDOMElement(
        "span",
        { role: "button", class: "to-do-item-delete" },
        "X"
      );
      checkbox.setAttribute("checked", toDoItem.isChecked);
      // Event Listeners
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
          const checked =
            checkbox.getAttribute("checked") == "true" ? false : true;
          checkbox.setAttribute("checked", checked);
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
        noteCardToDoItems.appendChild(toDoItemToAppend);
      }
    });
    completedToDoItemsArea.append(
      completedItemsSeparator,
      completedToDoItemsDiv,
      completedTodoItemsList
    );
    noteCardToDoItems.append(noteCardToDoItemPlaceHolder, completedToDoItemsArea);
    noteCardPinBtn.classList.toggle("note-card-button-active", item.isPinned);
  
    // Event Listeners
    noteCard.addEventListener("click", (event) => {
      show(noteDoneBtn);
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
      if (event.target == noteCardToDoItems) {
        show(noteCardToDoItemPlaceHolder);
      }
      if (
        event.target == completedToDoItemsDiv ||
        event.target == completedToDoItemsShowBtn ||
        event.target == completedToDoItemsLabel
      ) {
        hide(noteDoneBtn);
        completedTodoItemsList.classList.toggle("hide");
        completedToDoItemsShowBtn.classList.toggle("rotate-90-cw");
      }
      // Buttons handling
      if (event.target == noteCardMenuBtn) {
        hide(noteDoneBtn);
        noteCardMenuPanel.classList.toggle("hide");
      }
      if (event.target == noteCardColorBtn) {
        hide(noteDoneBtn);
        show(noteColorBtns);
      }
      if (event.target == noteCardPinBtn || event.target == pinBtn) {
        pinNote(noteCard.getAttribute("data-note-id"));
      }
      if (event.target == noteDeleteBtn) {
        trashNote(noteCard.getAttribute("data-note-id"));
      }
      if (event.target == archiveNoteBtn || event.target == noteArchiveBtn) {
        archiveNote(noteCard.getAttribute("data-note-id"));
      }
      if (event.target == unarchiveNoteBtn) {
        unarchiveNote(noteCard.getAttribute("data-note-id"));
      }
      if (event.target == deleteForeverBtn) {
        deleteNote(noteCard.getAttribute("data-note-id"));
      }
      if (event.target == restoreNoteBtn) {
        restoreNote(noteCard.getAttribute("data-note-id"));
      }
      if (event.target == addReminderBtn) {
        addReminder(noteCard.getAttribute("data-note-id"));
      }
      if (event.target == noteDoneBtn) {
        hide(noteDoneBtn);
        const toDoItems = [];
        const descriptionToUpdate = item.isToDoList
          ? ""
          : noteCardDescriptionLabel.textContent;
        noteCardToDoItems.querySelectorAll(".to-do-item").forEach((item) => {
          const label = item.querySelector(".to-do-item-label");
          const checkbox = item.querySelector(".to-do-item-checkbox");
          if (label.textContent != "") {
            const toDoItemToSave = {
              label: label.textContent,
              isChecked:
                checkbox.getAttribute("checked") == "true" ? true : false,
            };
            toDoItems.push(toDoItemToSave);
          }
        });
        const updatedNote = {
          _id: Number(noteCard.getAttribute("data-note-id")),
          noteTitle: noteCardTitleLabel.textContent,
          noteDescription: descriptionToUpdate,
          noteTime: {creationDate: Date.now(), deletionDate: null},
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
      if (event.target == noteCardDescriptionTextArea) {
        noteCardDescriptionLabel.textContent = noteCardDescriptionTextArea.value;
      }
    });
  
    // Append DOM Elements
    if (item.isTrashed) {
      lowerToolbar.append(deleteForeverBtn, restoreNoteBtn);
    } else {
      lowerToolbar.append(
        addReminderBtn,
        colorPalleteBtn,
        item.isArchived ? unarchiveNoteBtn : archiveNoteBtn,
        menuBtn
      );
    }
    noteCardTitle.append(noteCardTitleLabel, noteCardTitleTextArea);
    noteCardDescription.append(
      noteCardDescriptionLabel,
      noteCardDescriptionTextArea
    );
    noteCardMenuPanel.append(noteArchiveBtn,noteDeleteBtn);
    noteCardBtnContainer.append(
      noteCardColorBtn,
      noteCardMenuBtn,
      noteCardPinBtn
    );
    if (item.isTrashed) {
      noteCard.append(
        noteCardTitle,
        noteCardDescription,
        noteCardToDoItems,
        lowerToolbar
      );
    } else {
      noteCard.append(
        noteColorBtns,
        noteCardMenuPanel,
        noteCardBtnContainer,
        pinBtn,
        noteCardTitle,
        noteCardDescription,
        noteCardToDoItems,
        noteDoneBtn,
        lowerToolbar
      );
    }
    if (item.isToDoList) {
      hide(noteCardDescription);
      show(noteCardToDoItems);
    }
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
  
  function hide(domElement) {
    domElement.classList.add("hide");
  }
  function show(domElement) {
    domElement.classList.remove("hide");
  }
  */
