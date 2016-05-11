var Planet = require("./planet.js");
var SpaceCat = require('./spaceCat.js');

function Game() {
  this.DIM_X = 1600;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 5;
  this.won = false;
  this.sumPlanetLives = this.NUM_ASTEROIDS*3;
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
  if (game.won) {

  }

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

Game.prototype.logCollisions = function() {
  var game = this;
  this.sumPlanetLives = 0;
  game.planets.forEach(function(planet, planetIdx) {
    game.bullets.forEach(function(bullet, bulletIdx) {
      if (planet.hitBy(bullet)) {
        planet.damage();
        //TODO: and destroy the bullet
        game.bullets.splice(bulletIdx);
        // console.log(game.bullets);
      }
      if (bullet.pos[0] < 0 || bullet.pos[0] > 1600 ||
        bullet.pos[1] < 0 || bullet.pos[1] > 800) {
        game.bullets.splice(bulletIdx);
      }
    });

    // console.log(planet, game.cat);
    if (game.cat.hitBy(planet)) {
      // TODO: end the game
      // game.over();
      game.cat.lives -= 1;
      // console.log(game.cat.lives);
    }
    this.sumPlanetLives += planet.lives;
  });
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

Game.prototype.remove = function(arr, itemIdx) {
  arr = arr.slice(0, itemIdx-1).concat(arr.slice(itemIdx));
};

module.exports = Game;
