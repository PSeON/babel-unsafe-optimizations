Object.defineProperty(exports, '__esModule', { value: true });

exports.default = function (babel) {
  const { types: t } = babel;

  return {
    name: 'babel-plugin-unsafe-optimizations-const-to-let',

    visitor: {
      VariableDeclaration(path) {
        if (path.node.kind === 'const') {
          path.replaceWith(t.VariableDeclaration('let', path.node.declarations));
        }
      },
    },
  };
};
