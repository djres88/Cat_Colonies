var Planet = require("./planet.js");
var SpaceCat = require('./spaceCat.js');

function Game() {
  this.DIM_X = 1600;
  this.DIM_Y = 800;
  this.NUM_PLANETS = 4;
  this.won = false;
  this.planetsConquered = 0;
  this.planets = [];
  this.bullets = [];
  this.cat = new SpaceCat({game: this});
  this.addPlanets();
}

Game.prototype.addPlanets = function() {
  for (var i = 0; i < this.NUM_PLANETS; i++) {
    var a = new Planet({pos: this.randomPosition(), game: this});
    this.planets.push(a);
  }
};

Game.prototype.addBullet = function(bullet) {
  this.bullets.push(bullet);
};

Game.prototype.draw = function (ctx) {
  if (this.over()) {
    return;
  } else {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.planets.forEach(function(planet, idx) {
      planet.draw(ctx, idx+1);
    });

    this.bullets.forEach(function(bullet) {
      bullet.draw(ctx);
    });
  }
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
  this.planetsConquered = 0;
  var planetsConquered = this.planetsConquered;
  game.planets.forEach(function(planet, planetIdx) {
    game.bullets.forEach(function(bullet, bulletIdx) {
      if (planet.hitBy(bullet)) {
        planet.damage();
        game.bullets = game.bullets.slice(0, bulletIdx).concat(game.bullets.slice(bulletIdx+1, game.bullets.length));
      }
      if (bullet.pos[0] < 0 || bullet.pos[0] > 1600 ||
        bullet.pos[1] < 0 || bullet.pos[1] > 800) {
        game.bullets = game.bullets.slice(0, bulletIdx).concat(game.bullets.slice(bulletIdx+1, game.bullets.length));
      }
    });

    // console.log(planet, game.cat);
    if (game.cat.hitBy(planet)) {
      if (planet.lives > 0) {
        game.cat.lives -= 1;
        // TODO: replace cat in center iff not in danger;
        // game.cat.respawn();
        // console.log(game.cat.lives);
      } else {
        planet.status = "conquered";
      }
    }
    if (planet.status === "conquered") {
      planetsConquered += 1;
    }
  });
  this.planetsConquered = planetsConquered;
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

Game.prototype.over = function(ctx) {
  if (this.planetsConquered === this.NUM_PLANETS) {
    document.getElementsByClassName("status-messages")[0].style.display="block";
    document.getElementById("game-won-message").style.display="block";
  } else if (this.cat.lives === 0) {
    document.getElementById("game-lost-message").style.display="block";
    document.getElementsByClassName("status-messages")[0].style.display="block";
  } else {
    return;
  }
};

module.exports = Game;
