class formView {
  _parentElement = document.querySelector(".app-container");
  _generateFolderFormMarkup() {
    return `<div class="new-folder-modal modal-form">
        <form action="" class="create-form">
          <div class="create-form--header">
            <h2>Create New Folder</h2>
          </div>
          <label for="folder-name">Enter Name</label>
          <input id="folder-name" type="text" />
          <div class="buttons">
            <button class="app-button create-confirm">Create</button
            ><button class="app-button cancel">Cancel</button>
          </div>
        </form>
      </div>`;
  }
  _generateNoteFormMarkup(options) {
    let optionsMarkup = "";
    options.forEach((optionVal) => {
      optionsMarkup += ` <option value="${optionVal}">${optionVal}</option>`;
    });

    return `<div class="new-note-modal modal-form">
    <form action="" class="create-form">
      <div class="create-form--header">
        <h2>Create New Note</h2>
      </div>
      <label for="note-name">Enter Name</label>
      <input id="note-name" type="text" />
      <label for="note-select">Choose Folder Location</label>
      <select id="note-select">${optionsMarkup}
      </select>
      <div class="buttons">
        <button class="app-button create-confirm">Create</button
        ><button class="app-button cancel">Cancel</button>
      </div>
    </form>
  </div>`;
  }
  _generateDeleteFolderMarkup() {
    return `<div class="delete-confirm modal-form">
    <form action="" class="create-form">
      <div class="create-form--header">
        <h3>Are you sure you want to delete <b>Physics Notes</b>?</h3>
      </div>
      <div class="buttons">
        <button class="app-button">Yes</button
        ><button class="app-button cancel">Cancel</button>
      </div>
    </form>
  </div>`;
  }
  _generateNoFolderAlertMarkup() {
    return `<div class="delete-confirm modal-form">
    <form action="" class="create-form">
      <div class="create-form--header">
        <h3>Please create a folder to add a new note!</h3>
      </div>
      <div class="buttons">
      <button class="app-button cancel">Okay</button>
      </div>
    </form>
  </div>`;
  }
  _deleteForm(e) {
    e.preventDefault();
    const target = this.closest(".modal-form");
    target.remove();
  }
  createFolderForm() {
    const markup = this._generateFolderFormMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  getFormCancelButton(formClass) {
    const formCancelButton = this._parentElement
      .querySelector(`.${formClass}`)
      .querySelector(".cancel");
    return formCancelButton;
  }
  formCancellation(formCancelButton) {
    const cancelButton = formCancelButton;
    if (!cancelButton) return;
    cancelButton.addEventListener("click", this._deleteForm);
  }
  clearForm() {
    const activeForm = this._parentElement.querySelector(".modal-form");
    if (!activeForm) return;
    activeForm.remove();
  }
  addHandlerCreateNew(handler) {
    const createBtn = this._parentElement.querySelector(".create-confirm");
    createBtn.addEventListener("click", handler);
  }
  renderNewNoteModal(options) {
    const markup = this._generateNoteFormMarkup(options);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
  renderNoFolderAlertModal(handler) {
    const markup = this._generateNoFolderAlertMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }
}

export default new formView();
