function MovingObject(hash) {
  this.pos = hash.pos;
  this.vel = hash.vel;
  this.game = hash.game;
  this.rotation = hash.rotation;
  this.lives = hash.lives;
  this.status = hash.status;

  if (hash.radius) {
    this.radius = hash.radius;
  }
  if (hash.color) {
    this.color = hash.color;
  }
}

MovingObject.prototype.draw = function(ctx) {
  if (this.status === "conquered") {
    return;
  } else {

  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  if (this.lives > 0) {
    ctx.strokeStyle="red";
  } else {
    ctx.strokeStyle="green";
  }
  ctx.fill();
  var width = 3*this.lives;
  if (width > 0) {
    ctx.lineWidth=width;
  } else {
    ctx.lineWidth=0;
  }
  ctx.stroke();
  }
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.wraps) {
    this.game.wrap(this.pos);
  } else {
  }
};

MovingObject.prototype.hitBy = function(obj) {

  var distance = Math.sqrt(
    Math.pow(this.pos[0] - obj.pos[0], 2) + Math.pow(this.pos[1] - obj.pos[1], 2)
  );
  return distance < (this.radius + obj.radius);
};

MovingObject.prototype.damage = function() {
  if (this.lives > 0) {
    this.lives -= 1;
  }
};

module.exports = MovingObject;
