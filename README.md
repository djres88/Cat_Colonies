# Cat Colonies!
LINK TO LIVE SITE: [Cat Colonies][Cat Colonies]

[Cat Colonies]:http://djres88.github.io/colonies/

A frontend JavaScript game built using Canvas. Best described as a combination of Pacman and Asteroids.  

## Gameplay
1. As SpaceCat, your task is to conquer the planets.
2. In order to conquer a planet, you first need to destroy its shield. A planet's shields go down after three shots. (Note: The planet's remaining shield is indicated by the thickness of its red border. Thin border = less shield).
3. When a planet's shields are down, it's time to colonize! Take an unshielded planet by navigating SpaceCat over it.
4. But be careful! If you hit a planet with a still-active shield, you lose! Boo!

![screenshot1]

## Behind the Scenes (How It Works)
* The files are segmented into game logic (`game` and `gameView`) and moving objects (base class `movingObject.js`, child classes `bullet`, `spaceCat`, and `planet`).
  - Objects are responsible for their own behavior/movement, while the game logic renders movements and checks for game conditions (e.g. collisions between objects, end-of-game scenarios, etc.)

* The physics of SpaceCat's motion across the canvas accounts for his velocity and current rotation:
```JavaScript
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
```
 - Rotations occur 10˚ at a time (with the user's click left/right arrows).
 - The current rotation is translated to/stored as radians in an instance variable. Using the `Math.cos` and `Math.sin` functions are a little quicker this way.

* The plasma gun's bullets, too, account for SpaceCat's relative angle and velocity:
```JavaScript
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
```

[screenshot1]: ./images/Screenshot.jpg
