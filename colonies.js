var Game = require("./javascripts/game.js");
var GameView = require("./javascripts/gameView.js");
var M = require("./javascripts/movingObject.js");


var canvasEl = document.getElementById("game-canvas");
canvasEl.width = 1600;
canvasEl.height = 800;
var newGame = new GameView();
newGame.start(canvasEl);

function resetGame() {
  location.reload();
  var canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 1600;
  canvasEl.height = 800;
  var newGame = new GameView();
  newGame.start(canvasEl);
}

function showInstructions() {
  document.getElementById("show-instructions").style.display="block";
}

function hideInstuctions() {
  document.getElementById("show-instructions").style.display="none";
}

document.getElementById("how-to-play").onclick=showInstructions;

var exits = document.getElementsByClassName("exit");
for (var i = 0; i < exits.length; i++) {
  exits[i].onclick=hideInstuctions;
}

var buttons = document.getElementsByTagName("button");
for (var i = 0; i < buttons.length; i++) {
  buttons[i].onclick=resetGame;
}

// startGame();
// window.game = Game;
// window.gameview = GameView;
// window.m = M;
// window.n = newGame;
