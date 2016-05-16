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
