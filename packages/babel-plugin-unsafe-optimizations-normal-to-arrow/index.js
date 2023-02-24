Object.defineProperty(exports, '__esModule', { value: true });

exports.default = function (babel) {
  const { types: t } = babel;

  function getCanTransform(path) {
    let canTransform = true;
    path.traverse({
      Function(path) {
        path.skip();
      },
      ThisExpression(path) {
        canTransform = false;
        path.stop();
      },
      Identifier(path) {
        if (
          path.node.name === 'arguments' &&
          (path.parent.type !== 'MemberExpression' || path.key === 'object')
        ) {
          canTransform = false;
          path.stop();
        }
      },
    });
    if (path.node.generator) {
      canTransform = false;
    }
    return canTransform;
  }

  return {
    name: 'babel-plugin-unsafe-optimizations-normal-to-arrow',

    visitor: {
      FunctionDeclaration(path) {
        const canTransform = getCanTransform(path);
        if (canTransform) {
          path.replaceWith(
            t.VariableDeclaration('const', [
              t.VariableDeclarator(
                path.node.id,
                t.arrowFunctionExpression(path.node.params, path.node.body, path.node.async),
              ),
            ]),
          );
        }
      },

      FunctionExpression(path) {
        const canTransform =
          getCanTransform(path) &&
          (!path.node.id || !path.scope.bindings[path.node.id.name].referenced);
        if (canTransform) {
          path.replaceWith(
            t.arrowFunctionExpression(path.node.params, path.node.body, path.node.async),
          );
        }
      },
    },
  };
};
