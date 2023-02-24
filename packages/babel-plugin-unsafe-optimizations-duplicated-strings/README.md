# babel-plugin-unsafe-optimizations-duplicated-strings

This plugin creates local variables to store repeated strings.

For example:

```js
const data = {
  prop1: 'default',
  prop2: 'default',
  prop3: 'default',
  prop4: 'default',
  prop5: 'default',
};
```

will be transformed to:

```js
const s = 'default';
const data = {
  prop1: s,
  prop2: s,
  prop3: s,
  prop4: s,
  prop5: s,
};
```

## Why is it unsafe?

This one actually looks safe.
