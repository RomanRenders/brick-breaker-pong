export default class Paddle {
  constructor(game) {
    // refactored alongside ball.js to take properties from a common source (game) so they aren't rewritten so much
    this.gameWidth = game.gameWidth;

    this.width = 150;
    this.height = 30;

    this.maxSpeed = 10; // Original: 10
    this.speed = 0;

    this.position = {
      x: game.gameWidth / 2 - this.width / 2,
      y: game.gameHeight - this.height - 10
    };
  }

  moveLeft() {
    this.speed = -this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }

  draw(cxt) {
    cxt.fillStyle = "#0ff";
    cxt.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    this.position.x += this.speed;

    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.width > this.gameWidth)
      this.position.x = this.gameWidth - this.width;
  }
}
