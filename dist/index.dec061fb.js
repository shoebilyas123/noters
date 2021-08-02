// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"3x56t":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "5b49326b3613990bb6890804dec061fb";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"5ks4q":[function(require,module,exports) {
var _modelsModel = require("../models/model");
var _viewsCreateFolderView = require("../views/createFolderView");
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
var _viewsCreateFolderViewDefault = _parcelHelpers.interopDefault(_viewsCreateFolderView);
var _viewsFormView = require("../views/formView");
var _viewsFormViewDefault = _parcelHelpers.interopDefault(_viewsFormView);
var _viewsSibebarView = require("../views/sibebarView");
var _viewsSibebarViewDefault = _parcelHelpers.interopDefault(_viewsSibebarView);
var _viewsFoldersView = require("../views/foldersView");
var _viewsFoldersViewDefault = _parcelHelpers.interopDefault(_viewsFoldersView);
var _viewsCreateNoteView = require("../views/createNoteView");
var _viewsCreateNoteViewDefault = _parcelHelpers.interopDefault(_viewsCreateNoteView);
if (module.hot) {
  module.hot.accept();
}
const controlLocalStorage = function () {
  const folders = _modelsModel.state.folders_bookmarks;
  if (!folders) return;
  folders.forEach(fol => {
    _viewsCreateFolderViewDefault.default.createNewFolderTab(fol);
  });
};
window.addEventListener("load", controlLocalStorage);
const controlCreateFolderForm = function () {
  _viewsFormViewDefault.default.clearForm();
  _viewsFormViewDefault.default.createFolderForm();
  const formCancelButton = _viewsFormViewDefault.default.getFormCancelButton(`new-folder-modal`);
  _viewsFormViewDefault.default.formCancellation(formCancelButton);
  _viewsFormViewDefault.default.addHandlerCreateNew(controlCreateFolder);
};
const controlCreateFolder = function (e) {
  e.preventDefault();
  const newFolderName = this.closest(".modal-form").querySelector("#folder-name").value;
  const data = {
    newName: newFolderName
  };
  const isNewFolderValid = _modelsModel.isFolderValid(data);
  if (isNewFolderValid) {
    _modelsModel.addFoldersToBookmarks(data);
    _viewsCreateFolderViewDefault.default.createNewFolderTab(data.newName);
    _viewsFormViewDefault.default.clearForm();
  } else {
    return alert("Please enter a valid folder name!");
  }
};
const controlFolder = function (e) {
  if (!e.target.classList.contains("name") && !e.target.classList.contains("tab")) return;
  const tab = e.target;
  // console.log(tab);
  let tabName;
  if (tab.classList.contains("name")) tabName = tab.innerText; else tabName = tab.querySelector(".name").textContent;
  _modelsModel.state.folder = {
    name: tabName
  };
  _viewsFoldersViewDefault.default.changeLocationAddress(_modelsModel.state.folder);
  const folderData = _modelsModel.state.notes_bookmarks.map(note => {
    if (note.folderLocation === tabName) return note;
  }).filter(note => note !== undefined);
  _viewsFoldersViewDefault.default.renderFolderData(folderData);
};
const controlNote = function (e) {
  const buttonClicked = e.target;
  if (!buttonClicked.classList.contains("delete") && !buttonClicked.classList.contains("edit")) return;
  const noteCard = buttonClicked.closest(".note");
  if (buttonClicked.classList.contains("delete")) {
    const noteData = {
      name: noteCard.querySelector("h4").innerText
    };
    _viewsFoldersViewDefault.default.renderConfirmModal(noteCard, _modelsModel.removeNoteState);
  }
};
const controlCreateNote = function (e) {
  e.preventDefault();
  const form = this.closest(".modal-form");
  const options = form.querySelector("#note-select");
  const newName = form.querySelector("#note-name").value;
  const folderLocation = options.value;
  const isValid = _modelsModel.isNoteValid(newName);
  if (!isValid) return;
  const noteState = {
    name: newName,
    folderLocation
  };
  _modelsModel.addToNotesBookmarks(noteState);
  _viewsFormViewDefault.default.clearForm();
};
const controlCreateNoteForm = function (e) {
  _viewsFormViewDefault.default.clearForm();
  const options = _modelsModel.state.folders_bookmarks;
  _viewsFormViewDefault.default.renderNewNoteModal(options);
  const formCancelButton = _viewsFormViewDefault.default.getFormCancelButton(`new-note-modal`);
  _viewsFormViewDefault.default.formCancellation(formCancelButton);
  _viewsFormViewDefault.default.addHandlerCreateNew(controlCreateNote);
};
const init = function () {
  // sidebarView.renderEmptyImage();
  _viewsCreateFolderViewDefault.default.addHandlerCreateFolder(controlCreateFolderForm);
  _viewsSibebarViewDefault.default.changeTabEventListener();
  _viewsSibebarViewDefault.default.eventListenerToggleMoreOptions();
  _viewsSibebarViewDefault.default.addHandlerTabClick(controlFolder);
  _viewsFoldersViewDefault.default.addHandlerNotesClick(controlNote);
  _viewsCreateNoteViewDefault.default.addHandlerCreateNew(controlCreateNoteForm);
};
init();

},{"../models/model":"34Jm7","../views/formView":"yqQiy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y","../views/createFolderView":"4isxj","../views/sibebarView":"3DEE0","../views/foldersView":"7b1QR","../views/createNoteView":"U7eNO"}],"34Jm7":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "state", function () {
  return state;
});
_parcelHelpers.export(exports, "addFolderToLocalStorage", function () {
  return addFolderToLocalStorage;
});
_parcelHelpers.export(exports, "getFolderFromLocalStorage", function () {
  return getFolderFromLocalStorage;
});
_parcelHelpers.export(exports, "addFoldersToBookmarks", function () {
  return addFoldersToBookmarks;
});
_parcelHelpers.export(exports, "isFolderValid", function () {
  return isFolderValid;
});
_parcelHelpers.export(exports, "addNotesToLocalStorage", function () {
  return addNotesToLocalStorage;
});
_parcelHelpers.export(exports, "addToNotesBookmarks", function () {
  return addToNotesBookmarks;
});
_parcelHelpers.export(exports, "removeNoteState", function () {
  return removeNoteState;
});
_parcelHelpers.export(exports, "isNoteValid", function () {
  return isNoteValid;
});
const state = {
  notes: {},
  folder: {},
  folders_bookmarks: [],
  notes_bookmarks: []
};
const addFolderToLocalStorage = function (data) {
  localStorage.setItem("mySavedFolders", JSON.stringify(data));
};
const getFolderFromLocalStorage = function () {
  let data = localStorage.getItem("mySavedFolders");
  if (!data) return;
  return data;
};
const addFoldersToBookmarks = function (data) {
  const newName = data.newName;
  state.folders_bookmarks.push(newName);
  addFolderToLocalStorage(state.folders_bookmarks);
};
const isFolderValid = function (data) {
  if (!data.newName) return false;
  const newName = data.newName;
  const bookmarks = state.folders_bookmarks;
  let result = true;
  bookmarks.forEach(bookmark => {
    if (newName === bookmark) {
      result = false;
    }
  });
  return result;
};
const addNotesToLocalStorage = function (data) {
  localStorage.setItem("myNotes", JSON.stringify(data));
};
const addToNotesBookmarks = function (data) {
  const newNote = data;
  const notesBookmarks = state.notes_bookmarks;
  if (!isNoteValid(newNote.name)) return;
  state.notes_bookmarks.push(newNote);
  addNotesToLocalStorage(state.notes_bookmarks);
};
const removeNoteState = function (noteName) {
  const notesBookmarks = state.notes_bookmarks;
  state.notes_bookmarks = notesBookmarks.filter(note => note.name !== noteName);
  if (notesBookmarks === state.notes_bookmarks) return;
  addNotesToLocalStorage(state.notes_bookmarks);
};
const isNoteValid = function (noteName) {
  const notesBookmarks = state.notes_bookmarks;
  return notesBookmarks.every(note => note.name !== noteName);
};
const initState = function () {
  const folders = localStorage.getItem("mySavedFolders");
  if (!folders) return;
  state.folders_bookmarks = JSON.parse(folders);
  const notes = localStorage.getItem("myNotes");
  if (!notes) return;
  state.notes_bookmarks = JSON.parse(notes);
  console.log(folders, notes);
};
initState();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5gA8y":[function(require,module,exports) {
"use strict";

