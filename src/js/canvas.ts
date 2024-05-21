import "../styles/style.css"
import { randomIntFromRange, randomColor, colors } from './utils'
import { ImageUrl, BallGravity } from "../enums/ball";

import earth from "../assets/earth.jpeg"
import moon from "../assets/moon.jpg"
import sun from "../assets/sun.jpeg"
import brokenGlass from "../assets/broken-glass.jpeg";
const breakingSoundFile = require("../assets/breaking-sound.wav"); // important to import this file even if it would not be used
const mouseClickFile = require("../assets/mouse-click.mp3"); // important to import this file even if it would not be used
const bubbleFile = require("../assets/bubble.wav"); // important to import this file even if it would not be used
// @ts-ignore
import breakingSound from "../assets/breaking-sound.wav"
// @ts-ignore
import mouseSound from "../assets/mouse-click.mp3"
// @ts-ignore
import bubble from "../assets/bubble.wav"

let GravitySurface = localStorage.getItem("gravityTypeValue") || earth;
let gameInstance: BallsGame;

const selectionElement: HTMLSelectElement = document.getElementById('count') as HTMLSelectElement;
const gravityTypeElement: HTMLSelectElement = document.getElementById("planet") as HTMLSelectElement;

const canvas: HTMLCanvasElement = document.querySelector('canvas')
const context2D: CanvasRenderingContext2D = canvas.getContext('2d')

canvas.width = innerWidth / 2;
canvas.height = innerHeight / 2;

gravityTypeElement.onchange = (): void => {
  const gravityTypeValue = gravityTypeElement.options[gravityTypeElement.selectedIndex].value;

  gameInstance.selectBckgImgAndSurface(gravityTypeValue)
}

addEventListener('resize', () => {
  canvas.width = innerWidth / 2
  canvas.height = innerHeight / 2
})

function canvasEvents(): void {
  canvas.onclick = (ev: MouseEvent): void => {
    gameInstance.onBoardClick(ev)
  }
  canvas.onmouseenter = (): void => {
    document.body.setAttribute("style", "cursor: pointer");
  }

  canvas.onmouseleave = (): void => {
    document.body.setAttribute("style", "cursor: default");
  }
}

class Ball {

  private x: number
  private y: number
  private dx: number
  private dy: number
  private readonly radius: number
  private readonly color: string
  private increasingNum: number

  protected requestAnimationFrameId: number

  protected static friction: number = 0.60;
  protected static gravity: number = BallGravity.earth;

  constructor(x: number, y: number, dx: number, dy: number, radius: number, color: string) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy;
    this.radius = radius
    this.color = color

    this.increasingNum = 0
  }

  public drawBalls (): void {
    context2D.beginPath()
    context2D.strokeStyle = `rgb(0 ${Math.floor(255 - 42.5 * (Math.random() * 0.5))} ${Math.floor(
        255 - 42.5 * (Math.random() * 0.5),
    )})`;
    context2D.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    context2D.fillStyle = this.color;
    context2D.fill();
    context2D.stroke();
    context2D.closePath();
  }

  public updateBalls (animationFrameId: number): void {
    this.requestAnimationFrameId = animationFrameId;

    if (Math.floor(this.y + this.radius + this.dy - Ball.gravity) > canvas.height) {
      this.increasingNum++;
      this.dx = this.dx / this.increasingNum
      this.isBallTouchingFloor()
    }

    if (this.y + this.radius + this.dy > canvas.height) {
      this.dy = -this.dy * Ball.friction;
    } else {
      this.dy += Ball.gravity;
    }
    if (this.x + this.radius + this.dx > canvas.width || this.x - this.radius <= 0) {
      this.dx = -this.dx
    }

    this.x += this.dx;
    this.y += this.dy;

    this.drawBalls();
  }

  private isBallTouchingFloor () {

    const bubbleEffect: HTMLAudioElement = new Audio(bubble);
    bubbleEffect.play();
  }
}

class BallsGame extends Ball {

  public ballArray: any[] = [];

  private selectedCount: number = 0;
  private selectedBoardBallsPositions: { xPos: number, yPos: number }[] = []

