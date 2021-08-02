import * as model from "../models/model";
import createFolderView from "../views/createFolderView";
import formView from "../views/formView";
import sidebarView from "../views/sibebarView";
import foldersView from "../views/foldersView";
import createNoteView from "../views/createNoteView";

if (module.hot) {
  module.hot.accept();
}

const controlLocalStorage = function () {
  const folders = model.state.folders_bookmarks;
  if (!folders) return;
  folders.forEach((fol) => {
    createFolderView.createNewFolderTab(fol);
  });
};

window.addEventListener("load", controlLocalStorage);

const controlCreateFolderForm = function () {
  formView.clearForm();
  formView.createFolderForm();
  const formCancelButton = formView.getFormCancelButton(`new-folder-modal`);
  formView.formCancellation(formCancelButton);
  formView.addHandlerCreateNew(controlCreateFolder);
};

const controlCreateFolder = function (e) {
  e.preventDefault();
  const newFolderName =
    this.closest(".modal-form").querySelector("#folder-name").value;
  const data = { newName: newFolderName };
  const isNewFolderValid = model.isFolderValid(data);
  if (isNewFolderValid) {
    model.addFoldersToBookmarks(data);
    createFolderView.createNewFolderTab(data.newName);
    formView.clearForm();
  } else {
    return alert("Please enter a valid folder name!");
  }
};

const controlFolder = function (e) {
  if (
    !e.target.classList.contains("name") &&
    !e.target.classList.contains("tab")
  )
    return;
  const tab = e.target;
  // console.log(tab);
  let tabName;
  if (tab.classList.contains("name")) tabName = tab.innerText;
  else tabName = tab.querySelector(".name").textContent;

  model.state.folder = { name: tabName };
  foldersView.changeLocationAddress(model.state.folder);
  const folderData = model.state.notes_bookmarks
    .map((note) => {
      if (note.folderLocation === tabName) return note;
    })
    .filter((note) => note !== undefined);
  foldersView.renderFolderData(folderData);
};

const controlNote = function (e) {
  const buttonClicked = e.target;
  if (
    !buttonClicked.classList.contains("delete") &&
    !buttonClicked.classList.contains("edit")
  )
    return;

  const noteCard = buttonClicked.closest(".note");

  if (buttonClicked.classList.contains("delete")) {
    const noteData = { name: noteCard.querySelector("h4").innerText };
    foldersView.renderConfirmModal(noteCard, model.removeNoteState);
  }
};
const controlCreateNote = function (e) {
  e.preventDefault();
  const form = this.closest(".modal-form");
  const options = form.querySelector("#note-select");

  const newName = form.querySelector("#note-name").value;
  const folderLocation = options.value;
  const isValid = model.isNoteValid(newName);
  if (!isValid) return;
  const noteState = { name: newName, folderLocation };
  model.addToNotesBookmarks(noteState);
  formView.clearForm();
};
const controlCreateNoteForm = function (e) {
  formView.clearForm();
  const options = model.state.folders_bookmarks;
  formView.renderNewNoteModal(options);
  const formCancelButton = formView.getFormCancelButton(`new-note-modal`);
  formView.formCancellation(formCancelButton);
  formView.addHandlerCreateNew(controlCreateNote);
};

const init = function () {
  // sidebarView.renderEmptyImage();
  createFolderView.addHandlerCreateFolder(controlCreateFolderForm);
  sidebarView.changeTabEventListener();
  sidebarView.eventListenerToggleMoreOptions();
  sidebarView.addHandlerTabClick(controlFolder);
  foldersView.addHandlerNotesClick(controlNote);
  createNoteView.addHandlerCreateNew(controlCreateNoteForm);
};

init();