exports.interopDefault = function (a) {
  return a && a.__esModule ? a : {
    default: a
  };
};

exports.defineInteropFlag = function (a) {
  Object.defineProperty(a, '__esModule', {
    value: true
  });
};

exports.exportAll = function (source, dest) {
  Object.keys(source).forEach(function (key) {
    if (key === 'default' || key === '__esModule') {
      return;
    } // Skip duplicate re-exports when they have the same value.


    if (key in dest && dest[key] === source[key]) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function () {
        return source[key];
      }
    });
  });
  return dest;
};

exports.export = function (dest, destName, get) {
  Object.defineProperty(dest, destName, {
    enumerable: true,
    get: get
  });
};
},{}],"yqQiy":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
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
    options.forEach(optionVal => {
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
    const formCancelButton = this._parentElement.querySelector(`.${formClass}`).querySelector(".cancel");
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
}
exports.default = new formView();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4isxj":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
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
    <div class="more">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>`;
  }
  createNewFolderTab(data) {
    const markup = this._generateNewTabMarkup(data);
    const sidebarTabs = this._parentElement.closest(".app-container").querySelector(".sidebar--tabs");
    sidebarTabs.insertAdjacentHTML("beforeend", markup);
  }
}
exports.default = new createFolderView();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3DEE0":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class sidebarView {
  _parentElement = document.querySelector(".sidebar");
  changeTab(e) {
    if (!e.target.classList.contains("tab") && !e.target.classList.contains("name")) return;
    const tabCurrent = e.target.closest(".tab");
    const tabSelected = this.querySelector(".tab--selected");
    if (tabSelected === tabCurrent) return;
    tabCurrent.classList.add("tab--selected");
    tabSelected ? tabSelected.classList.remove("tab--selected") : "";
  }
  changeTabEventListener() {
    const sidebarTabs = this._parentElement.querySelector(".sidebar--tabs");
    sidebarTabs.addEventListener("click", this.changeTab);
  }
  _generateMoreOptionsMarkup() {
    return `<div class="more--options">
    <div class="edit option">Edit</div>
    <div class="separator"></div>
    <div class="delete option">Delete</div>
  </div>`;
  }
  toggleMoreOptionsMenu(e) {
    if (!e.target.classList.contains("more") && !e.target.classList.contains("circle")) return;
    let moreIcon = e.target;
    if (moreIcon.classList.contains("circle")) moreIcon = moreIcon.closest(".more");
    if (moreIcon.querySelector(".more--options") !== null) {
      moreIcon.querySelector(".more--options").remove();
      return;
    }
    const nonSelectedOptionsMenu = this._parentElement.querySelector(".more--options");
    if (nonSelectedOptionsMenu) nonSelectedOptionsMenu.remove();
    const moreOptionsMarkup = this._generateMoreOptionsMarkup();
    moreIcon.insertAdjacentHTML("beforeend", moreOptionsMarkup);
  }
  eventListenerToggleMoreOptions() {
    this._parentElement.addEventListener("click", this.toggleMoreOptionsMenu.bind(this));
  }
  addHandlerTabClick(handler) {
    const tabsContainer = this._parentElement.querySelector(".sidebar--tabs");
    tabsContainer.addEventListener("click", handler);
  }
}
exports.default = new sidebarView();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7b1QR":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
// import { waitFor } from "../helpers";
class foldersView {
  _parentElement = document.querySelector(".main");
  changeLocationAddress(data) {
    const address = this._parentElement.querySelector(`.address-bar`);
    address.querySelector("p").textContent = `My Notes > ${data.name}`;
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
  renderFolderData(folderData) {
    const folderElement = this._parentElement.querySelector(".notes-collection");
    folderElement.innerHTML = "";
    folderData.forEach(data => {
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
    confirmDeleteModal.addEventListener("click", e => {
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
}
exports.default = new foldersView();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"U7eNO":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
class createNoteView {
  _parentElement = document.querySelector(".new-note");
  addHandlerCreateNew(handler) {
    this._parentElement.addEventListener("click", handler);
  }
}
exports.default = new createNoteView();

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["3x56t","5ks4q"], "5ks4q", "parcelRequire7517")

//# sourceMappingURL=index.dec061fb.js.map
