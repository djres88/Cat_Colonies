var Planet = require("./planet.js");
var SpaceCat = require('./spaceCat.js');

function Game() {
  this.DIM_X = 1600;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 4;
  this.asteroids = [];
  this.cat = new SpaceCat({pos: [800, 400], game: this});
  this.addPlanets();
}

Game.prototype.addPlanets = function() {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    var a = new Planet({pos: this.randomPosition(), game: this});
    this.asteroids.push(a);
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  this.asteroids.forEach(function(asteroid) {
    asteroid.draw(ctx);
  });
  this.cat.draw(ctx);
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(function(asteroid) {
    asteroid.move();
  });
  // this.cat.move();
};

Game.prototype.randomPosition = function() {
  var x = this.DIM_X * Math.random();
  var y = this.DIM_Y * Math.random();
  return [x, y];
};

Game.prototype.wrap = function (pos) {
  pos[0] = pos[0] % 1600;
  pos[1] = pos[1] % 800;
  return [pos[0], pos[1]];
};

module.exports = Game;
