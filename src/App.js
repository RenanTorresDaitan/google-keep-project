import DBManager from './models/DBManager';
import PageHeadersController from './controllers/PageHeadersController';

export default class App {
  constructor() {
    this.APP_NAME = 'Keep-Notes';
    this.dbManager = new DBManager(this.APP_NAME);
    this.pageHeadersController = new PageHeadersController(this.dbManager);
    this.MOBILE_SCREEN_SIZE = 900;

    this.changeToNotesOnMobile = new ResizeObserver((item) => {
      if (item[0].contentRect.width < this.MOBILE_SCREEN_SIZE) {
        this.pageHeadersController.changeToNotesPage();
      }
    });
    this.changeToNotesOnMobile.observe(document.body);
  }

  start() {
    this.pageHeadersController.changeToNotesPage();
  }
}
