import Paddle from "./Paddle.js";
import Ball from "./Ball.js";

const gameboard = document.getElementById('gameboard');

let playerOneScore = 0;
let playerTwoScore = 0;

let gameActive = false;

const ball = new Ball(gameboard);
const playerOnePaddle = new Paddle(gameboard, 'left');
const playerTwoPaddle = new Paddle(gameboard, 'right');

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
        ball.checkWalls(
            playerOnePaddle, 
            playerTwoPaddle, 
            () => playerOneScore++, 
            () => playerTwoScore++,
            (newValue) => gameActive = newValue
        );
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
        case 'ArrowDown':
            playerTwoPaddle.direction = 1;
            break;
        case 'ArrowUp':
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
        case 'ArrowDown':
            playerTwoPaddle.direction = 0;
            break;
        case 'ArrowUp':
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