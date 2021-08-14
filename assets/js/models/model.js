export const state = {
  notes: {},
  folder: {},
  folders_bookmarks: [],
  notes_bookmarks: [],
};

export const addFolderToLocalStorage = function (data) {
  localStorage.setItem("mySavedFolders", JSON.stringify(data));
};
export const getFolderFromLocalStorage = function () {
  let data = localStorage.getItem("mySavedFolders");
  if (!data) return;
  return data;
};
export const addFoldersToBookmarks = function (data) {
  const newName = data.newName;
  state.folders_bookmarks.push(newName);
  addFolderToLocalStorage(state.folders_bookmarks);
};
export const isFolderValid = function (data) {
  if (!data.newName) return false;
  const newName = data.newName;
  const bookmarks = state.folders_bookmarks;
  let result = true;

  bookmarks.forEach((bookmark) => {
    if (newName === bookmark) {
      result = false;
    }
  });

  return result;
};
export const addNotesToLocalStorage = function (data) {
  localStorage.setItem("myNotes", JSON.stringify(data));
};
export const addToNotesBookmarks = function (data) {
  if (!isNoteValid(data.name, data.folderLocation)) return;

  state.notes_bookmarks.push(data);
  addNotesToLocalStorage(state.notes_bookmarks);
};
export const removeNoteState = function (noteName) {
  const notesBookmarks = state.notes_bookmarks;

  state.notes_bookmarks = notesBookmarks.filter(
    (note) => note.name !== noteName
  );

  if (notesBookmarks === state.notes_bookmarks) return;
  addNotesToLocalStorage(state.notes_bookmarks);
};
export const removeFolderState = function (folderName) {
  state.folders_bookmarks = state.folders_bookmarks.filter(
    (folder) => folder !== folderName
  );

  state.notes_bookmarks = state.notes_bookmarks.filter((note) => {
    note.folderLocation !== folderName;
  });
  addNotesToLocalStorage(state.notes_bookmarks);
  addFolderToLocalStorage(state.folders_bookmarks);
};
export const isNoteValid = function (noteName, location) {
  let isAllowed = true;
  state.notes_bookmarks.forEach((note) => {
    if (note.name === noteName && note.folderLocation === location) {
      isAllowed = false;
      return;
    }
  });
  return isAllowed;
};
export const updateNoteState = function (noteName, data) {
  state.notes_bookmarks.forEach((note) => {
    if (note.name === noteName) {
      note.data = data;
    }
  });
  addNotesToLocalStorage(state.notes_bookmarks);
};
export const initState = function () {
  const folders = localStorage.getItem("mySavedFolders");
  if (!folders) return;
  state.folders_bookmarks = JSON.parse(folders);

  const notes = localStorage.getItem("myNotes");
  if (!notes) return;
  state.notes_bookmarks = JSON.parse(notes);
};
export const getNoteData = function (noteName) {
  let savedData = {};
  state.notes_bookmarks.forEach((note) => {
    if (note.name === noteName) {
      savedData = note.data;
    }
  });
  return savedData;
};