  constructor() {
    super(null, null, null, null, null,null)
    this.ballArray = [];
    this.selectedBoardBallsPositions = []
    this.createCircleCountList()
    this.selectBckgImgAndSurface(GravitySurface);
  }

  private init (): void {
    this.ballArray = [];
    if (this.selectedBoardBallsPositions.length <= 0) {
      alert("Choose a bounce position")
      return
    }
    for (let i = 0; i < this.selectedBoardBallsPositions.length; i++) {
      const radius = randomIntFromRange(7, 12);
      const dx = randomIntFromRange(-2, 2);
      const dy = randomIntFromRange(-2, 2);
      const color = randomColor(colors)

      this.ballArray.push(new Ball(this.selectedBoardBallsPositions[i].xPos, this.selectedBoardBallsPositions[i].yPos, dx, dy, radius, color))
    }

  }

  private tick = (): void => {
    this.requestAnimationFrameId = requestAnimationFrame(this.tick)
    context2D.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < this.ballArray.length; i++) {
      this.ballArray[i].updateBalls(this.requestAnimationFrameId)
    }
  }

  public playGame = (): void => {
    this.selectedCount = 0
    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
    }

    this.init()
    this.tick()
  }

  public onBoardClick (ev: MouseEvent): void {
    this.selectedCount++

    if (this.selectedCount > +selectionElement.value) {
      this.selectedCount--;
      alert("You can choose circle depend on count")
      return
    }

    if (this.requestAnimationFrameId) {
      cancelAnimationFrame(this.requestAnimationFrameId);
      context2D.clearRect(0, 0, canvas.width, canvas.height);
      this.selectedBoardBallsPositions = [];
      this.requestAnimationFrameId = null
    }

    let xPosition = ev.pageX - canvas.offsetLeft;
    let yPosition = ev.pageY - canvas.offsetTop;

    const brokenGlassPic: HTMLImageElement = new Image();
    brokenGlassPic.src = brokenGlass;
    brokenGlassPic.onload = () => {
      context2D.drawImage(brokenGlassPic, xPosition - 5, yPosition - 5, 30, 20)
      const brokeSound: HTMLAudioElement = new Audio(breakingSound);//"../assets/breaking-sound.wav"
      brokeSound.play();
    }

    this.selectedBoardBallsPositions.push({
      xPos: xPosition,
      yPos: yPosition
    })
  }

  private createCircleCountList (): void {
    for (let i = 1; i <= 15; i++) {
      const option: HTMLOptionElement = document.createElement('option');

      option.value = i.toString();
      option.innerHTML = i.toString();

      selectionElement.appendChild(option);
    }
  }

  public selectBckgImgAndSurface (gravityType: string = ""): void {
    let gameBoard = document.getElementsByClassName("game-board")[0];
    gameBoard.setAttribute('style', 'background-repeat: no-repeat;')
    cancelAnimationFrame(this.requestAnimationFrameId)
    switch (gravityType) {
      case ImageUrl.moon:
        Ball.gravity = BallGravity.moon
        GravitySurface = ImageUrl.moon
        gameBoard.setAttribute('style', `background-image: url(${moon})`)
        localStorage.setItem("gravityTypeValue", GravitySurface)
        break;
      case ImageUrl.sun:
        Ball.gravity = BallGravity.sun
        GravitySurface = ImageUrl.sun
        gameBoard.setAttribute('style', `background-image: url(${sun})`)
        localStorage.setItem("gravityTypeValue", GravitySurface)
        break
      default:
        Ball.gravity = BallGravity.earth
        GravitySurface = ImageUrl.earth
        gameBoard.setAttribute('style', `background-image: url(${earth})`)
        localStorage.setItem("gravityTypeValue", GravitySurface);
    }

    for (let i = 0; i < gravityTypeElement.options.length; i++) {
      if (gravityTypeElement.options[i].value === GravitySurface) {
        gravityTypeElement.options[i].selected = true;
      }
    }
  }
}

canvasEvents()
gameInstance = new BallsGame();
document.getElementById("playGame").addEventListener("click", gameInstance.playGame)