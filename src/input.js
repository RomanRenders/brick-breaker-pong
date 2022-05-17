export default class InputHandler {
  constructor(paddle, game) {
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;

        case 39:
          paddle.moveRight();
          break;

        case 32: // spacebar starts the game
          game.start();
          break;
      }
    });

    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        case 37:
          if (paddle.speed < 0) paddle.stop();
          break;

        case 39:
          if (paddle.speed > 0) paddle.stop();
          break;

        case 27: // NEW CASE FOR ESCAPE KEY (PAUSE MENU)
          game.togglePause();
          break;
      }
    });
  }
}
