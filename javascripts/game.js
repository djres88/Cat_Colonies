var Asteroid = require("./asteroid.js");

function Game() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 4;
  this.asteroids = [];
  this.addAsteroids();
}

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    var a = new Asteroid({pos: this.randomPosition(), game: this});
    this.asteroids.push(a);
  }
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);

  this.asteroids.forEach(function(asteroid) {
    asteroid.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.asteroids.forEach(function(asteroid) {
    asteroid.move();
  });

};

Game.prototype.randomPosition = function() {
  var x = this.DIM_X * Math.random();
  var y = this.DIM_Y * Math.random();
  return [x, y];
};

Game.prototype.wrap = function (pos) {
  pos[0] = pos[0] % 800;
  pos[1] = pos[1] % 800;
  return [pos[0], pos[1]];
};

module.exports = Game;
