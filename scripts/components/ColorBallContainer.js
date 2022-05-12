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
    ${this.colors.reduce((colorBalls, color) => (colorBalls += this.createColorBall(color)),"")}
    </div>`;
  }
  build() {
    return this._template();
  }
  createColorBall(color) {
    const colorBall = document.createElement("span");
    colorBall.setAttribute("class", "color-ball");
    colorBall.setAttribute("role", "button");
    colorBall.setAttribute("data-color", color);
    colorBall.setAttribute(
      "onclick",
      `noteController.changeNoteColor(${this.noteItem.id},"${color}")`
    );
    return colorBall.outerHTML;
  }
}