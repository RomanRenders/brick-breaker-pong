import Game from "/src/game";

let canvas = document.getElementById("gameScreen");
let cxt = canvas.getContext("2d");

const GAME_WIDTH = 800; // original: width 800, height 600
const GAME_HEIGHT = 600;

let game = new Game(GAME_WIDTH, GAME_HEIGHT);

let lastTime = 0;

function gameLoop(timestamp) {
  let deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  cxt.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  game.update(deltaTime);
  game.draw(cxt);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
