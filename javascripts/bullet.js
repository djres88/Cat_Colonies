var Util = require('./util');
var MovingObject = require('./movingObject');
var Planet = require('./planet');

var Bullet = function(options) {
  options.radius = 3;
  options.color = "#FFFF66";

  MovingObject.call(this, options);
};

Bullet.SPEED = 6;

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;
