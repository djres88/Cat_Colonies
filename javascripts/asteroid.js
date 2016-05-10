// Do we need to require all this stuff??
var MovingObject = require("./movingObject.js");
var Util = require("./util.js");

function Asteroid(hash) {
  hash.color = hash.color || "#008000";
  hash.radius = hash.radius || 10;
  hash.vel = hash.vel || Util.randomVec(5);
  MovingObject.call(this, hash);
}

Util.inherits(Asteroid, MovingObject);

module.exports = Asteroid;
