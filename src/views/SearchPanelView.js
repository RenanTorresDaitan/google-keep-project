import searchIcon from '../resources/svg/search-icon.svg';
import closeIcon from '../resources/svg/close-icon.svg';

export default class SearchPanelView {
  constructor(controller) {
    this.pageHeadersController = controller;
    this._element = this._template();
  }

  build() {
    return this._element;
  }

  _template() {
    const element = document.createElement('div');
    element.setAttribute('id', 'search-panel');
    element.classList.add('search-panel', 'hide');
    element.innerHTML = `
    <div class="icon-button icon-size">
      <img class="svg-icon" src="${searchIcon}" alt="Search" />
    </div>
    <input id="search-input" class="search-input" placeholder="Search Keep..." aria-label="Search Keep..." />
    <div id="search-cancel-btn" class="icon-button icon-size" role="button" aria-label="Cancel" tabindex="0" >
      <img class="svg-icon" src="${closeIcon}" alt="Close Search" />
    </div>
    `;
    element
      .querySelector('#search-input')
      .addEventListener('input', (event) => this.searchNotes(event));
    element
      .querySelector('#search-cancel-btn')
      .addEventListener('click', () => this.cancelSearch());
    return element;
  }

  cancelSearch() {
    this._element.querySelector('#search-input').value = '';
    this._element.classList.add('hide');
    document.querySelector('.header-icons').classList.remove('hide');
    document.querySelector('.header-container').classList.remove('hide');
    this.pageHeadersController.changeToNotesPage();
  }

  searchNotes(event) {
    if (event.key === 'Escape') this.cancelSearch();
    this.pageHeadersController.showSearchedNotes(event.target.value);
  }
}
