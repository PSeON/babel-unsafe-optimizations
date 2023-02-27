define(['exports'], function (exports) {
  var d = 'anotherString';
  var c = 'longString';
  var b = null;
  var a = Object;
  exports.nulls = [b, b, b, b, b, b, b, b];
  exports.strings1 = [c, c, c, c, c];
  exports.strings2 = [d, d, d, d];
  exports.props = [
    a.getOwnPropertyDescriptor(exports, 'prop1'),
    a.getOwnPropertyDescriptor(exports, 'prop2'),
    a.getOwnPropertyDescriptor(exports, 'prop3'),
    a.getOwnPropertyDescriptor(exports, 'prop4'),
    a.getOwnPropertyDescriptor(exports, 'prop5'),
  ];
  var prefix = 'prefix';
  function helper(value) {
    return prefix + value;
  }
  exports.helper = function (value) {
    return helper(value);
  };
  exports.helper2 = function (Object) {
    return Object;
  };
});
