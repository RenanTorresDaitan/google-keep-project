import menuBarsIcon from "../../resources/svg/menu-bars.svg"
import searchIcon from "../../resources/svg/search-icon.svg"
import closeIcon from "../../resources/svg/close-icon.svg"
import openNewTabIcon from "../../resources/svg/open-new-tab-icon.svg"

export class AppHeaderView {
  constructor() {
    this._element = document.querySelector("#app-header");
    this._element.innerHTML = this._template();
  }
  _template() {
    return `
    <div class="header-container">
      <div class="icon-button icon-size" id="menu-bars">
        <img class="svg-icon-large" src="${menuBarsIcon}" alt="">
      </div>
      <div class="header-icon icon-size"></div>
      <h2 class="header-title" tabindex="-1">Keep</h2>
      <h3 class="header-subtitle" tabindex="-1">Notes</h3>
    </div>
    <!-- Search for notes panel  -->
    <div id="search-panel" class="search-panel hide"></div>
    <!-- Icon buttons -->
    <div class="header-icons">
      <div id="search-icon-btn" class="icon-button icon-size" role="button" aria-label="Search" tabindex="0" onclick="searchPanelController.openSearchPanel()" >
        <img class="svg-icon" src="${searchIcon}" />
      </div>
      <div class="icon-button icon-size" role="button" aria-label="Open in new tab" tabindex="0">
        <img class="svg-icon" src="${openNewTabIcon}" alt="Open in a new Tab" />
      </div>
      <div class="icon-button icon-size" role="button" aria-label="Close" tabindex="0">
        <img class="svg-icon" src="${closeIcon}" alt="Close App" />
      </div>
    </div>
    `
  }
}