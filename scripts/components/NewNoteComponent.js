class NewNoteComponent {
  constructor() {
    this._element = document.createElement("div");
    this._element.setAttribute("class", "newnote");
    this._element.setAttribute("id", "new-note-dialog");
    this._element.innerHTML = this._template();
  }
  _template() {
    return `
      <!-- New note and new list buttons -->
      <div role="button" id="new-note-button" class="[ m-0625rem-r p-05rem-0625rem ]" tabindex="0"
        style="user-select: none" onclick="newNoteController.startEditingNewNote('note')">
        <img class="icon-size" src="./resources/svg/notecard/plus-icon.svg" alt="">
        <span>Take a note…</span>
      </div>
      <div role="button" id="new-list-button" class="icon-button icon-size" tabindex="0" style="user-select: none"
        data-tooltip-text="New list" aria-label="New list" onclick="newNoteController.startEditingNewNote('list')">
        <img class="svg-icon" src="./resources/svg/new-list-icon.svg" alt="">
      </div>
      <!-- Note card to be edited after clicking -->
      <div class="editing-note hide">
        <div class="newnote-menu hide">
          <div id="archive-menu-button" class="newnote-menu-option">Archive</div>
          <div id="delete-menu-button" class="newnote-menu-option">Delete</div>
          <div id="open-menu-button" class="newnote-menu-option" style="display:flex; justify-content: center;">
            <div style=" margin-right: 0.375rem;">Open in Keep</div>
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24" fill="#333"
              focusable="false">
              <path
                d="m15.444 15.444h-10.888v-10.888h5.444v-1.556h-5.444c-0.86 0-1.556 0.696-1.556 1.556v10.888c0 0.86 0.696 1.556 1.556 1.556h10.888c0.86 0 1.556-0.696 1.556-1.556v-5.444h-1.556v5.444zm-3.888-12.444v1.556h2.788l-7.646 7.644 1.1 1.102 7.646-7.646v2.788h1.556v-5.444h-5.444z">
              </path>
            </svg>
          </div>
        </div>
        <div class="newnote-menu-button" onclick="newNoteController.openNewNoteMenu()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24">
            <path
              d="M12,8.5c1,0,1.8-0.8,1.8-1.8S13,5,12,5s-1.8,0.8-1.8,1.8S11,8.5,12,8.5z M12,10.2c-1,0-1.8,0.8-1.8,1.8s0.8,1.8,1.8,1.8
            s1.8-0.8,1.8-1.8S13,10.2,12,10.2z M12,15.5c-1,0-1.8,0.8-1.8,1.8S11,19,12,19s1.8-0.8,1.8-1.8S13,15.5,12,15.5z" />
          </svg>
        </div>
        <div class="newnote-pin-button" onclick="newNoteController.pinNewNote()">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 24 24">
            <path d="M16 5h.99L17 3H7v2h1v7l-2 2v2h5v6l1 1 1-1v-6h5v-2l-2-2V5z"></path>
          </svg>
        </div>
        <textarea class="newnote-title-textarea" placeholder="Title"></textarea>
        <textarea class="newnote-desc-textarea" placeholder="Take a note..."></textarea>
        <!-- To do items area -->
        <div class="newnote-to-do-items-area">
          <div class="newnote-item-placeholder">
            <svg class="newnote-card-item-svg" width="20px" height="20px" viewBox="0 0 24 24" fill="#000000de">
              <path d="m19 13h-6v6h-2v-6h-6v-2h6v-6h2v6h6v2z" />
              <path d="m0 0h24v24h-24z" fill="none" />
            </svg>
            <textarea name="" id="" cols="30" rows="10" placeholder=" List item"
              class="newnote-item-placeholder-textarea" onkeydown="newNoteController.createNewToDoItem(event)"></textarea>
          </div>
          <div class="completed-items-area hide">
            <div class="completed-items-separator"></div>
            <div class="completed-items-div" onclick="newNoteController.toggleCompletedItems()">
              <div class="completed-items-btn rotate-90-cw"></div>
              <div class="completed-items-label">1 Completed item</div>
            </div>
            <div class="completed-items-list"></div>
          </div>
        </div>
        <div class="newnote-card-button-container">
          <div class="newnote-card-done-button" onclick="newNoteController.createNewNote()">Done</div>
        </div>
      </div>
      `;
  }
  build() {
    return this._element.outerHTML;
  }
}
