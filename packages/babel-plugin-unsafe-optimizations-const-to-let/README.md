# babel-plugin-unsafe-optimizations-const-to-let

This plugin transforms all "const" declarations to "let".

This transform helps redusing code size by allowing to merge multiple declarations into a single
statement.

For example:

```js
const a = 1;
let b = 2;
const c = 3;
let d = 4;
```

will be transformed to:

```js
let a = 1;
let b = 2;
let c = 3;
let d = 4;
```

which can be then minified to:

```js
let a = 1,
  b = 2,
  c = 3,
  d = 4;
```

## Why is it unsafe?

It's **unsafe** because assigning to "const" variables throws an error, and this error will not be
thrown after this transform.

This plugin can be used if you sure that you don't assign to "const" in your code.

## Configuration

This plugin doesn't have any configuration options.
