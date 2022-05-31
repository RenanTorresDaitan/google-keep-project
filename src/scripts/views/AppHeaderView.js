import menuBarsIcon from "../../resources/svg/menu-bars.svg"
import searchIcon from "../../resources/svg/search-icon.svg"
import closeIcon from "../../resources/svg/close-icon.svg"
import openNewTabIcon from "../../resources/svg/open-new-tab-icon.svg"
import {app} from "../../index"
import { SearchPanelView } from "./SearchPanelView"

export class AppHeaderView {
  constructor() {
    this._element = document.querySelector("#app-header");
    this._element.innerHTML = this._template();
    document.querySelector("#search-icon-btn").addEventListener("click", () => this.openSearchPanel());
    this._element.append(new SearchPanelView().build());
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
    <!-- Icon buttons -->
    <div class="header-icons">
      <div id="search-icon-btn" class="icon-button icon-size" role="button" aria-label="Search" tabindex="0" >
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
  openSearchPanel() {
    document.querySelector("#search-panel").classList.remove("hide");
    document.querySelector("#search-input").focus();
    document.querySelector(".header-icons").classList.add("hide");
    document.querySelector(".header-container").classList.add("hide");
  }
  
}