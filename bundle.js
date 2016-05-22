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
	var GameView = __webpack_require__(8);
	var M = __webpack_require__(3);
	var key = __webpack_require__(7);
	
	key('enter', function() {
	  startGame();
	});
	
	function startGame() {
	  hideInstuctions();
	  var canvasEl = document.getElementById("game-canvas");
	  canvasEl.width = 1600;
	  canvasEl.height = 800;
	  var newGame = new GameView();
	  var game = new Game();
	  newGame.start(canvasEl, game);
	}
	
	function resetGame() {
	  location.reload();
	}
	
	function showInstructions() {
	  document.getElementById("show-instructions").style.display="block";
	}
	
	function hideInstuctions() {
	  document.getElementById("show-instructions").style.display="none";
	}
	
	document.getElementById("how-to-play").onclick=showInstructions;
	
	
	// Add click listeners:
	var exits = document.getElementsByClassName("exit");
	for (var i = 0; i < exits.length; i++) {
	  exits[i].onclick=hideInstuctions;
	}
	
	var btnPlayAgain = document.getElementsByClassName("btn-play-again");
	for (var i = 0; i < btnPlayAgain.length; i++) {
	  btnPlayAgain[i].onclick=resetGame;
	}
	
	var btnStart = document.getElementById("btn-start");
	btnStart.onclick=startGame;
	
	// startGame();
	// window.game = Game;
	// window.gameview = GameView;
	// window.m = M;
	// window.n = newGame;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Planet = __webpack_require__(2);
	var SpaceCat = __webpack_require__(5);
	
	function Game() {
	  this.DIM_X = 1600;
	  this.DIM_Y = 800;
	  this.NUM_PLANETS = 4;
	  this.won = false;
	  this.planetsConquered = 0;
	  this.planets = [];
	  this.bullets = [];
	  this.cat = new SpaceCat({game: this});
	  this.addPlanets();
	}
	
	Game.prototype.addPlanets = function() {
	  for (var i = 0; i < this.NUM_PLANETS; i++) {
	    var a = new Planet({pos: this.randomPosition(), game: this});
	    this.planets.push(a);
	  }
	};
	
	Game.prototype.addBullet = function(bullet) {
	  this.bullets.push(bullet);
	};
	
	Game.prototype.draw = function (ctx) {
	  if (this.over()) {
	    return;
	  } else {
	    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	    this.planets.forEach(function(planet, idx) {
	      planet.draw(ctx, idx+1);
	    });
	
	    this.bullets.forEach(function(bullet) {
	      bullet.draw(ctx);
	    });
	  }
	};
	
	Game.prototype.moveObjects = function () {
	  this.planets.forEach(function(planet) {
	    planet.move();
	  });
	  this.bullets.forEach(function(bullet) {
	    bullet.move();
	  });
	  this.cat.move();
	};
	
	Game.prototype.randomPosition = function() {
	  var x = this.DIM_X * Math.random();
	  var y = this.DIM_Y * Math.random();
	  return [x, y];
	};
	
	Game.prototype.logCollisions = function() {
	  var game = this;
	  this.planetsConquered = 0;
	  var planetsConquered = this.planetsConquered;
	  game.planets.forEach(function(planet, planetIdx) {
	    game.bullets.forEach(function(bullet, bulletIdx) {
	      if (planet.hitBy(bullet)) {
	        planet.damage();
	        game.bullets = game.bullets.slice(0, bulletIdx).concat(game.bullets.slice(bulletIdx+1, game.bullets.length));
	      }
	      if (bullet.pos[0] < 0 || bullet.pos[0] > 1600 ||
	        bullet.pos[1] < 0 || bullet.pos[1] > 800) {
	        game.bullets = game.bullets.slice(0, bulletIdx).concat(game.bullets.slice(bulletIdx+1, game.bullets.length));
	      }
	    });
	
	    // console.log(planet, game.cat);
	    if (game.cat.hitBy(planet)) {
	      if (planet.lives > 0) {
	        game.cat.lives -= 1;
	        // TODO: replace cat in center iff not in danger;
	        // game.cat.respawn();
	        // console.log(game.cat.lives);
	      } else {
	        planet.status = "conquered";
	      }
	    }
	    if (planet.status === "conquered") {
	      planetsConquered += 1;
	    }
	  });
	  this.planetsConquered = planetsConquered;
	};
	
	Game.prototype.wrap = function (pos) {
	  if (pos[0] <= -50) {
	    pos[0] += 1650;
	  }
	  if (pos[1] <= -50) {
	    pos[1] += 850;
	  }
	  pos[0] = pos[0] % 1650;
	  pos[1] = pos[1] % 850;
	  return [pos[0], pos[1]];
	};
	
	Game.prototype.over = function(ctx) {
	  if (this.planetsConquered === this.NUM_PLANETS) {
	    document.getElementsByClassName("status-messages")[0].style.display="block";
	    document.getElementById("game-won-message").style.display="block";
	    key('enter', function() {
	      location.reload();
	    });
	  } else if (this.cat.lives === 0) {
	    document.getElementById("game-lost-message").style.display="block";
	    document.getElementsByClassName("status-messages")[0].style.display="block";
	    key('enter', function() {
	      location.reload();
	    });
	  } else {
	    return;
	  }
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


/***/ },
/* 3 */
/***/ function(module, exports) {

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
	  var randomizeX = Math.random();
	  var randomizeY = Math.random();
	
	  // Randomize x/y direction of moving objects.
	  if (randomizeX <= 0.5) {
	    randomizeX = -1;
	  } else {
	    randomizeX = 1;
	  }
	  if (randomizeY <= 0.5) {
	    randomizeY = -1;
	  } else {
	    randomizeY = 1;
	  }
	
	  var x = Math.random()*length*randomizeX;
	  var y = Math.sqrt(length*length - x*x)*randomizeY;
	  return [x,y];
	};
	
	module.exports = util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var MovingObject = __webpack_require__(3);
	var Util = __webpack_require__(4);
	var Bullet = __webpack_require__(6);
	var key = __webpack_require__(7);
	
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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Util = __webpack_require__(4);
	var MovingObject = __webpack_require__(3);
	var Planet = __webpack_require__(2);
	
	var Bullet = function(options) {
	  options.radius = 3;
	  options.color = "#FFFF66";
	
	  MovingObject.call(this, options);
	};
	
	Bullet.SPEED = 6;
	
	Util.inherits(Bullet, MovingObject);
	
	module.exports = Bullet;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	//     keymaster.js
	//     (c) 2011-2013 Thomas Fuchs
	//     keymaster.js may be freely distributed under the MIT license.
	
	;(function(global){
	  var k,
	    _handlers = {},
	    _mods = { 16: false, 18: false, 17: false, 91: false },
	    _scope = 'all',
	    // modifier keys
	    _MODIFIERS = {
	      '⇧': 16, shift: 16,
	      '⌥': 18, alt: 18, option: 18,
	      '⌃': 17, ctrl: 17, control: 17,
	      '⌘': 91, command: 91
	    },
	    // special keys
	    _MAP = {
	      backspace: 8, tab: 9, clear: 12,
	      enter: 13, 'return': 13,
	      esc: 27, escape: 27, space: 32,
	      left: 37, up: 38,
	      right: 39, down: 40,
	      del: 46, 'delete': 46,
	      home: 36, end: 35,
	      pageup: 33, pagedown: 34,
	      ',': 188, '.': 190, '/': 191,
	      '`': 192, '-': 189, '=': 187,
	      ';': 186, '\'': 222,
	      '[': 219, ']': 221, '\\': 220
	    },
	    code = function(x){
	      return _MAP[x] || x.toUpperCase().charCodeAt(0);
	    },
	    _downKeys = [];
	
	  for(k=1;k<20;k++) _MAP['f'+k] = 111+k;
	
	  // IE doesn't support Array#indexOf, so have a simple replacement
	  function index(array, item){
	    var i = array.length;
	    while(i--) if(array[i]===item) return i;
	    return -1;
	  }
	
	  // for comparing mods before unassignment
	  function compareArray(a1, a2) {
	    if (a1.length != a2.length) return false;
	    for (var i = 0; i < a1.length; i++) {
	        if (a1[i] !== a2[i]) return false;
	    }
	    return true;
	  }
	
	  var modifierMap = {
	      16:'shiftKey',
	      18:'altKey',
	      17:'ctrlKey',
	      91:'metaKey'
	  };
	  function updateModifierKey(event) {
	      for(k in _mods) _mods[k] = event[modifierMap[k]];
	  };
	
	  // handle keydown event
	  function dispatch(event) {
	    var key, handler, k, i, modifiersMatch, scope;
	    key = event.keyCode;
	
	    if (index(_downKeys, key) == -1) {
	        _downKeys.push(key);
	    }
	
	    // if a modifier key, set the key.<modifierkeyname> property to true and return
	    if(key == 93 || key == 224) key = 91; // right command on webkit, command on Gecko
	    if(key in _mods) {
	      _mods[key] = true;
	      // 'assignKey' from inside this closure is exported to window.key
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = true;
	      return;
	    }
	    updateModifierKey(event);
	
	    // see if we need to ignore the keypress (filter() can can be overridden)
	    // by default ignore key presses if a select, textarea, or input is focused
	    if(!assignKey.filter.call(this, event)) return;
	
	    // abort if no potentially matching shortcuts found
	    if (!(key in _handlers)) return;
	
	    scope = getScope();
	
	    // for each potential shortcut
	    for (i = 0; i < _handlers[key].length; i++) {
	      handler = _handlers[key][i];
	
	      // see if it's in the current scope
	      if(handler.scope == scope || handler.scope == 'all'){
	        // check if modifiers match if any
	        modifiersMatch = handler.mods.length > 0;
	        for(k in _mods)
	          if((!_mods[k] && index(handler.mods, +k) > -1) ||
	            (_mods[k] && index(handler.mods, +k) == -1)) modifiersMatch = false;
	        // call the handler and stop the event if neccessary
	        if((handler.mods.length == 0 && !_mods[16] && !_mods[18] && !_mods[17] && !_mods[91]) || modifiersMatch){
	          if(handler.method(event, handler)===false){
	            if(event.preventDefault) event.preventDefault();
	              else event.returnValue = false;
	            if(event.stopPropagation) event.stopPropagation();
	            if(event.cancelBubble) event.cancelBubble = true;
	          }
	        }
	      }
	    }
	  };
	
	  // unset modifier keys on keyup
	  function clearModifier(event){
	    var key = event.keyCode, k,
	        i = index(_downKeys, key);
	
	    // remove key from _downKeys
	    if (i >= 0) {
	        _downKeys.splice(i, 1);
	    }
	
	    if(key == 93 || key == 224) key = 91;
	    if(key in _mods) {
	      _mods[key] = false;
	      for(k in _MODIFIERS) if(_MODIFIERS[k] == key) assignKey[k] = false;
	    }
	  };
	
	  function resetModifiers() {
	    for(k in _mods) _mods[k] = false;
	    for(k in _MODIFIERS) assignKey[k] = false;
	  };
	
	  // parse and assign shortcut
	  function assignKey(key, scope, method){
	    var keys, mods;
	    keys = getKeys(key);
	    if (method === undefined) {
	      method = scope;
	      scope = 'all';
	    }
	
	    // for each shortcut
	    for (var i = 0; i < keys.length; i++) {
	      // set modifier keys if any
	      mods = [];
	      key = keys[i].split('+');
	      if (key.length > 1){
	        mods = getMods(key);
	        key = [key[key.length-1]];
	      }
	      // convert to keycode and...
	      key = key[0]
	      key = code(key);
	      // ...store handler
	      if (!(key in _handlers)) _handlers[key] = [];
	      _handlers[key].push({ shortcut: keys[i], scope: scope, method: method, key: keys[i], mods: mods });
	    }
	  };
	
	  // unbind all handlers for given key in current scope
	  function unbindKey(key, scope) {
	    var multipleKeys, keys,
	      mods = [],
	      i, j, obj;
	
	    multipleKeys = getKeys(key);
	
	    for (j = 0; j < multipleKeys.length; j++) {
	      keys = multipleKeys[j].split('+');
	
	      if (keys.length > 1) {
	        mods = getMods(keys);
	      }
	
	      key = keys[keys.length - 1];
	      key = code(key);
	
	      if (scope === undefined) {
	        scope = getScope();
	      }
	      if (!_handlers[key]) {
	        return;
	      }
	      for (i = 0; i < _handlers[key].length; i++) {
	        obj = _handlers[key][i];
	        // only clear handlers if correct scope and mods match
	        if (obj.scope === scope && compareArray(obj.mods, mods)) {
	          _handlers[key][i] = {};
	        }
	      }
	    }
	  };
	
	  // Returns true if the key with code 'keyCode' is currently down
	  // Converts strings into key codes.
	  function isPressed(keyCode) {
	      if (typeof(keyCode)=='string') {
	        keyCode = code(keyCode);
	      }
	      return index(_downKeys, keyCode) != -1;
	  }
	
	  function getPressedKeyCodes() {
	      return _downKeys.slice(0);
	  }
	
	  function filter(event){
	    var tagName = (event.target || event.srcElement).tagName;
	    // ignore keypressed in any elements that support keyboard data input
	    return !(tagName == 'INPUT' || tagName == 'SELECT' || tagName == 'TEXTAREA');
	  }
	
	  // initialize key.<modifier> to false
	  for(k in _MODIFIERS) assignKey[k] = false;
	
	  // set current scope (default 'all')
	  function setScope(scope){ _scope = scope || 'all' };
	  function getScope(){ return _scope || 'all' };
	
	  // delete all handlers for a given scope
	  function deleteScope(scope){
	    var key, handlers, i;
	
	    for (key in _handlers) {
	      handlers = _handlers[key];
	      for (i = 0; i < handlers.length; ) {
	        if (handlers[i].scope === scope) handlers.splice(i, 1);
	        else i++;
	      }
	    }
	  };
	
	  // abstract key logic for assign and unassign
	  function getKeys(key) {
	    var keys;
	    key = key.replace(/\s/g, '');
	    keys = key.split(',');
	    if ((keys[keys.length - 1]) == '') {
	      keys[keys.length - 2] += ',';
	    }
	    return keys;
	  }
	
	  // abstract mods logic for assign and unassign
	  function getMods(key) {
	    var mods = key.slice(0, key.length - 1);
	    for (var mi = 0; mi < mods.length; mi++)
	    mods[mi] = _MODIFIERS[mods[mi]];
	    return mods;
	  }
	
	  // cross-browser events
	  function addEvent(object, event, method) {
	    if (object.addEventListener)
	      object.addEventListener(event, method, false);
	    else if(object.attachEvent)
	      object.attachEvent('on'+event, function(){ method(window.event) });
	  };
	
	  // set the handlers globally on document
	  addEvent(document, 'keydown', function(event) { dispatch(event) }); // Passing _scope to a callback to ensure it remains the same by execution. Fixes #48
	  addEvent(document, 'keyup', clearModifier);
	
	  // reset modifiers to false whenever the window is (re)focused.
	  addEvent(window, 'focus', resetModifiers);
	
	  // store previously defined key
	  var previousKey = global.key;
	
	  // restore previously defined key and return reference to our key object
	  function noConflict() {
	    var k = global.key;
	    global.key = previousKey;
	    return k;
	  }
	
	  // set window.key and window.key.set/get/deleteScope, and the default filter
	  global.key = assignKey;
	  global.key.setScope = setScope;
	  global.key.getScope = getScope;
	  global.key.deleteScope = deleteScope;
	  global.key.filter = filter;
	  global.key.isPressed = isPressed;
	  global.key.getPressedKeyCodes = getPressedKeyCodes;
	  global.key.noConflict = noConflict;
	  global.key.unbind = unbindKey;
	
	  if(true) module.exports = assignKey;
	
	})(this);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var Game = __webpack_require__(1);
	var key = __webpack_require__(7);
	function GameView() {
	}
	
	GameView.prototype.start = function (canvasEl, game) {
	  key.unbind('enter');
	  var ctx = canvasEl.getContext("2d");
	
	  game.cat.movements();
	  game.cat.rotations();
	
	  // Set objects in motion for a couple seconds w/o checking for collisions. Gives user a chance before losing.
	  var initialState = setInterval(function() {
	    game.moveObjects();
	    game.draw(ctx);
	    game.cat.draw(ctx);
	  }, 10);
	
	  // Normal game logic. Note only difference is presence of logCollisions and game.over checking.
	  var refresh = function() {
	    game.moveObjects();
	    game.logCollisions();
	    game.over(ctx);
	    game.draw(ctx);
	    game.cat.draw(ctx);
	  };
	
	  //After 1.5 seconds, switch from initial logic to normal game logic.
	  setTimeout(function() {
	    clearInterval(initialState);
	    setInterval(refresh, 10);
	  }, 1500);
	
	};
	
	// GameView.prototype.end = function (canvasEl) {
	//   var ctx = canvasEl.getContext("2d");
	//   ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
	// };
	
	module.exports = GameView;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map