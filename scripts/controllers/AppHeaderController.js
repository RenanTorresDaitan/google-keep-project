class AppHeaderController {
  constructor() {
    this.appHeaderView = new AppHeaderView();
  }
  changeAppHeader(title, subtitle) {
    document.querySelector(".header-title").textContent = title;
    if (title != "Keep") {
      document.querySelector(".header-icon").classList.add("hide");
    } else {
      document.querySelector(".header-icon").classList.remove("hide");
    }
    if (subtitle) {
      document.querySelector(".header-subtitle").classList.remove("hide");
    } else {
      document.querySelector(".header-subtitle").classList.add("hide");
    }
  }
}
