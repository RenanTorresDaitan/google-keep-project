import {loadNotesFromLocalStorage} from "./main-script"
import "./styles.css"

document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    loadNotesFromLocalStorage();
  }
});