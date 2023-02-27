define(['exports'], function (exports) {
  exports.nulls = [null, null, null, null, null, null, null, null];

  exports.strings1 = ['longString', 'longString', 'longString', 'longString', 'longString'];

  exports.strings2 = ['anotherString', 'anotherString', 'anotherString', 'anotherString'];

  exports.props = [
    Object.getOwnPropertyDescriptor(exports, 'prop1'),
    Object.getOwnPropertyDescriptor(exports, 'prop2'),
    Object.getOwnPropertyDescriptor(exports, 'prop3'),
    Object.getOwnPropertyDescriptor(exports, 'prop4'),
    Object.getOwnPropertyDescriptor(exports, 'prop5'),
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
