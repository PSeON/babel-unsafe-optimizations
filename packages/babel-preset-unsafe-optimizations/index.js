Object.defineProperty(exports, '__esModule', { value: true });

exports.default = function () {
  return {
    plugins: [
      'module:babel-plugin-unsafe-optimizations-duplicated-globals',
      'module:babel-plugin-unsafe-optimizations-duplicated-null',
      'module:babel-plugin-unsafe-optimizations-duplicated-strings',
      'module:babel-plugin-unsafe-optimizations-normal-to-arrow',
      'module:babel-plugin-unsafe-optimizations-const-to-let',
    ],
  };
};
