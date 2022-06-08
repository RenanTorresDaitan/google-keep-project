import DBManager from './models/DBManager';
import PageHeadersController from './controllers/PageHeadersController';

export default class App {
  constructor() {
    this.APP_NAME = 'Keep-Notes';
    this.MOBILE_SCREEN_SIZE = 900;

    this.dbManager = new DBManager(this.APP_NAME);
    this.pageHeadersController = new PageHeadersController(this.dbManager);

    this.changeToNotesOnMobile = new ResizeObserver((item) => {
      if (item[0].contentRect.width < this.MOBILE_SCREEN_SIZE) {
        this.pageHeadersController.changeToNotesPage();
      }
    });
  }

  start() {
    this.changeToNotesOnMobile.observe(document.body);
    this.pageHeadersController.changeToNotesPage();
  }
}
