import {loadNotesFromLocalStorage} from "./main-script"

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    loadNotesFromLocalStorage();
  }
});