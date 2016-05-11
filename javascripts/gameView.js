var Game = require('./game.js');

function GameView() {
}

GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");

    var game = new Game();
    game.cat.movements();
    game.cat.rotations();
    var refresh = function() {
      game.moveObjects();
      game.logCollisions();
      game.over(ctx);
      game.draw(ctx);
      game.cat.draw(ctx);
    };

    setInterval(refresh, 10);
};

module.exports = GameView;
