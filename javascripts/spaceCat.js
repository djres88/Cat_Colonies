var MovingObject = require('./movingObject');
var Util = require('./util');
var key = require('../keymaster.js');

function SpaceCat(options) {
  options.pos = options.pos || [800, 400];
  options.vel = options.vel || [0.0, 0.0];
  options.rotation = options.rotation || 0;

  MovingObject.call(this, options);
}

Util.inherits(SpaceCat, MovingObject);

SpaceCat.prototype.go = function(direction) {
  this.vel[0] += direction[0]*(Math.round(Math.cos(this.rotation)));
  this.vel[1] += direction[1]*(Math.round(Math.sin(this.rotation)));

  if (Math.abs(this.vel[0]) >= 8) {
    this.vel[0] -= direction[0]*(this.rotation/Math.PI);
  }
  if (Math.abs(this.vel[1]) >= 8) {
    this.vel[1] -= direction[1]*(this.rotation/Math.PI);
    return;
  }
};

SpaceCat.prototype.movements = function() {
  var spacecat = this;
  var MOVES = {
    //TODO: change to dynamically go back/fwd based on this.rotation
    "up": [1, 1],
    "down": [-1, -1]
    // "left": [-1, 0],
    // "right": [1, 0]
  };
  Object.keys(MOVES).forEach(function(keypress) {
    var direction = MOVES[keypress];
    key(keypress, function() {
      spacecat.go(direction);
    });
  });
};

SpaceCat.prototype.rotations = function() {
  // ctx.drawImage(img,this.pos[0],this.pos[1], 50, 50);

  var ROTATIONS = {
    "left": 7,
    "right": 1
  };

  var spacecat = this;
  Object.keys(ROTATIONS).forEach(function(keypress) {

    var direction = ROTATIONS[keypress];
    key(keypress, function() {
      spacecat.rotation += (direction*Math.PI/4);
      spacecat.rotation %= (Math.PI*2);
      console.log(spacecat.rotation);
    });
  });
};

SpaceCat.prototype.draw = function(ctx) {
  var img = document.getElementById("space-cat");
  var rotate = this.rotation;
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(rotate); // rotate
  ctx.drawImage(img,-25,-25,50,50); // draws a chain link or dagger
  ctx.rotate(-rotate);
  ctx.translate(-this.pos[0], -this.pos[1]);
};



module.exports = SpaceCat;
