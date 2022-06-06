import { app } from '..';

export class ColorBallContainer {
  constructor(noteItem) {
    this.noteItem = noteItem;
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
    this._element = this._template();
    return this._element;
  }

  _template() {
    const element = document.createElement('div');
    element.classList.add('color-ball-container', 'hide');
    this.colors.map((color) => element.append(this.createColorBall(color)));
    element.querySelectorAll('.color-ball').forEach((ball) =>
      ball.addEventListener('click', (event) => {
        event.stopPropagation();
        app.noteItemsController.changeNoteColor(
          this.noteItem.id,
          ball.getAttribute('data-color')
        );
      })
    );
    return element;
  }

  createColorBall(color) {
    const element = document.createElement('span');
    element.classList.add('color-ball');
    element.setAttribute('role', 'button');
    element.setAttribute('data-color', color);
    return element;
  }
}
