// import { waitFor } from "../helpers";

class foldersView {
  _parentElement = document.querySelector(".main");

  changeLocationAddress(data) {
    const address = this._parentElement.querySelector(`.address-bar`);
    address.querySelector("p").textContent = `My Notes > ${data.name}`;
    address.querySelector(".buttons").classList.remove("changeOpacity");
  }
  _generateFolderDataMarkup(data) {
    return `<div class="note">
      <div class="note--thumbnail">
      <p>This note is empty right now. Add some text...</p>
       
      </div>
      <div class="note--interact">
        <h4>${data.name}</h4>
        <div class="buttons">
          <button class="app-button edit">Edit</button
          ><button class="app-button delete">Delete</button>
        </div>
      </div>
    </div>`;
  }
  renderFolderNote(data) {
    console.log(data);
    const folderElement =
      this._parentElement.querySelector(".notes-collection");
    const markup = this._generateFolderDataMarkup(data);
    folderElement.insertAdjacentHTML("beforeend", markup);
  }
  renderFolderData(folderData) {
    const folderElement =
      this._parentElement.querySelector(".notes-collection");
    folderElement.innerHTML = "";

    folderData.forEach((data) => {
      const markup = this._generateFolderDataMarkup(data);
      folderElement.insertAdjacentHTML("beforeend", markup);
    });
  }
  _generateConfirmModalMarkup() {
    return `<div class="delete-confirm modal-form">
    <div action="" class="create-form">
      <div class="create-form--header">
        <h2>Are you sure you want to delete this note?</h2>
      </div>
      <div class="buttons">
        <button class="app-button delete-confirm-button">Confirm</button
        ><button class="app-button cancel">Cancel</button>
      </div>
    </div>
  </div>`;
  }
  renderConfirmModal(element, handler) {
    const appContainer = this._parentElement.closest(".app-container");
    const markup = this._generateConfirmModalMarkup();
    appContainer.insertAdjacentHTML("afterbegin", markup);
    const noteName = element.querySelector("h4").innerText;
    const confirmDeleteModal = appContainer.querySelector(".delete-confirm");

    confirmDeleteModal.addEventListener("click", (e) => {
      const clickedElement = e.target;
      const modal = clickedElement.closest(".modal-form");
      if (clickedElement.classList.contains("delete-confirm-button")) {
        element.remove();
        modal.remove();
        handler(noteName);
      }
      if (clickedElement.classList.contains("cancel")) {
        modal.remove();
      }
    });
  }
  addHandlerNotesClick(handler) {
    const notesFolder = this._parentElement.querySelector(".notes-collection");

    notesFolder.addEventListener("click", handler);
  }
  addHandlerDeleteButton(handler) {
    const deleteButton = this._parentElement
      .querySelector(".address-bar")
      .querySelector(".delete");
    deleteButton.addEventListener("click", handler);
  }
}

export default new foldersView();
