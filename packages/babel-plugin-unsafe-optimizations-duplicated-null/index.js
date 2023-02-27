Object.defineProperty(exports, '__esModule', { value: true });

exports.default = function (babel, options) {
  const { types: t } = babel;

  const topNonProgramScope = new Set();

  const availableIdentifiers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';

  const isES5 = options && options.target === 'es5';

  const variableDeclarationType = isES5 ? 'var' : 'const';

  function indexToIdentifier(index) {
    let result = '';
    for (;;) {
      result += availableIdentifiers[index % availableIdentifiers.length];
      index = Math.floor(index / availableIdentifiers.length);
      if (index === 0) {
        return result;
      }
    }
  }

  function getFirstItem(set) {
    let result;
    set.forEach(item => {
      result = item;
    });
    return result;
  }

  function economy(repeatCount) {
    const nullLength = 4;
    return -(5 + nullLength - (nullLength + 1) * repeatCount);
  }

  return {
    name: 'babel-plugin-unsafe-optimizations-duplicated-null',

    visitor: {
      Program(path) {
        let usagesNumber = 0;

        const usedIdentifiers = new Set([
          'abstract',
          'arguments',
          'await',
          'boolean',
          'break',
          'byte',
          'case',
          'catch',
          'char',
          'class',
          'const',
          'continue',
          'debugger',
          'default',
          'delete',
          'do',
          'double',
          'else',
          'enum',
          'eval',
          'export',
          'extends',
          'false',
          'final',
          'finally',
          'float',
          'for',
          'function',
          'goto',
          'if',
          'implements',
          'import',
          'in',
          'instanceof',
          'int',
          'interface',
          'let',
          'long',
          'native',
          'new',
          'null',
          'package',
          'private',
          'protected',
          'public',
          'return',
          'short',
          'static',
          'super',
          'switch',
          'synchronized',
          'this',
          'throw',
          'throws',
          'transient',
          'true',
          'try',
          'typeof',
          'var',
          'void',
          'volatile',
          'while',
          'with',
          'yield',
        ]);

        let isModule = false;

        function peekIdentifier() {
          for (let i = 0; i < 10000; i++) {
            const name = indexToIdentifier(i);
            if (!usedIdentifiers.has(name)) {
              usedIdentifiers.add(name);
              return name;
            }
          }
          throw new Error('Failed to find identifier name');
        }

        path.traverse({
          Identifier(path) {
            const identifierName = path.node.name;
            if (
              (identifierName === 'module' || identifierName === 'exports') &&
              path.scope.hasGlobal(identifierName)
            ) {
              isModule = true;
            }
            usedIdentifiers.add(identifierName);
          },

          ImportDeclaration(path) {
            isModule = true;
            path.skip();
          },

          ExportNamedDeclaration() {
            isModule = true;
          },

          ExportDefaultDeclaration() {
            isModule = true;
          },

          NullLiteral(path) {
            usagesNumber++;

            let scope = path.scope;
            while (scope.parent && !t.isProgram(scope.parent.block)) {
              scope = scope.parent;
            }
            topNonProgramScope.add(scope);
          },
        });

        if (
          !(
            economy(usagesNumber) > 4 &&
            (isModule ||
              (topNonProgramScope.size === 1 &&
                getFirstItem(topNonProgramScope).block.type !== 'Program'))
          )
        ) {
          return;
        }

        const replacement = peekIdentifier();

        path.traverse({
          NullLiteral(path) {
            path.replaceWith(t.Identifier(replacement));
          },
        });

        const declarationsStatement = t.VariableDeclaration(variableDeclarationType, [
          t.VariableDeclarator(t.Identifier(replacement), t.NullLiteral()),
        ]);

        if (isModule) {
          const index = path.node.body.findIndex(item => item.type !== 'ImportDeclaration');
          path.node.body.splice(index >= 0 ? index : 0, 0, declarationsStatement);
        } else {
          const block = getFirstItem(topNonProgramScope).block;

          if (block.type === 'FunctionExpression' || block.type === 'FunctionDeclaration') {
            block.body.body.unshift(declarationsStatement);
          } else if (block.type === 'ArrowFunctionExpression') {
            if (block.body.type === 'BlockStatement') {
              block.body.body.unshift(declarationsStatement);
            } else {
              block.body = t.BlockStatement([declarationsStatement, t.ReturnStatement(block.body)]);
            }
          } else {
            throw new Error('Unsupported case');
          }
        }
      },
    },
  };
};
