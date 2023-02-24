# babel-plugin-unsafe-optimizations-duplicated-globals

This plugin creates local variables to store values of global variables.

This allows better minification of global variables usages.

For example:

```js
const array1 = Array.from(data1);
const array2 = Array.from(data2);
const array3 = Array.from(data3);
const array4 = Array.from(data4);
const array5 = Array.from(data5);
```

will be transformed to:

```js
const a = Array;
const array1 = a.from(data1);
const array2 = a.from(data2);
const array3 = a.from(data3);
const array4 = a.from(data4);
const array5 = a.from(data5);
```

## Why is it unsafe?

It's **unsafe** because it assumes that values of global variables will not be changed. Assigning a
new value to a global variable will not get reflected in the app after this transform.

This plugin can be used if you are sure that global variables are not going to be changed.
