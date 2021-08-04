class createFolderView {
  _parentElement = document.querySelector(".new-folder");
  addHandlerCreateFolder(handler) {
    this._parentElement.addEventListener("click", handler);
  }
  _generateNewTabMarkup(data) {
    return `<div class="tab">
    <div class="general">
      <div class="color"></div>
      <h3 class="name">${data}</h3>
    </div>
    <!-- <div class="more">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div> -->
  </div>`;
  }
  createNewFolderTab(data) {
    const markup = this._generateNewTabMarkup(data);
    const sidebarTabs = this._parentElement
      .closest(".app-container")
      .querySelector(".sidebar--tabs");
    const sidebarEmpty = sidebarTabs.querySelector(".sidebar--tabs--empty");
    if (!sidebarEmpty.classList.contains(`hidden`)) {
      sidebarEmpty.classList.add(`hidden`);
    }
    sidebarTabs.insertAdjacentHTML("beforeend", markup);
  }
}

export default new createFolderView();
