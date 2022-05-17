import Paddle from "/src/paddle";
import InputHandler from "/src/input";
import Ball from "/src/ball";
import Brick from "/src/brick";

import { buildLevel, level1, level2, level3, level4 } from "/src/levels";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
};

export default class Game {
  constructor(gameWidth, gameHeight) {
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.gamestate = GAMESTATE.MENU;
    this.ball = new Ball(this);
    this.paddle = new Paddle(this); //this.brick = new Brick(this); // ADDED SINGLE BRICK OBJECT
    this.brick = new Brick(this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;

    this.levels = [level3, level2, level1, level4];
    this.currentLevel = 0;

    new InputHandler(this.paddle, this);
  }

  start() {
    if (
      this.gamestate !== GAMESTATE.MENU &&
      this.gamestate !== GAMESTATE.NEWLEVEL
    )
      return;

    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.ball, this.paddle];

    this.gamestate = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.gamestate = GAMESTATE.GAMEOVER;

    if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU ||
      this.gamestate === GAMESTATE.GAMEOVER
    )
      return;

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach((object) =>
      object.update(deltaTime)
    );

    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  draw(cxt) {
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(cxt));

    if (this.gamestate === GAMESTATE.PAUSED) {
      cxt.rect(0, 0, this.gameWidth, this.gameHeight);
      cxt.fillStyle = "rgba(0, 0, 0, 1)";
      cxt.fill();

      cxt.font = "30px Ariel";
      cxt.fillStyle = "white";
      cxt.textAlign = "center";
      cxt.fillText("SUPANIGGA", this.gameWidth / 2, this.gameHeight / 2);
    }

    if (this.gamestate === GAMESTATE.MENU) {
      // cxt.rect(0, 0, this.gameWidth, this.gameHeight);
      // cxt.fillStyle = "rgba(0,0,0,1)";
      // cxt.fill();

      // cxt.font = "30px Arial";
      // cxt.fillStyle = "white";
      // cxt.textAlign = "center";
      // cxt.fillText(
      //   "Press SPACEBAR To Start",
      //   this.gameWidth / 2,
      //   this.gameHeight / 2
      // );
      // cxt.rect(0, 0, this.gameWidth, this.gameHeight);
      cxt.fillStyle = "rgba(0, 0, 0, 0)";
      cxt.fill();

      // TODO: DRAW FACE
      this.ball.draw(cxt);

      let image = this.brick.image;
      let x = this.brick.x;
      let y = this.brick.y;
      let width = this.brick.menuWidth;
      let height = this.brick.menuHeight;
      cxt.drawImage(image, x, y, width, height);

      cxt.font = "30px Ariel";
      cxt.fillStyle = "purple";
      cxt.textAlign = "center";
      cxt.fillText(
        "CRACKHEAD CLEANUP SIMULATOR",
        this.gameWidth / 2,
        this.gameHeight / 2
      );
      cxt.fillText(
        "press Space to start",
        this.gameWidth / 2,
        this.gameHeight / 1.3 // ADDED MORE TEXT TO MENU
      );
    }
    if (this.gamestate === GAMESTATE.GAMEOVER) {
      cxt.rect(0, 0, this.gameWidth, this.gameHeight);
      cxt.fillStyle = "rgba(0, 0, 0, 0.5)";
      cxt.fill();

      cxt.font = "30px Ariel";
      cxt.fillStyle = "purple";
      cxt.textAlign = "center";
      cxt.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  togglePause() {
    if (this.gamestate === GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
