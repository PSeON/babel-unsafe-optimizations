export const nulls = [null, null, null, null, null, null, null, null];

export const strings1 = ['longString', 'longString', 'longString', 'longString', 'longString'];

export const strings2 = ['anotherString', 'anotherString', 'anotherString', 'anotherString'];

export const props = [
  Object.getOwnPropertyDescriptor(nulls, 'prop1'),
  Object.getOwnPropertyDescriptor(nulls, 'prop2'),
  Object.getOwnPropertyDescriptor(nulls, 'prop3'),
  Object.getOwnPropertyDescriptor(nulls, 'prop4'),
  Object.getOwnPropertyDescriptor(nulls, 'prop5'),
];

const prefix = 'prefix';

function helper(value) {
  return prefix + value;
}

export const helper2 = function (value) {
  return helper(value);
};

export const helper3 = function (Object) {
  return Object;
};
