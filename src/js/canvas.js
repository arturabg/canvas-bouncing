import utils from './utils'
import "../styles/style.css";

const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2
}

const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

let paddleBold = 16;
let paddleWidth = 150;
let paddleX = 30;
let relativeX = 0;
let paddleHeightY = canvas.height - 40;

let circleRadius = 30;
let x = (Math.random() * canvas.width) + (circleRadius * 2);
let y = (Math.random() + canvas.height / 2) + (circleRadius * 2);
let dx;
let dy;

// Event Listeners
addEventListener('mousemove', (event) => {
  mouse.x = event.clientX
  mouse.y = event.clientY
  relativeX = event.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
  if (relativeX + paddleWidth / 2 > canvas.width) {
    paddleX = canvas.width - paddleWidth;
  }
  if (paddleX < 0) {
    paddleX = 0
  }

})

addEventListener('resize', (e) => {
  canvas.height = innerHeight
  if (e.target.innerWidth < 800) {
    canvas.width = innerWidth
  } else {
    canvas.width = innerWidth - 200
  }
  //console.log(e)
  init()
})

function GamePlay (x, y, radius) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = 4;
    this.dy = 4;

    this.update = () => {
      // dx and dy condition
      if (this.x + this.radius > canvas.width || this.x + this.radius < this.radius * 2) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > canvas.height || this.y + this.radius < this.radius * 2) {
        this.dy = -this.dy;
      }
      //if (Math.floor(this.y + paddleHeightY) > canvas.height) {
        //console.log(canvas.height, 'canvas height', Math.floor(this.y + this.radius), 'radius and height together')
        //alert('game over')
        //this.dy = -3;
      //}
      if (this.x > paddleX && this.x < paddleX + paddleWidth
          && this.y + this.radius >= paddleHeightY) {
        console.log('Circle is touched')
        this.dy = -this.dy;
      }
      // if (this.x > paddleX && this.x < paddleX + paddleWidth &&
      //     this.y > paddleHeightY && this.y < paddleHeightY + paddleBold) {
      //   console.log('kpela koxqic')
      //   this.dx = -this.dx;
      // }
      this.x += this.dx;
      this.y += this.dy;
      //console.log(paddleX, 'paddleXXXX');
      //console.log(paddleHeightY, 'paddleHeight');
      this.drawPlayerLine();
      this.drawCircle();
    }
    this.drawPlayerLine = () => {
      // draw line
      c.beginPath();
      c.rect(paddleX, paddleHeightY, paddleWidth, paddleBold);
      c.fillStyle = "#0095DD";
      c.fill();
      c.closePath();

      // Text about game
      c.font = "25px Arial";
      c.fillText("Game board", (canvas.width / 2) - 50, canvas.height / 2);
      c.textAlign = "center";
    }

    this.drawCircle = () => {
      // draw circle
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      c.fillStyle = "red";
      c.fill();
      c.stroke();
    }
}

// Implementation
let gameStart;
function init() {
  //c.clearRect(0, 0, canvas.width, canvas.height)
  gameStart = []
  gameStart.push(new GamePlay(x, y, circleRadius));
}

function drawTopLine() {
  c.beginPath();
  c.lineWidth = 8;
  c.strokeStyle = 'green';
  c.moveTo(0, 0);
  c.lineTo(canvas.width, 0);
  c.stroke();
}
function drawLeftLine() {
  c.beginPath();
  c.lineWidth = 8;
  c.strokeStyle = 'green';
  c.moveTo(0, 0);
  c.lineTo(0, canvas.height);
  c.stroke();
}
function drawRightLine() {
  c.beginPath();
  c.lineWidth = 8;
  c.strokeStyle = 'green';
  c.moveTo(canvas.width, canvas.height);
  c.lineTo(canvas.width, 0);
  c.stroke();
}
function drawBottomLine() {
  c.beginPath();
  c.lineWidth = 10;
  c.strokeStyle = 'red';
  c.moveTo(0, canvas.height);
  c.lineTo(canvas.width, canvas.height);
  c.stroke();
}

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  // create canvas game board size
  c.beginPath();
  c.lineWidth = 4;
  c.strokeStyle = 'black';
  c.rect(0, 0, canvas.width, canvas.height);
  c.stroke();

  // row line for top side
  drawTopLine();
  // column left side
  //drawLeftLine();
  // column right side
  //drawRightLine();
  // row line for bottom side
  drawBottomLine();

  gameStart[0].update()
}

init()
animate()
// first commit
