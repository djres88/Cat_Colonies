// Do we need to require all this stuff??
var MovingObject = require("./movingObject.js");
var Util = require("./util.js");

function Planet(hash) {
  hash.color = hash.color || "#008000";
  hash.lives = this.lives || 3;
  hash.radius = hash.radius || 40;
  hash.vel = hash.vel || Util.randomVec(Math.random()*3 + 2);

  MovingObject.call(this, hash);
  this.wraps = true;
}

Util.inherits(Planet, MovingObject);

Planet.prototype.draw = function(ctx, idx) {
  if (this.status === "conquered") {
    return;
  } else {

    var imgFileName = "planet-" + idx;
    var img = document.getElementById(imgFileName);

    ctx.translate(this.pos[0], this.pos[1]);
    switch (this.lives) {
      case 3:
        ctx.strokeStyle="red";
        break;
      case 2:
        ctx.strokeStyle="orange";
        break;
      case 1:
        ctx.strokeStyle="yellow";
        break;
      case 0:
        ctx.strokeStyle="black";
        break;
    }
    var width = (2*this.lives)+ 2;
    if (width > 0) {
      ctx.lineWidth=width;
    } else {
      ctx.lineWidth=0.5;
    }
    ctx.drawImage(img,-40,-40,76,76);
    ctx.beginPath();
    ctx.arc(0,0,37,0,2*Math.PI);
    ctx.stroke();
    ctx.translate(-this.pos[0], -this.pos[1]);
  }

};

module.exports = Planet;
