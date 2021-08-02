const sidebarTabs = document.querySelector(".sidebar--tabs");
let tabs = document.querySelectorAll(".tab");
const createBtnsContainer = document.querySelector(
  ".create-buttons--container"
);
const moreOptionsMenuEvents = function (ele) {
  if (ele.target.classList.contains("delete")) deleteFolder(ele);
};
const generateNewFolderTabMarkup = function () {
  return `<div class="tab">
  <div class="general">
    <div class="color"></div>
    <h3 class="name">Physics Notes</h3>
  </div>
  <div class="more">
    <div class="circle"></div>
    <div class="circle"></div>
    <div class="circle"></div>
  </div>
</div>`;
};
const createMoreOptionsMarkup = function () {
  return `<div class="more--options">
  <div class="edit option">Edit</div>
  <div class="separator"></div>
  <div class="delete option">Delete</div>
</div>`;
};

const toggleMoreOptionsMenu = function (clickedElement) {
  const moreButton = clickedElement.closest(".more");
  moreOptionsMenu = moreButton.querySelector(".more--options");
  if (moreOptionsMenu) {
    moreOptionsMenu.remove();
    return;
  } else {
    tabs.forEach((tab) => {
      if (tab.querySelector(".more--options")) {
        tab.querySelector(".more--options").remove();
      }
    });
    const moreOptionsMarkup = createMoreOptionsMarkup();
    moreButton.insertAdjacentHTML("beforeend", moreOptionsMarkup);
  }
};
const changeTab = function (e) {
  console.log(e.target);
  const clickedElement = e.target;
  if (clickedElement.closest(".more--options")) {
    moreOptionsMenuEvents(e);
    return;
  }
  if (clickedElement.closest(".more")) {
    toggleMoreOptionsMenu(clickedElement);
    return;
  }
  if (clickedElement.closest(".tab")) {
    tabs.forEach((tab) => {
      if (tab === clickedElement) return;
      tab.classList.remove("tab--selected");
    });
    currentTab = clickedElement.closest(".tab");
    currentTab.classList.add("tab--selected");
  }
};
const createNew = function (e) {
  const btnClicked = e.target;
  if (!btnClicked.classList.contains("create")) return;
  const createFolder = btnClicked.getAttribute("class").indexOf("new-folder");
  const createNote = btnClicked.getAttribute("class").indexOf("new-note");
  if (!createFolder && !createNote) {
    return;
  } else if (createFolder !== -1) {
    console.log(createFolder);
    const newFolderTab = generateNewFolderTabMarkup();
    sidebarTabs.insertAdjacentHTML("beforeend", newFolderTab);
    tabs = sidebarTabs.querySelectorAll(".tab");
  } else if (createNote !== -1) {
    return;
  }
};
const deleteFolder = function (e) {
  e.target.closest(".tab").remove();
};
sidebarTabs.addEventListener("click", changeTab);
createBtnsContainer.addEventListener("click", createNew);

/**createFolderView
 * createNoteView
 * DeleteView
 * FolderView
 * SidebarView
 * mainAddressView
 *
 */
