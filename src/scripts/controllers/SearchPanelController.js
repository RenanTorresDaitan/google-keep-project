import { SearchPanelView } from "../views/SearchPanelView";

export class SearchPanelController {
  constructor() {
    this.searchPanelView = new SearchPanelView();
  }
  searchNotes(event) {
    if (event.key === "Escape") this.cancelSearch();
    pageHeadersController.showSearchedNotes(event.target.value);
  }
  cancelSearch() {
    document.querySelector("#search-input").value = "";
    pageHeadersController.changeToNotesPage();
    document.querySelector("#search-panel").classList.add("hide");
    document.querySelector(".header-icons").classList.remove("hide");
    document.querySelector(".header-container").classList.remove("hide");
  }
  openSearchPanel() {
    document.querySelector("#search-panel").classList.remove("hide");
    document.querySelector("#search-input").focus();
    document.querySelector(".header-icons").classList.add("hide");
    document.querySelector(".header-container").classList.add("hide");
  }
}
