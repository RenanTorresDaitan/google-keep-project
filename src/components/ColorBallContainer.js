export default class ColorBallContainer {
  constructor(noteItem, controller) {
    this.noteItem = noteItem;
    this.noteItemController = controller;
    this.colors = [
      'red',
      'orange',
      'yellow',
      'green',
      'teal',
      'blue',
      'darkblue',
      'purple',
      'pink',
      'brown',
      'gray',
      'default',
    ];
    this.element = this._template();
  }

  build() {
    return this.element;
  }

  _template() {
    const element = document.createElement('div');
    element.classList.add('color-ball-container', 'hide');
    this.colors.map((color) => element.append(ColorBallContainer.createColorBall(color)));
    element.querySelectorAll('.color-ball').forEach((ball) => ball.addEventListener('click', (event) => {
      event.stopPropagation();
      this.noteItemController.changeNoteColor(this.noteItem.id, ball.getAttribute('data-color'));
    }));
    return element;
  }

  static createColorBall(color) {
    const element = document.createElement('span');
    element.classList.add('color-ball');
    element.setAttribute('role', 'button');
    element.setAttribute('data-color', color);
    return element;
  }
}
