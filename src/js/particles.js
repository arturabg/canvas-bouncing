// import utils from './utils'
//
// const canvas = document.querySelector('canvas')
// const c = canvas.getContext('2d')
//
// canvas.width = innerWidth
// canvas.height = innerHeight
//
// const mouse = {
//   x: innerWidth / 2,
//   y: innerHeight / 2
// }
//
// const colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];
//
// // Event Listeners
// addEventListener('mousemove', (event) => {
//   mouse.x = event.clientX
//   mouse.y = event.clientY
// })
//
// addEventListener('resize', () => {
//   canvas.width = innerWidth
//   canvas.height = innerHeight
//
//   init()
// })
//
// // Objects
// function Particle (x, y, radius, color) {
//   this.x = x;
//   this.y = y;
//   this.radius = radius;
//   this.color = color;
//   this.radians = Math.random() * Math.PI * 2;
//   this.velocity = 0.05;
//   this.distanceFromCenter = utils.randomIntFromRange(50, 100);
//   this.lastMouse = {x, y};
//
//   this.update = () => {
//     const lasPoint = {
//       x: this.x,
//       y: this.y
//     }
//
//     this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
//     this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;
//     this.radians += this.velocity;
//     this.x = this.lastMouse.x + Math.cos(this.radians) * this.distanceFromCenter;
//     this.y = this.lastMouse.y + Math.sin(this.radians) * this.distanceFromCenter;
//     this.draw(lasPoint)
//   }
//
//   this.draw = lasPoint => {
//     c.beginPath();
//     c.strokeStyle = this.color;
//     c.fillStyle = this.color;
//     c.lineWidth = this.radius;
//     c.moveTo(lasPoint.x, lasPoint.y);
//     c.lineTo(this.x, this.y);
//     c.fill();
//     c.stroke();
//     c.closePath();
//   }
// }
//
// // Implementation
// let particles;
// function init() {
//   particles = [];
//   const radius = (Math.random() * 2) + 1;
//   for (let i = 0; i < 50; i++) {
//     particles.push(new Particle(canvas.width / 2, canvas.height / 2, radius, utils.randomColor(colors)))
//   }
//   console.log(particles)
// }
//
// // Animation Loop
// function animate() {
//   requestAnimationFrame(animate)
//   c.fillStyle = "rgba(255, 255, 255, 0.03)"
//   //c.clearRect(0, 0, canvas.width, canvas.height)
//   c.fillRect(0, 0, canvas.width, canvas.height)
//   //c.fillText('HTML CANVAS', mouse.x, mouse.y)
//   for (let i = 0; i < particles.length; i++) {
//     particles[i].update();
//   }
// }
//
// init()
// animate()
