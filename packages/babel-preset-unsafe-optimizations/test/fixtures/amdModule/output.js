define(['exports'], exports => {
  let d = 'anotherString';
  let c = 'longString';
  let b = null;
  let a = Object;
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
  let prefix = 'prefix';
  let helper = value => {
    return prefix + value;
  };
  exports.helper = value => {
    return helper(value);
  };
  exports.helper2 = Object => {
    return Object;
  };
});
