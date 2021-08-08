class noteEditorView {
  _parentElement = document.querySelector(".app-container");
  _generateEditorMarkup(data) {
    return `<div class="note-editor-container">
        <div id="note-editor">
          <div class="utils-container">
            <h1>${data.name}</h1>
            <div class="buttons"><div class="app-button btn-save">Save</div>
            <div class="app-button btn-close">Close</div>
            </div>
          </div>
        </div>
      </div>`;
  }
  createEditor(data) {
    const markup = this._generateEditorMarkup(data);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  addHandlerSave(handler) {
    const BtnSave = this._parentElement.querySelector(".btn-save");
    console.log(BtnSave);
    BtnSave.addEventListener("click", handler);
  }
  addHandlerCloseEditor(handler) {
    const BtnClose = this._parentElement.querySelector(".btn-close");
    BtnClose.addEventListener("click", handler);
  }
}

export default new noteEditorView();
