// Gets a random number between (inclusive) num1, num2
const getRandomNumber = (num1, num2) => {
    return Math.round(Math.random() * (num2 - num1)) + num1;
}

// Define the Sprite class
class Sprite {
    constructor(className) {
        this.element = document.createElement('div');
        this.element.className = className;
        gameboard.appendChild(this.element);
    }

    updateCSSPosition() {
        this.element.style.left = `${this.position.x}px`;
        this.element.style.top = `${this.position.y}px`;
    }
}

//
class Ball extends Sprite {
    constructor() {
        super('ball')
        this.xSpeed = getRandomNumber(5, 7);
        this.ySpeed = 7 - this.xSpeed;
        this.bounces = 0;
        if (getRandomNumber(0, 1) === 1) {
            this.ySpeed = -this.ySpeed;
        }
        this.position = {
            'x': Number(gameboard.offsetWidth) / 2, 
            'y': Number(gameboard.offsetHeight) / 2
        };
        this.updateCSSPosition();
    }

    reset() {
        this.xSpeed = getRandomNumber(5, 7);
        this.ySpeed = 7 - this.xSpeed;
        if (getRandomNumber(0, 1) === 1) {
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

    checkWalls() {
        if (((this.position.x <= 31) && (this.position.y >= playerOnePaddle.position.y) && (this.position.y <= playerOnePaddle.position.y + 138)) || ((this.position.x >= gameboard.offsetWidth - 65) && (this.position.y >= playerTwoPaddle.position.y) && (this.position.y <= playerTwoPaddle.position.y + 138))) {
            this.xSpeed = -this.xSpeed;
            this.bounces++;
        } else if (this.position.x + 32 >= gameboard.offsetWidth) {
            playerOneScore++;
            gameActive = false;
            this.reset();
        } else if (this.position.x <= 0) {
            playerTwoScore++;
            gameActive = false;
            this.reset();
        }
        if ((this.position.y + 32 >= gameboard.offsetHeight) || (this.position.y <= 0)) {
            this.ySpeed = -this.ySpeed;
            this.bounces++;
        }
    }    
}

class Paddle extends Sprite {
    constructor(leftOrRight) {
        super('paddle')
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

const gameboard = document.getElementById('gameboard');

let playerOneScore = 0;
let playerTwoScore = 0;

let gameActive = false;

const ball = new Ball();
const playerOnePaddle = new Paddle('left');
const playerTwoPaddle = new Paddle('right');

const updateScores = () => {
    document.getElementById('player-one-score').innerHTML = playerOneScore;
    document.getElementById('player-two-score').innerHTML = playerTwoScore;
}

const movePaddles = () => {
    playerOnePaddle.move();
    playerTwoPaddle.move();
}

const updatePaddles = () => {
    playerOnePaddle.updateCSSPosition();
    playerTwoPaddle.updateCSSPosition();
}

const reset = () => {
    playerOnePaddle.reset();
    playerTwoPaddle.reset();
    ball.reset();
}

const update = () => {
    if (gameActive) {
        ball.move();
        ball.updateCSSPosition();
        ball.checkWalls();
        movePaddles();
        updatePaddles();
    }
    updateScores();
}

const start = () => {
    reset();
    gameActive = true;
    console.log('start');
}

const handleKeyDown = (event) => {
    switch (event.key) {
        case 's':
            playerOnePaddle.direction = 1;
            break;
        case 'w':
            playerOnePaddle.direction = -1;
            break;
        case '2':
            playerTwoPaddle.direction = 1;
            break;
        case '8':
            playerTwoPaddle.direction = -1;
            break;
    } 
}

const handleKeyUp = (event) => {
    switch (event.key) {
        case ' ':
            start();
            break;
        case 's':
            playerOnePaddle.direction = 0;
            break;
        case 'w':
            playerOnePaddle.direction = 0;
            break;
        case '2':
            playerTwoPaddle.direction = 0;
            break;
        case '8':
            playerTwoPaddle.direction = 0;
            break;
    } 
}

const resetScore = () => {
    playerOneScore = 0;
    playerTwoScore = 0;
}

const resetAll = () => {
    gameActive = false;
    reset();
    resetScore();
}

document.getElementById('start').onclick = start;
document.getElementById('reset').onclick = resetAll;
document.onkeydown = handleKeyDown;
document.onkeyup = handleKeyUp;

setInterval(update, 17);