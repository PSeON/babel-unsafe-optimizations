# babel-plugin-unsafe-optimizations-normal-to-arrow

This plugin transforms normal functions to arrow functions. It ignores functions which use
`arguments`, `this`, `yield` or self reference expressions because they are not avaiable in arrow
functions.

For example:

```js
function add3(a, b, c) {
  return a + b + c;
}

function mul3(a, b, c) {
  return a * b * c;
}
```

will be transformed to:

```js
const add3 = (a, b, c) => {
  return a + b + c;
};

const mul3 = (a, b, c) => {
  return a * b * c;
};
```

which will then be minified to something like:

```js
const add3 = (a, b, c) => a + b + c,
  mul3 = (a, b, c) => a * b * c;
```

## Why is it unsafe?

This one actually looks safe.
