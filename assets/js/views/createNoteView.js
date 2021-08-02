class createNoteView {
  _parentElement = document.querySelector(".new-note");

  addHandlerCreateNew(handler) {
    this._parentElement.addEventListener("click", handler);
  }
}

export default new createNoteView();
