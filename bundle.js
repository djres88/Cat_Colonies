/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var GameView = __webpack_require__(6);
	var M = __webpack_require__(3);
	
	var canvasEl = document.getElementById("game-canvas");
	canvasEl.width = 1600;
	canvasEl.height = 800;
	
	var newGame = new GameView();
	newGame.start(canvasEl);
	
	window.game = Game;
	window.gameview = GameView;
	window.m = M;
	window.n = newGame;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Planet = __webpack_require__(2);
	var SpaceCat = __webpack_require__(5);
	
	function Game() {
	  this.DIM_X = 1600;
	  this.DIM_Y = 800;
	  this.NUM_ASTEROIDS = 4;
	  this.asteroids = [];
	  this.cat = new SpaceCat({pos: [800, 400], game: this});
	  this.addPlanets();
	}
	
	Game.prototype.addPlanets = function() {
	  for (var i = 0; i < this.NUM_ASTEROIDS; i++) {
	    var a = new Planet({pos: this.randomPosition(), game: this});
	    this.asteroids.push(a);
	  }
	};
	
	Game.prototype.draw = function (ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	
	  this.asteroids.forEach(function(asteroid) {
	    asteroid.draw(ctx);
	  });
	  this.cat.draw(ctx);
	};
	
	Game.prototype.moveObjects = function () {
	  this.asteroids.forEach(function(asteroid) {
	    asteroid.move();
	  });
	  // this.cat.move();
	};
	
	Game.prototype.randomPosition = function() {
	  var x = this.DIM_X * Math.random();
	  var y = this.DIM_Y * Math.random();
	  return [x, y];
	};
	
	Game.prototype.wrap = function (pos) {
	  pos[0] = pos[0] % 1600;
	  pos[1] = pos[1] % 800;
	  return [pos[0], pos[1]];
	};
	
	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Do we need to require all this stuff??
	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
	function Planet(hash) {
	  hash.color = hash.color || "#008000";
	  hash.radius = hash.radius || 30;
	  hash.vel = hash.vel || Util.randomVec(Math.random()*3 + 2);
	  hash.lives = 3;
	
	  MovingObject.call(this, hash);
	}
	
	Planet.prototype.hit = function() {
	  this.lives -= 1;
	};
	
	Util.inherits(Planet, MovingObject);
	
	module.exports = Planet;


/***/ },
/* 3 */
/***/ function(module, exports) {

	
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
	  this.game.wrap(this.pos);
	};
	
	module.exports = MovingObject;


/***/ },
/* 4 */
/***/ function(module, exports) {

	// function Util() {}
	var util = {};
	// Rather than adding a constructor, you can put helper methods in a regular old object and export that instead.
	
	util.inherits = function (ChildClass, ParentClass) {
	  function Surrogate() {}
	  Surrogate.prototype = ParentClass.prototype;
	  ChildClass.prototype = new Surrogate();
	  ChildClass.prototype.constructor = ChildClass;
	};
	
	util.randomVec = function (length) {
	  var x = Math.random()*length;
	  var y = Math.sqrt(length*length - x*x);
	  return [x,y];
	};
	
	module.exports = util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	
	function GameView() {}
	
	GameView.prototype.moves = function() {
	  var MOVES = {
	    "up": [0, 1],
	    "down": [0, -1],
	    "left": [-1, 0],
	    "right": [1, 0]
	  };
	
	  Object.keys(MOVES).forEach(function(keypress) {
	    var direction = MOVES[keypress];
	    key(keypress, function() {
	      spacecat.pos = [spacecat.pos[0] + direction[0], spacecat.pos[1] + direction[1]];
	    });
	  });
	};
	
	GameView.prototype.start = function (canvasEl) {
	    // get a 2d canvas drawing context. The canvas API lets us call
	    // a `getContext` method on a canvas DOM element.
	    var ctx = canvasEl.getContext("2d");
	    var game = new Game();
	    var refresh = function() {
	      game.moveObjects();
	      game.draw(ctx);
	    };
	
	    setInterval(refresh, 20);
	};
	
	
	module.exports = GameView;
	
	window.Game = Game;
	// window.movingObject = movingObject;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map