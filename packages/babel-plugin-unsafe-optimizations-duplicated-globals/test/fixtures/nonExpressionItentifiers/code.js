export const data = [
  Object.getOwnPropertyDescriptor,
  Object.getOwnPropertyDescriptor,
  Object.getOwnPropertyDescriptor,
  Object.getOwnPropertyDescriptor,
  Object.getOwnPropertyDescriptor,
];

export const obj1 = {
  Object,
};

export const obj2 = {
  Object: Object,
};

export const { Object: Object2 } = obj2;

export const prop = Object.Object;

export function fn(Object) {
  return Object;
}
