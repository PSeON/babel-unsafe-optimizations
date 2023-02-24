const a = Object;
export const data = [
  a.getOwnPropertyDescriptor,
  a.getOwnPropertyDescriptor,
  a.getOwnPropertyDescriptor,
  a.getOwnPropertyDescriptor,
  a.getOwnPropertyDescriptor,
];
export const obj1 = {
  Object: a,
};
export const obj2 = {
  Object: a,
};
export const { Object: Object2 } = obj2;
export const prop = a.Object;
export function fn(Object) {
  return Object;
}
