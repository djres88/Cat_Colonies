// Do we need to require all this stuff??
var MovingObject = require("./movingObject.js");
var Util = require("./util.js");

function Planet(hash) {
  hash.color = hash.color || "#008000";
  hash.radius = hash.radius || 20;
  hash.vel = hash.vel || Util.randomVec(Math.random()*3 + 2);
  hash.lives = 3;

  MovingObject.call(this, hash);
}

Planet.prototype.hit = function() {
  this.lives -= 1;
};

Util.inherits(Planet, MovingObject);

module.exports = Planet;
