class PageHeadersView {
  constructor(element) {
    this._element = element;
    this.noteListView = new NoteListView();
    this.newNoteComponent = new NewNoteComponent();
    this._element.innerHTML = this._template("NOTES",0);
  }

  _template(sidebar, notes) {
    return `
        ${sidebar != "TRASH" ? this.newNoteComponent.build() : ""}
      <div class="trash-header ${
        sidebar == "TRASH" ? "" : "hide"
      }">Notes in Trash are deleted after 7 days.
        <div role="button" class="empty-trash-btn" aria-hidden="false" tabindex="0" style="user-select: none;" onclick="noteItemsController.deleteTrashedNotes()">Empty Trash</div>
      </div>
      <div class="no-notes-found ${(sidebar == "NOTES" && notes == 0 ) ? "" : "hide"}">
        <img src="./resources/no-notes-folder.png" width="236px" alt="No notes found">
        <h2>No notes yet</h2>
        <h4>Your notes from Google Keep will show up here.</h4>
        </img>
      </div>
      <div class="no-reminders-found ${(sidebar == "REMINDERS" && notes == 0 ) ? "" : "hide"}">
        <div class="no-reminders-img"></div>
        <div class="no-reminders-label">Notes with upcoming reminders appear here</div>
      </div>
      <div class="no-archived-found ${(sidebar == "ARCHIVED" && notes == 0 ) ? "" : "hide"}">
        <div class="no-archived-img"></div>
        <div class="no-archived-label">Your archived notes appear here</div>
      </div>
      <div class="no-trashed-found ${(sidebar == "TRASH" && notes == 0 ) ? "" : "hide"}">
        <div class="no-trashed-img"></div>
        <div class="no-trashed-label">No notes in Trash</div>
      </div>
      ${this.noteListView.build()}
      `;
  }

  update(sidebar, list) {
    this.noteListView.update(list);
    this._element.innerHTML = this._template(sidebar, list.length);
  }
}
