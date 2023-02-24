let c = 'longString',
  d = 'anotherString';
let b = null;
let a = Object;
export let nulls = [b, b, b, b, b, b, b, b];
export let strings1 = [c, c, c, c, c];
export let strings2 = [d, d, d, d];
export let props = [
  a.getOwnPropertyDescriptor(nulls, 'prop1'),
  a.getOwnPropertyDescriptor(nulls, 'prop2'),
  a.getOwnPropertyDescriptor(nulls, 'prop3'),
  a.getOwnPropertyDescriptor(nulls, 'prop4'),
  a.getOwnPropertyDescriptor(nulls, 'prop5'),
];
let prefix = 'prefix';
let helper = value => {
  return prefix + value;
};
export let helper2 = value => {
  return helper(value);
};
export let helper3 = Object => {
  return Object;
};
