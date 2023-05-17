// Define the Sprite class
export default class Sprite {
    constructor(gameboard, className) {
        this.element = document.createElement('div');
        this.element.className = className;
        gameboard.appendChild(this.element);
    }

    updateCSSPosition() {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
    }
}