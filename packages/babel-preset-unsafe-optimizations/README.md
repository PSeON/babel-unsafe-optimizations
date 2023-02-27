# babel-preset-unsafe-optimizations

This preset enables all "unsafe-optimizations" plugins in the optimal order.

## Configuration

### target

Selects JavaScript syntax version for the output code. Supported values are: `"es5"`, `"es6"`.

### includeGlobal

Array of strings, which specifies globals to transform, all other globals will be ignored.

### excludeGlobal

Array of strings, which specifiec global to ignore during transform.
