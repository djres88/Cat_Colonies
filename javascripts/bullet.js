var Util = require('./util');
var MovingObject = require('./movingObject');
var Planet = require('./planet');
var SpaceCat = require('./SpaceCat');

var Bullet = function(options) {
  options.radius = Bullet.RADIUS;
  options.vel = Bullet.SPEED;
  options.color = Bullet.COLOR;
  options.pos = SpaceCat.pos;

  MovingObject.call(this, options);
};

Util.inherits(Bullet, MovingObject);


Bullet.RADIUS
