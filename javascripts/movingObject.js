function MovingObject(hash) {
  this.pos = hash.pos;
  this.vel = hash.vel;
  this.game = hash.game;
  this.rotation = hash.rotation;
  this.lives = hash.lives;

  if (hash.radius) {
    this.radius = hash.radius;
  }
  if (hash.color) {
    this.color = hash.color;
  }
}

MovingObject.prototype.draw = function(ctx) {
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
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  if (this.wraps) {
    this.game.wrap(this.pos);
  } else {
    // TODO: remove bullets (don't want to track them)
  }
};

MovingObject.prototype.hitBy = function(obj) {
  var distance = Math.sqrt(
    Math.pow(this[0] - obj[0], 2) + Math.pow(this[0] - obj[0], 2)
  );
  // console.log(distance, this.radius+obj.radius);
  return distance < (this.radius + obj.radius);
};

module.exports = MovingObject;
