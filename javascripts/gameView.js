var Game = require('./game.js');

function GameView() {}

GameView.prototype.moves = function() {
  var MOVES = {
    "up": [0, 1],
    "down": [0, -1],
    "left": [-1, 0],
    "right": [1, 0]
  };

  Object.keys(MOVES).forEach(function(keypress) {
    var direction = MOVES[keypress];
    key(keypress, function() {
      spacecat.pos = [spacecat.pos[0] + direction[0], spacecat.pos[1] + direction[1]];
    });
  });
};

GameView.prototype.start = function (canvasEl) {
    // get a 2d canvas drawing context. The canvas API lets us call
    // a `getContext` method on a canvas DOM element.
    var ctx = canvasEl.getContext("2d");
    var game = new Game();
    var refresh = function() {
      game.moveObjects();
      game.draw(ctx);
    };

    setInterval(refresh, 20);
};


module.exports = GameView;

window.Game = Game;
// window.movingObject = movingObject;
