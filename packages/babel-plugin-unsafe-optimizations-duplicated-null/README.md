# babel-plugin-unsafe-optimizations-duplicated-null

This plugin creates local variables to store the `null` value.

This allows better minification of repeated usages of `null`.

For example:

```js
const data = [null, null, null, null, null, null];
```

will be transformed to:

```js
const n = null;
const data = [n, n, n, n, n, n];
```

## Why is it unsafe?

This one actually looks safe.
