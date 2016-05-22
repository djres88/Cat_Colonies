var Game = require('./game.js');
var key = require('../keymaster.js');
function GameView() {
}

GameView.prototype.start = function (canvasEl, game) {
  key.unbind('enter');
  var ctx = canvasEl.getContext("2d");

  game.cat.movements();
  game.cat.rotations();

  // Set objects in motion for a couple seconds w/o checking for collisions. Gives user a chance before losing.
  var initialState = setInterval(function() {
    game.moveObjects();
    game.draw(ctx);
    game.cat.draw(ctx);
  }, 10);

  // Normal game logic. Note only difference is presence of logCollisions and game.over checking.
  var refresh = function() {
    game.moveObjects();
    game.logCollisions();
    game.over(ctx);
    game.draw(ctx);
    game.cat.draw(ctx);
  };

  //After 1.5 seconds, switch from initial logic to normal game logic.
  setTimeout(function() {
    clearInterval(initialState);
    setInterval(refresh, 10);
  }, 1500);

};

// GameView.prototype.end = function (canvasEl) {
//   var ctx = canvasEl.getContext("2d");
//   ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
// };

module.exports = GameView;
