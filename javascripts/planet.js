// Do we need to require all this stuff??
var MovingObject = require("./movingObject.js");
var Util = require("./util.js");

function Planet(hash) {
  hash.color = hash.color || "#008000";
  hash.radius = hash.radius || 30;
  hash.vel = hash.vel || Util.randomVec(Math.random()*3 + 2);
  hash.lives = this.lives || 3;

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
    var width = 3*this.lives;
    if (width > 0) {
      ctx.lineWidth=width;
    } else {
      ctx.lineWidth=0.5;
    }
    ctx.drawImage(img,-20,-20,75,75);
    ctx.beginPath();
    ctx.arc(15,20,38,0,2*Math.PI);
    ctx.stroke();
    ctx.translate(-this.pos[0], -this.pos[1]);
  }

};

module.exports = Planet;
