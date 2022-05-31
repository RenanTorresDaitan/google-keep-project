import searchIcon from "../../resources/svg/search-icon.svg"
import closeIcon from "../../resources/svg/close-icon.svg"
import {app} from "../../index"


export class SearchPanelView {
  constructor() {
    this._element = document.createElement('div');
    this._element.setAttribute("id", "search-panel");
    this._element.classList.add("search-panel", "hide")
    this._element.innerHTML = this._template();
    this._element.querySelector("#search-input").addEventListener("click", (event) => this.searchNotes(event));
    this._element.querySelector("#search-cancel-btn").addEventListener("click", () => this.cancelSearch());
  }
  _template() {
    return `
    <div class="icon-button icon-size">
      <img class="svg-icon" src="${searchIcon}" alt="Search" />
    </div>
    <input id="search-input" class="search-input" placeholder="Search Keep..." aria-label="Search Keep..." />
    <div id="search-cancel-btn" class="icon-button icon-size" role="button" aria-label="Cancel" tabindex="0" onkeydown="this.click()">
      <img class="svg-icon" src="${closeIcon}" alt="Close Search" />
    </div>
  `;
  }
  build(){
    return this._element;
  }
  cancelSearch() {
    document.querySelector("#search-input").value = "";
    document.querySelector("#search-panel").classList.add("hide");
    document.querySelector(".header-icons").classList.remove("hide");
    document.querySelector(".header-container").classList.remove("hide");
    app.pageHeadersController.changeToNotesPage();
  }
  searchNotes(event) {
    if (event.key === "Escape") this.cancelSearch();
    app.pageHeadersController.showSearchedNotes(event.target.value);
  }
}
