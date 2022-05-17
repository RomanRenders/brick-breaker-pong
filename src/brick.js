import { detectCollision } from "./collisionDetection";

export default class Brick {
  constructor(game, position) {
    this.image = document.getElementById("img_brick");

    this.game = game;

    this.position = position;
    this.width = 50;
    this.height = 50;

    this.menuHeight = 300;
    this.menuWidth = 200;

    this.x = 300;
    this.y = 20; // ADDED FOR MENU IMAGE

    this.markedForDeletion = false;
  }

  update() {
    if (detectCollision(this.game.ball, this)) {
      // detects if ball hits brick
      this.game.ball.speed.y = -this.game.ball.speed.y;
      this.markedForDeletion = true;
    }
  }

  draw(cxt) {
    // no change
    cxt.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    );
  }
}
