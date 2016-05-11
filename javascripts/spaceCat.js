var MovingObject = require('./movingObject');
var Util = require('./util');
var key = require('../keymaster.js');

function SpaceCat(options) {
  options.pos = options.pos || [800, 400];
  options.vel = options.vel || [0, 0];
  options.rotation = options.rotation || 0;

  MovingObject.call(this, options);
}

Util.inherits(SpaceCat, MovingObject);

SpaceCat.prototype.go = function(direction) {
  this.vel[0] += direction[0];
  this.vel[1] += direction[1];

  if (Math.abs(this.vel[0]) >= 8) {
    this.vel[0] -= direction[0];
  }
  if (Math.abs(this.vel[1]) >= 8) {
    this.vel[1] -= direction[1];
    return;
  }
  console.log(this.vel);
};

SpaceCat.prototype.movements = function() {
  var spacecat = this;
  var MOVES = {
    //TODO: change to dynamically go back/fwd based on this.rotation
    "up": [0, -1],
    "down": [0, 1]
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
//

// SpaceCat.prototype.rotate = function(direction, ctx) {
//   this.rotation = (Math.PI);
//   ctx.rotate(this.rotation);
//   var img = document.getElementById("space-cat");
//   ctx.drawImage(img,this.pos[0],this.pos[1], 50, 50);
//   ctx.rotate(-this.rotation);
// };
//
SpaceCat.prototype.rotations = function(ctx) {
  // ctx.drawImage(img,this.pos[0],this.pos[1], 50, 50);

  var ROTATIONS = {
    "left": -1,
    "right": 1
  };

  var spacecat = this;
  Object.keys(ROTATIONS).forEach(function(keypress) {

    var direction = ROTATIONS[keypress];
    key(keypress, function() {
      this.rotation = direction*Math.PI;
    });
  });
};

SpaceCat.prototype.draw = function(ctx) {
  var img = document.getElementById("space-cat");
  this.rotation += 0.1;
  ctx.translate(this.pos[0], this.pos[1]);
  ctx.rotate(this.rotation); // rotate
  ctx.drawImage(img,-25,-25,50,50); // draws a chain link or dagger
  ctx.rotate(-this.rotation);
  ctx.translate(-this.pos[0], -this.pos[1]);
};



module.exports = SpaceCat;
