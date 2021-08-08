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
  const newNote = data;
  const notesBookmarks = state.notes_bookmarks;
  if (!isNoteValid(newNote.name)) return;

  state.notes_bookmarks.push(newNote);
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
  let folderBookmarks = state.folders_bookmarks;

  folderBookmarks = folderBookmarks.filter((folder) => folder !== folderName);

  if (folderBookmarks === state.folders_bookmarks) return;
  state.folders_bookmarks = folderBookmarks;
  console.log(folderName, state.folders_bookmarks);
  addFolderToLocalStorage(state.folders_bookmarks);
};

export const isNoteValid = function (noteName) {
  const notesBookmarks = state.notes_bookmarks;

  return notesBookmarks.every((note) => note.name !== noteName);
};
export const updateNoteState = function (noteName, data) {
  const notesBookmarks = state.notes_bookmarks;

  let currentNote;
  notesBookmarks.forEach((note) => {
    if (note.name === noteName) {
      currentNote = note;
      return;
    }
  });
  console.log(currentNote);
  currentNote.data = data;
  state.notes_bookmarks = state.notes_bookmarks.map((note) => {
    if (note.name === noteName) {
      note = currentNote;
    }
  });
  console.log(state.notes_bookmarks);
};
const initState = function () {
  const folders = localStorage.getItem("mySavedFolders");
  if (!folders) return;
  state.folders_bookmarks = JSON.parse(folders);

  const notes = localStorage.getItem("myNotes");
  if (!notes) return;
  state.notes_bookmarks = JSON.parse(notes);
};

initState();
