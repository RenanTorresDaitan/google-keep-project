import searchIcon from "../../resources/svg/search-icon.svg"
import closeIcon from "../../resources/svg/close-icon.svg"


export class SearchPanelView {
  constructor() {
    this._element = document.querySelector("#search-panel");
    this._element.innerHTML = this._template();
  }
  _template() {
    return `
    <div class="icon-button icon-size">
      <img class="svg-icon" src="${searchIcon}" alt="Search" />
    </div>
    <input id="search-input" class="search-input" placeholder="Search Keep..." aria-label="Search Keep..." oninput="searchPanelController.searchNotes(event)" />
    <div id="search-cancel-btn" class="icon-button icon-size" role="button" aria-label="Cancel" tabindex="0" onclick="searchPanelController.cancelSearch()" onkeydown="this.click()">
      <img class="svg-icon" src="${closeIcon}" alt="Close Search" />
    </div>
  `;
  }
}
