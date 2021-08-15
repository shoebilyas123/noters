import * as model from "../models/model";
import createFolderView from "../views/createFolderView";
import formView from "../views/formView";
import sidebarView from "../views/sibebarView";
import foldersView from "../views/foldersView";
import createNoteView from "../views/createNoteView";
import EditorJS from "@editorjs/editorjs";
import noteEditorView from "../views/noteEditorView";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Qoute from "@editorjs/quote";
import Checklist from "@editorjs/checklist";
import Embed from "@editorjs/embed";

// window.addEventListener("load", View.renderLoadingAnimation);

if (module.hot) {
  module.hot.accept();
}
let editor, documentName;

const initFirstFolder = function () {
  let tabName = sidebarView.getSidebarElement().querySelector(".tab");
  if (!tabName) return;
  tabName = tabName.textContent;
  sidebarView.renderFirstTab();
  model.state.folder = {
    name: tabName,
  };
  foldersView.changeLocationAddress(model.state.folder);
  const folderData = model.state.notes_bookmarks
    .map((note) => {
      if (note.folderLocation === tabName) return note;
    })
    .filter((note) => note !== undefined);
  foldersView.renderFolderData(folderData);
};
const initEditor = function () {
  const savedData = model.getNoteData(documentName);
  editor = new EditorJS({
    holder: "note-editor",
    tools: {
      header: {
        class: Header,
        shortcut: "CTRL+SHIFT+H",
      },
      list: {
        class: List,
        shortcut: "CTRL+SHIFT+L",
      },
      qoute: {
        class: Qoute,
        shortcut: "CTRL+SHIFT+Q",
      },
    },
    data: savedData,
  });
};
const controlLocalStorage = function () {
  const folders = model.state.folders_bookmarks;
  if (!folders) return;
  folders.forEach((fol) => {
    createFolderView.createNewFolderTab(fol);
  });
};

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
    initFirstFolder();
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
const controlSaveNote = function (e) {
  editor
    .save()
    .then((savedData) => {
      if (e.target.textContent === "Save") {
        e.target.textContent = "Saved!";
        setInterval(() => {
          e.target.textContent = "Save";
        }, 3000);
      }

      model.updateNoteState(documentName, savedData);
    })
    .catch((err) => {
      console.log(err);
    });
};
const controlCloseEditor = function (e) {
  const editor = e.target.closest(".note-editor-container");
  editor.remove();
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
  if (buttonClicked.classList.contains("edit")) {
    const noteData = { name: noteCard.querySelector("h4").innerText };
    noteEditorView.createEditor(noteData);
    noteEditorView.addHandlerCloseEditor(controlCloseEditor);
    documentName = noteEditorView.getDocumentName();
    initEditor();
    noteEditorView.addHandlerSave(controlSaveNote);
  }
};
const controlCreateNote = function (e) {
  e.preventDefault();

  const form = this.closest(".modal-form");
  const options = form.querySelector("#note-select");

  const newName = form.querySelector("#note-name").value;
  const folderLocation = options.value;
  const isValid = model.isNoteValid(newName, folderLocation);
  if (isValid === false) return;
  const noteState = {
    name: newName,
    folderLocation,
    data: {},
  };

  model.addToNotesBookmarks(noteState);
  if (
    folderLocation ===
    sidebarView.getSidebarElement().querySelector(".tab--selected").innerText
  )
    foldersView.renderFolderNote(noteState);
  formView.clearForm();
};
const controlCreateNoteForm = function (e) {
  formView.clearForm();
  if (model.state.folders_bookmarks.length === 0) {
    formView.renderNoFolderAlertModal();
    const okayBtn = formView.getFormCancelButton("modal-form");
    formView.formCancellation(okayBtn);
    return;
  }
  const options = model.state.folders_bookmarks;
  formView.renderNewNoteModal(options);
  const formCancelButton = formView.getFormCancelButton(`new-note-modal`);
  formView.formCancellation(formCancelButton);
  formView.addHandlerCreateNew(controlCreateNote);
};
const controlFolderDelete = function (e) {
  const para = e.target.closest(".address-bar").querySelector("p").innerText;
  const folderName = para.slice(para.lastIndexOf("> ") + 1, para.length).trim();
  foldersView.renderFolderDeleteConfirmModal(
    folderName,
    model.removeFolderState
  );
};

const controlSidebarClose = function (e) {
  const sidebar = sidebarView.getSidebarElement();
  sidebar.classList.remove("sidebar-animation");
  sidebar.classList.add("sidebar-close-animation");
};

const controlSidebarMobile = function () {
  const sidebar = sidebarView.getSidebarElement();
  sidebar.classList.add("sidebar-animation");
  sidebar.classList.remove("sidebar-close-animation");
  sidebarView.addHandlerSidebarClose(controlSidebarClose);
};
const initMobile = function () {
  const menuBtn = foldersView.getMenuIcon();
  const closeBtnSidebar = sidebarView
    .getSidebarElement()
    .querySelector(".close-sidebar-icon");

  if (window.innerWidth <= 375) {
    menuBtn.classList.remove("hiddenMenuBtn");
    closeBtnSidebar.classList.remove("hiddenCloseIcon");
    foldersView.addHandlerMenuBtn(controlSidebarMobile);
    foldersView.renderFirstTimeImage();
  } else {
    closeBtnSidebar.classList.add("hiddenCloseIcon");
    menuBtn.classList.add("hiddenMenuBtn");
    foldersView.hideFirstTimeImage();
  }
};
const init = function () {
  if (window.innerWidth <= 375) {
    initMobile();
  } else {
    foldersView.hideFirstTimeImage();
  }

  model.initState();
  // sidebarView.renderEmptyImage();
  createFolderView.addHandlerCreateFolder(controlCreateFolderForm);
  sidebarView.changeTabEventListener();
  // sidebarView.eventListenerToggleMoreOptions();
  sidebarView.addHandlerTabClick(controlFolder);
  foldersView.addHandlerNotesClick(controlNote);
  createNoteView.addHandlerCreateNew(controlCreateNoteForm);
  foldersView.addHandlerDeleteButton(controlFolderDelete);
};
init();
window.addEventListener("resize", initMobile);
window.addEventListener("load", initFirstFolder);
document.addEventListener("DOMContentLoaded", controlLocalStorage);
