class SearchPanelView {
  constructor() {
    this._element = document.querySelector("#search-panel");
    this._element.innerHTML = this._template();
  }
  _template() {
    return `
    <div class="icon-button icon-size">
      <img class="svg-icon" src="./resources/svg/search-icon.svg" alt="Search" />
    </div>
    <input id="search-input" class="search-input" placeholder="Search Keep..." aria-label="Search Keep..." oninput="searchPanelController.searchNotes(this)" />
    <div id="search-cancel-btn" class="icon-button icon-size" role="button" aria-label="Cancel" tabindex="0" onclick="searchPanelController.cancelSearch()">
      <img class="svg-icon" src="./resources/svg/close-icon.svg" alt="Close Search" />
    </div>
  `;
  }
}
