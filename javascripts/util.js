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
