class createFolderView {
  _parentElement = document.querySelector(".new-folder");
  addHandlerCreateFolder(handler) {
    this._parentElement.addEventListener("click", handler);
  }
  _generateNewTabMarkup(data) {
    return `<div class="tab">
    <div class="general">
    <svg width="2.5rem" height="2.5rem" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="23" width="33" height="22" rx="2" fill="url(#paint0_linear)"/>
    <g filter="url(#filter0_d)">
    <rect x="20" y="31" width="63" height="42" rx="2" fill="url(#paint1_linear)"/>
    </g>
    <defs>
    <filter id="filter0_d" x="16" y="27" width="73" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
    <feOffset dx="1" dy="1"/>
    <feGaussianBlur stdDeviation="2.5"/>
    <feComposite in2="hardAlpha" operator="out"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
    </filter>
    <linearGradient id="paint0_linear" x1="36.5" y1="23" x2="36.5" y2="45" gradientUnits="userSpaceOnUse">
    <stop stop-color="#2D9CDB"/>
    <stop offset="1" stop-color="#2F80ED"/>
    </linearGradient>
    <linearGradient id="paint1_linear" x1="51.5" y1="31" x2="51.5" y2="73" gradientUnits="userSpaceOnUse">
    <stop stop-color="#2F80ED"/>
    <stop offset="1" stop-color="#2D9CDB"/>
    </linearGradient>
    </defs>
    </svg>
    
      <h3 class="name">${data}</h3>
    </div>
  </div>`;
  }
  createNewFolderTab(data) {
    const markup = this._generateNewTabMarkup(data);
    const sidebarTabs = this._parentElement
      .closest(".app-container")
      .querySelector(".sidebar--tabs");
    const sidebarEmpty = sidebarTabs.querySelector(".sidebar--tabs--empty");
    if (!sidebarEmpty.classList.contains(`hidden`)) {
      sidebarEmpty.classList.add(`hidden`);
    }
    sidebarTabs.insertAdjacentHTML("beforeend", markup);
  }
}

export default new createFolderView();
