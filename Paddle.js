import Sprite from "./Sprite.js";

export default class Paddle extends Sprite {
    constructor(gameboard, leftOrRight) {
        super(gameboard, 'paddle')
        this.direction = 0;
        this.position = {};
        if (leftOrRight === 'left') {
            this.position.x = 15;
        } else {
            this.position.x = gameboard.offsetWidth - 49;
        }
        this.position.y = (Number(gameboard.offsetHeight) / 2) - 48;
        this.updateCSSPosition();
    }

    reset() {
        this.direction = 0;
        this.position.y = (Number(gameboard.offsetHeight) / 2) - 48;
    }

    move() {
        if (!(this.isTouchingBottom() && this.direction === 1) && !(this.isTouchingTop() && this.direction === -1)) {
            this.position.y += (this.direction * 7);
        }
    }
    
    isTouchingTop() {
        if (this.position.y <= -25) {
            console.log(this.position.y)
            return true;
        } else {
            return false;
        }
    }

    isTouchingBottom() {
        if (this.position.y >= gameboard.offsetHeight - 140) {
            return true;
        } else {
            return false;
        }
    }
}