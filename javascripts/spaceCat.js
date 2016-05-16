var MovingObject = require('./movingObject');
var Util = require('./util');
var Bullet = require('./bullet');
var key = require('../keymaster.js');

function SpaceCat(options) {
  options.pos = options.pos || [800, 400];
  options.vel = options.vel || [0.0, 0.0];
  options.rotation = options.rotation || 0;
  options.lives = options.lives || 3;
  // Solely for checking collisions:
  options.radius = 20;

  MovingObject.call(this, options);
  this.wraps = true;

}

Util.inherits(SpaceCat, MovingObject);

SpaceCat.prototype.go = function(direction) {
  this.vel[0] += direction[0]*(Math.cos(this.rotation));
  this.vel[1] += direction[1]*(Math.sin(this.rotation));

  if (Math.abs(this.vel[0]) >= 5) {
    this.vel[0] -= direction[0]*(Math.cos(this.rotation));
  }
  if (Math.abs(this.vel[1]) >= 5) {
    this.vel[1] -= direction[1]*(Math.sin(this.rotation));
    return;
  }
};

SpaceCat.prototype.movements = function() {
  var spacecat = this;
  var MOVES = {
    "up": [1, 1],
    "down": [-1, -1]
  };
  Object.keys(MOVES).forEach(function(keypress) {
    var direction = MOVES[keypress];
    key(keypress, function() {
      spacecat.go(direction);
    });
  });

  key('space', function() {
    spacecat.fire();
  });
};

SpaceCat.prototype.rotations = function() {
  var ROTATIONS = {
    "left": 345,
    "right": 15
  };

  var spacecat = this;
  Object.keys(ROTATIONS).forEach(function(keypress) {

    var direction = ROTATIONS[keypress];
    key(keypress, function() {
      spacecat.rotation += (direction*(Math.PI/180));
      spacecat.rotation %= (Math.PI*2);
    });
  });
};

SpaceCat.prototype.draw = function(ctx) {
  var img = document.getElementById("space-cat");
  var rotate = this.rotation;
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(rotate);
  ctx.drawImage(img,-25,-25,50,50);
  ctx.rotate(-rotate);
  ctx.translate(-this.pos[0], -this.pos[1]);
};

SpaceCat.prototype.fire = function() {
  var velocity = [Bullet.SPEED * (Math.cos(this.rotation)), Bullet.SPEED *(Math.sin(this.rotation))];
  var pos = this.pos.slice(0);
  var spacecat = this;
  var bullet = new Bullet({
    pos: pos,
    vel: velocity,
    game: this.game
  });

  this.game.addBullet(bullet);
};

module.exports = SpaceCat;
