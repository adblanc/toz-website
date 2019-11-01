const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const bubbles = [];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Bubble {
  constructor(x, y, dx, dy, radius, dirX, strokeColor, fillColor) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.dirX = dirX;
    this.strokeColor = strokeColor;
    this.fillColor = fillColor;
    this.state = 1;
  }
  draw() {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.fillColor;
    c.strokeStyle = this.strokeColor;
    c.fill();
    c.stroke();
    c.closePath();
  }

  update() {
    if (this.y + this.radius >= 0) {
      this.x += this.dx * this.dirX;
      this.y += this.dy;
      this.dx *= 0.95;
      this.radius -= -0.001;
    } else this.state = 0;
    this.draw();
  }
}

const mouse = {
  x: undefined,
  y: undefined
};

function createNewBubble(x, y) {
  const radius = Math.random() * 10 + 5;
  const dx = Math.random() * 5 + 1;
  let dy = Math.random() * 2 + 1;
  if (dy > 0) dy *= -1;
  let dirX = getRandomInt(1, 2);
  if (dirX == 2) dirX = -1;
  const bubble = new Bubble(
    x,
    y,
    dx,
    dy,
    radius,
    dirX,
    "rgba(255, 255, 255, 1)",
    "rgba(255, 255, 255, 0)"
  );
  bubbles.push(bubble);
}

addEventListener("mousemove", event => {
  mouse.x = event.clientX;
  mouse.y = event.clientY;
});

addEventListener("resize", event => {
  canvas.x = window.innerWidth;
  canvas.y = window.innerHeight;
});

addEventListener("mousedown", event => {
  createNewBubble(mouse.x, mouse.y);
});

setInterval(() => {
  const x = getRandomInt(1, innerWidth);
  createNewBubble(x, innerHeight);
}, Math.random() * (2000 - 1000) + 1000);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach(bubble => {
    if (bubble.y + bubble.radius >= 0) bubble.update();
  });
}
animate();
