# Usafe optimizations babel pluings

This repo includes babel plugins which help minify JavaScript even more but with some minor
restrictions.

## Packages

### [babel-preset-unsafe-optimizations](packages/babel-preset-unsafe-optimizations/README.md)

A babel preset which enables all "unsafe-optimizations" plugins in the optimal order.

### [babel-plugin-unsafe-optimizations-const-to-let](packages/babel-plugin-unsafe-optimizations-const-to-let/README.md)

A plugin which transforms all "const" declarations to "let".

### [babel-plugin-unsafe-optimizations-duplicated-globals](packages/babel-plugin-unsafe-optimizations-duplicated-globals/README.md)

A plugin which creates local variables to store values of global variables.

### [babel-plugin-unsafe-optimizations-duplicated-null](packages/babel-plugin-unsafe-optimizations-duplicated-null/README.md)

A plugin which creates local variables to store the `null` value.

### [babel-plugin-unsafe-optimizations-duplicated-strings](packages/babel-plugin-unsafe-optimizations-duplicated-strings/README.md)

A plugin which creates local variables to store repeated strings.

### [babel-plugin-unsafe-optimizations-normal-to-arrow](packages/babel-plugin-unsafe-optimizations-normal-to-arrow/README.md)

A plugin which transforms normal functions to arrow functions.

## License

ISC
