class SearchPanelController {
  constructor() {
    this.searchPanelView = new SearchPanelView();
  }
  searchNotes(input) {
    pageHeadersController.showSearchedNotes(input.value);
  }
  cancelSearch() {
    document.querySelector("#search-input").value = "";
    pageHeadersController.changeToNotesPage();
  }
  openSearchPanel() {
    document.querySelector("#search-panel").style.display = "flex";
  }
}
