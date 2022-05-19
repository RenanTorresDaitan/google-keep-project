class PageHeadersView {
  constructor(element) {
    this._element = element;
    this._element.innerHTML = this._template("notes", noteItemsList);
  }

  _template(sidebar, noteItems) {
    return `
        ${new NewNoteComponent().build()}
      <div class="trash-header hide">Notes in Trash are deleted after 7 days.
        <div role="button" class="empty-trash-btn" aria-hidden="false" tabindex="0" style="user-select: none;">Empty Trash</div>
      </div>
      <div class="no-notes-found">
        <img src="./resources/no-notes-folder.png" width="236px" alt="No notes found">
        <h2>No notes yet</h2>
        <h4>Your notes from Google Keep will show up here.</h4>
        </img>
      </div>
      <div class="no-reminders-found hide">
        <div class="no-reminders-img"></div>
        <div class="no-reminders-label">Notes with upcoming reminders appear here</div>
      </div>
      <div class="no-archived-found hide">
        <div class="no-archived-img"></div>
        <div class="no-archived-label">Your archived notes appear here</div>
      </div>
      <div class="no-trashed-found hide">
        <div class="no-trashed-img"></div>
        <div class="no-trashed-label">No notes in Trash</div>
      </div>
      <!-- Notes content area -->
      <section id="notes-area"></section>
      `;
  }

  update(sidebar, noteItems) {
    this._element.innerHTML = this._template(sidebar, noteItems);
  }
}
