var Game = require("./javascripts/game.js");
var GameView = require("./javascripts/gameView.js");
var M = require("./javascripts/movingObject.js");

var canvasEl = document.getElementById("game-canvas");
canvasEl.width = 1600;
canvasEl.height = 800;

var newGame = new GameView();
newGame.start(canvasEl);

window.game = Game;
window.gameview = GameView;
window.m = M;
window.n = newGame;
