class sidebarView {
  _parentElement = document.querySelector(".sidebar");
  getSidebarTabClass() {
    return this._parentElement.querySelector("sidebar--empty");
  }
  changeTab(e) {
    if (
      !e.target.classList.contains("tab") &&
      !e.target.classList.contains("name")
    )
      return;
    const tabCurrent = e.target.closest(".tab");
    const tabSelected = this.querySelector(".tab--selected");

    if (tabSelected === tabCurrent) return;
    tabCurrent.classList.add("tab--selected");

    tabSelected ? tabSelected.classList.remove("tab--selected") : "";
  }
  changeTabEventListener() {
    const sidebarTabs = this._parentElement.querySelector(".sidebar--tabs");
    sidebarTabs.addEventListener("click", this.changeTab);
  }
  toggleMoreOptionsMenu(e) {
    if (
      !e.target.classList.contains("more") &&
      !e.target.classList.contains("circle")
    )
      return;
    let moreIcon = e.target;
    if (moreIcon.classList.contains("circle"))
      moreIcon = moreIcon.closest(".more");

    if (moreIcon.querySelector(".more--options") !== null) {
      moreIcon.querySelector(".more--options").remove();
      return;
    }

    const nonSelectedOptionsMenu =
      this._parentElement.querySelector(".more--options");
    if (nonSelectedOptionsMenu) nonSelectedOptionsMenu.remove();

    const moreOptionsMarkup = this._generateMoreOptionsMarkup();
    moreIcon.insertAdjacentHTML("beforeend", moreOptionsMarkup);
  }
  eventListenerToggleMoreOptions() {
    this._parentElement.addEventListener(
      "click",
      this.toggleMoreOptionsMenu.bind(this)
    );
  }
  addHandlerTabClick(handler) {
    const tabsContainer = this._parentElement.querySelector(".sidebar--tabs");
    tabsContainer.addEventListener("click", handler);
  }
  getSidebarElement() {
    return this._parentElement;
  }
  getActiveTab() {
    return this._parentElement.querySelector(".tab--selected");
  }
  renderFirstTab() {
    const tab = this._parentElement.getElementsByClassName("tab").item(0);
    tab.classList.add("tab--selected");
  }
  addHandlerSidebarClose(handler) {
    const closeBtn = this._parentElement.querySelector(".close-sidebar-icon");
    closeBtn.addEventListener("click", handler);
  }
}

export default new sidebarView();
