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
        <h4><svg width="2rem" height="2rem" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 92.8002H80.7234V29L67 8L19 8L19 92.8002Z" fill="#2F80ED"/>
        <line x1="24.6705" y1="21.7918" x2="63.3755" y2="21.7918" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <line x1="24.6705" y1="31.523" x2="74.4969" y2="31.523" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <line x1="24.6705" y1="41.2542" x2="71.7165" y2="41.2542" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <line x1="24.6705" y1="50.9854" x2="71.7165" y2="50.9854" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <line x1="24.6705" y1="60.7166" x2="63.3755" y2="60.7166" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <line x1="24.6705" y1="70.4477" x2="74.4969" y2="70.4477" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <path d="M67 8.00001L80.5 28.5L62.5 26L67 8.00001Z" fill="#82B2F2"/>
        </svg>
        ${data.name}</h4>
        <div class="buttons">
          <button class="app-button edit">Open  </button
          ><button class="app-button delete">Delete</button>
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
  _generateConfirmModalMarkup(item) {
    return `<div class="delete-confirm modal-form">
    <div action="" class="create-form">
      <div class="create-form--header">
        <h2>Are you sure you want to delete this ${item}?</h2>
      </div>
      <div class="buttons">
        <button class="app-button delete-confirm-button">Yes</button
        ><button class="app-button cancel">No</button>
      </div>
    </div>
  </div>`;
  }
  renderConfirmModal(element, handler) {
    const appContainer = this._parentElement.closest(".app-container");
    const markup = this._generateConfirmModalMarkup("note");
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

  renderFolderDeleteConfirmModal(folderName, handler) {
    const appContainer = this._parentElement.closest(".app-container");
    const markup = this._generateConfirmModalMarkup(`'${folderName}' folder`);
    appContainer.insertAdjacentHTML("afterbegin", markup);
    const confirmDeleteModal = appContainer.querySelector(".delete-confirm");

    confirmDeleteModal.addEventListener("click", (e) => {
      const clickedElement = e.target;
      const modal = clickedElement.closest(".modal-form");
      if (clickedElement.classList.contains("delete-confirm-button")) {
        modal.remove();
        handler(folderName);
        window.location.reload();
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
