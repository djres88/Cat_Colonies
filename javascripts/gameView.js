var Game = require('./game.js');

function GameView() {

}

GameView.prototype.start = function (canvasEl) {
    var ctx = canvasEl.getContext("2d");


    var game = new Game();
    game.cat.movements();
    var refresh = function() {
      game.moveObjects();
      game.draw(ctx);
      game.cat.draw(ctx);
    };


    setInterval(refresh, 20);
};


module.exports = GameView;

window.Game = Game;
// window.movingObject = movingObject;
