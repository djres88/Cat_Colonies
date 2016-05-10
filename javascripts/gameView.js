var Game = require('./game.js');

function GameView() {}

GameView.prototype.start = function (canvasEl) {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a canvas DOM element.
    var ctx = canvasEl.getContext("2d");

    var game = new Game();
    var refresh = function() {
      game.moveObjects();
      game.draw(ctx);
    };

    setInterval(refresh,20);
};


module.exports = GameView;

window.Game = Game;
// window.movingObject = movingObject;
