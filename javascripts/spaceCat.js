var MovingObject = require('./movingObject');
var Util = require('./util');

function SpaceCat(options) {
  options.pos = options.pos || [800, 400];
  options.vel = options.vel || 0;
  options.rotation = options.rotation || 0;

  MovingObject.call(this, options);
}

Util.inherits(SpaceCat, MovingObject);


SpaceCat.prototype.rotate = function(keypress) {
  var ROTATIONS = {
    // up: [0, 1],
    // down: [0, -1],
    // left: [-1, 0],
    // right: [1, 0]
  };

};

SpaceCat.prototype.draw = function(ctx) {
  var img = document.getElementById("space-cat");
  ctx.drawImage(img, this.pos[0], this.pos[1], 50, 50);
};



module.exports = SpaceCat;
