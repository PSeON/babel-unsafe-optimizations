# More ideas for optimizations

## 1. Replace long operators with functions

Long operators are `instanceof`, `typeof`, `throw`.

"`throw new Error()`" -> "`t(new Error())`"

For example:

```js
function isSomething(value) {
  return (
    value instanceof Something ||
    value instanceof SomethingElse ||
    value instanceof AnotherThing ||
    value instanceof YetAnotherThing
  );
}
```

is replaced with:

```js
function i(v, c) {
  return v instanceof c;
}

function isSomething(value) {
  return (
    i(value, Something) ||
    i(value, SomethingElse) ||
    i(value, AnotherThing) ||
    i(value, YetAnotherThing)
  );
}
```
