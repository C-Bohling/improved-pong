import Sprite from './Sprite.js'

export default class Ball extends Sprite {
    constructor(gameboard) {
        super(gameboard, 'ball')
        this.xSpeed = this.getRandomNumber(5, 7);
        this.ySpeed = 7 - this.xSpeed;
        this.bounces = 0;
        if (this.getRandomNumber(0, 1) === 1) {
            this.ySpeed = -this.ySpeed;
        }
        this.position = {
            'x': Number(gameboard.offsetWidth) / 2, 
            'y': Number(gameboard.offsetHeight) / 2
        };
        this.updateCSSPosition();
    }

    reset() {
        this.xSpeed = this.getRandomNumber(5, 7);
        this.ySpeed = 7 - this.xSpeed;
        if (this.getRandomNumber(0, 1) === 1) {
            this.ySpeed = -this.ySpeed;
        }
        this.position = {
            'x': Number(gameboard.offsetWidth) / 2, 
            'y': Number(gameboard.offsetHeight) / 2
        };
        this.updateCSSPosition();
        this.bounces = 0;
    }

    move() {
        if (this.xSpeed <= 0) {
            this.position.x += (this.xSpeed - (this.bounces * 0.1));
        } else {
            this.position.x += (this.xSpeed + (this.bounces * 0.1));
        }
        if (this.ySpeed <= 0) {
            this.position.y += (this.ySpeed - (this.bounces * 0.1));
        } else {
            this.position.y += (this.ySpeed + (this.bounces * 0.1));
        }        
    }

    checkWalls(playerOnePaddle, playerTwoPaddle, incrementPlayerOneScore, incrementPlayerTwoScore, setGameActive) {
        if (((this.position.x <= 31) && (this.position.y >= playerOnePaddle.position.y) && (this.position.y <= playerOnePaddle.position.y + 138)) || ((this.position.x >= gameboard.offsetWidth - 65) && (this.position.y >= playerTwoPaddle.position.y) && (this.position.y <= playerTwoPaddle.position.y + 138))) {
            this.xSpeed = -this.xSpeed;
            this.bounces++;
        } else if (this.position.x + 32 >= gameboard.offsetWidth) {
            incrementPlayerOneScore()
            setGameActive(false);
            this.reset();
        } else if (this.position.x <= 0) {
            incrementPlayerTwoScore();
            setGameActive(false);
            this.reset();
        }
        if ((this.position.y + 32 >= gameboard.offsetHeight) || (this.position.y <= 0)) {
            this.ySpeed = -this.ySpeed;
            this.bounces++;
        }
    }
    
    getRandomNumber(num1, num2) {
        return Math.round(Math.random() * (num2 - num1)) + num1;
    }
}