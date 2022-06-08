import menuBarsIcon from '../resources/svg/menu-bars.svg';
import searchIcon from '../resources/svg/search-icon.svg';
import closeIcon from '../resources/svg/close-icon.svg';
import openNewTabIcon from '../resources/svg/open-new-tab-icon.svg';
import SearchPanelView from './SearchPanelView';

export default class AppHeaderView {
  constructor(controller) {
    this.pageHeadersController = controller;
    this.searchPanel = new SearchPanelView(this.pageHeadersController);
    this._element = this._template();
  }

  build() {
    return this._element;
  }

  _template() {
    const element = document.querySelector('#app-header');
    element.innerHTML = `
      <div class="header-container">
        <div class="icon-button icon-size" id="menu-bars">
          <img class="svg-icon-large" src="${menuBarsIcon}" alt="">
        </div>
        <div class="header-icon icon-size"></div>
        <h2 class="header-title" tabindex="-1">Keep</h2>
        <h3 class="header-subtitle" tabindex="-1">Notes</h3>
      </div>
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
    `;
    element
      .querySelector('#search-icon-btn')
      .addEventListener('click', () => this.openSearchPanel());
    element.insertBefore(
      this.searchPanel.build(),
      element.querySelector('.header-icons'),
    );
    return element;
  }

  changeAppHeader(title, subtitle) {
    this._element.querySelector('.header-title').textContent = title;
    if (title !== 'Keep') {
      this._element.querySelector('.header-icon').classList.add('hide');
    } else {
      this._element.querySelector('.header-icon').classList.remove('hide');
    }
    if (subtitle) {
      this._element.querySelector('.header-subtitle').classList.remove('hide');
    } else {
      this._element.querySelector('.header-subtitle').classList.add('hide');
    }
  }

  openSearchPanel() {
    this._element.querySelector('#search-panel').classList.remove('hide');
    this._element.querySelector('#search-input').focus();
    this._element.querySelector('.header-icons').classList.add('hide');
    this._element.querySelector('.header-container').classList.add('hide');
  }
}
