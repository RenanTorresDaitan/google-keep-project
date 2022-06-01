class ColorBallContainer {
  constructor(noteItem) {
    this.noteItem = noteItem;
    this.colors = [
      "red",
      "orange",
      "yellow",
      "green",
      "teal",
      "blue",
      "darkblue",
      "purple",
      "pink",
      "brown",
      "gray",
      "default",
    ];
  }
  _template() {
    return `
    <div class="color-ball-container hide">
    ${this.colors.reduce(
      (colorBalls, color) => (colorBalls += this.createColorBall(color)),
      ""
    )}
    </div>`;
  }
  build() {
    return this._template();
  }
  createColorBall(color) {
    return `<span 
                class="color-ball" 
                role="button" 
                data-color="${color}" 
                onclick="noteItemsController.changeNoteColor(${this.noteItem.id},'${color}')">
            </span>`;
  }
}
