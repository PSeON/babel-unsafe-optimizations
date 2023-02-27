Object.defineProperty(exports, '__esModule', { value: true });

exports.default = function (babel, options) {
  const isES5 = options && options.target === 'es5';

  if (isES5) {
    return {
      plugins: [
        ['unsafe-optimizations-duplicated-globals', options],
        ['unsafe-optimizations-duplicated-null', options],
        ['unsafe-optimizations-duplicated-strings', options],
      ],
    };
  } else {
    return {
      plugins: [
        ['unsafe-optimizations-duplicated-globals', options],
        ['unsafe-optimizations-duplicated-null', options],
        ['unsafe-optimizations-duplicated-strings', options],
        ['unsafe-optimizations-normal-to-arrow', options],
        ['unsafe-optimizations-const-to-let', options],
      ],
    };
  }
};
