const canvas = document.getElementById("myCanvas")
canvas.height = 720;
canvas.width = 1000;
const ctx = canvas.getContext("2d")

let playerSize = 26;
let playerx = canvas.width / 2;
let playery = canvas.height - playerSize;

let jumpCount = 0;
let jumpLength = 50;
let jumpHeight = 0;

let dx = 6;
let dy = -6;

let isRight = false;
let isLeft = false;
let isJump = false;

document.addEventListener("keyup", keyUpHandler, false)
document.addEventListener("keydown", keyDownHandler, false)

function keyDownHandler(e) {
    if (e.code == "KeyD") {
        isRight = true;
    } else if (e.code == "KeyA") {
        isLeft = true;
    } else if (e.code == "KeyW") {
        isJump = true;
    }
}

function keyUpHandler(e) {
    if (e.code == "KeyD") {
        isRight = false;
    } else if (e.code == "KeyA") {
        isLeft = false;
    }
}

function drawPlayer() {
    ctx.beginPath()
    ctx.arc(playerx, playery - jumpHeight, playerSize, 0, Math.PI * 2)
    ctx.fillStyle = "#0095DD"
    ctx.fill()
    ctx.closePath()
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer()

    if (isRight && playerx < canvas.width - playerSize) {
        playerx += dx;
    }
    if (isLeft && playerx > playerSize) {
        playerx -= dx;
    }
    if (isJump) {
        jumpCount++;
        jumpHeight = 4 * jumpLength * Math.sin(Math.PI * jumpCount / jumpLength);
    }
    if (jumpCount > jumpLength) {
        jumpCount = 0;
        isJump = false;
        jumpHeight = 0;
    }
}

setInterval(draw, 10)