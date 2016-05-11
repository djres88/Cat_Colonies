var Planet = require("./planet.js");
var SpaceCat = require('./spaceCat.js');

function Game() {
  this.DIM_X = 1600;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 5;
  this.planets = [];
  this.bullets = [];
  this.cat = new SpaceCat({game: this});
  this.addPlanets();
}

Game.prototype.addPlanets = function() {
  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
    var a = new Planet({pos: this.randomPosition(), game: this});
    this.planets.push(a);
  }
};

Game.prototype.addBullet = function(bullet) {
  this.bullets.push(bullet);
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.planets.forEach(function(planet) {
    planet.draw(ctx);
  });

  this.bullets.forEach(function(bullet) {
    bullet.draw(ctx);
  });
};

Game.prototype.moveObjects = function () {
  this.planets.forEach(function(planet) {
    planet.move();
  });
  this.bullets.forEach(function(bullet) {
    bullet.move();
  });
  this.cat.move();
};

Game.prototype.randomPosition = function() {
  var x = this.DIM_X * Math.random();
  var y = this.DIM_Y * Math.random();
  return [x, y];
};

Game.prototype.wrap = function (pos) {
  if (pos[0] <= -50) {
    pos[0] += 1650;
  }
  if (pos[1] <= -50) {
    pos[1] += 850;
  }
  pos[0] = pos[0] % 1650;
  pos[1] = pos[1] % 850;
  return [pos[0], pos[1]];
};

module.exports = Game;
