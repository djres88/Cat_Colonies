var Game = require("./javascripts/game.js");
var GameView = require("./javascripts/gameView.js");
var M = require("./javascripts/movingObject.js");
var key = require('./keymaster.js');

key('enter', function() {
  startGame();
});

function startGame() {
  hideInstuctions();
  var canvasEl = document.getElementById("game-canvas");
  canvasEl.width = 1600;
  canvasEl.height = 800;
  var newGame = new GameView();
  var game = new Game();
  newGame.start(canvasEl, game);
}

function resetGame() {
  location.reload();
}

function showInstructions() {
  document.getElementById("show-instructions").style.display="block";
}

function hideInstuctions() {
  document.getElementById("show-instructions").style.display="none";
}

document.getElementById("how-to-play").onclick=showInstructions;


// Add click listeners:
var exits = document.getElementsByClassName("exit");
for (var i = 0; i < exits.length; i++) {
  exits[i].onclick=hideInstuctions;
}

var btnPlayAgain = document.getElementsByClassName("btn-play-again");
for (var i = 0; i < btnPlayAgain.length; i++) {
  btnPlayAgain[i].onclick=resetGame;
}

var btnStart = document.getElementById("btn-start");
btnStart.onclick=startGame;

// startGame();
// window.game = Game;
// window.gameview = GameView;
// window.m = M;
// window.n = newGame;
