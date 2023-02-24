let d = 'longString',
  e = 'anotherString';
let c = null;
let a = exports,
  b = Object;
a.nulls = [c, c, c, c, c, c, c, c];
a.strings1 = [d, d, d, d, d];
a.strings2 = [e, e, e, e];
a.props = [
  b.getOwnPropertyDescriptor(a, 'prop1'),
  b.getOwnPropertyDescriptor(a, 'prop2'),
  b.getOwnPropertyDescriptor(a, 'prop3'),
  b.getOwnPropertyDescriptor(a, 'prop4'),
  b.getOwnPropertyDescriptor(a, 'prop5'),
];
let prefix = 'prefix';
let helper = value => {
  return prefix + value;
};
a.helper = value => {
  return helper(value);
};
a.helper2 = Object => {
  return Object;
};
