Object.defineProperty(exports, '__esModule', { value: true });

exports.default = function (babel, options) {
  const { types: t } = babel;

  const availableIdentifiers = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';

  const isES5 = options && options.target === 'es5';

  const variableDeclarationType = isES5 ? 'var' : 'const';

  function isGlobalAllowedToTransform(name) {
    if (name === 'arguments') {
      return false;
    }
    if (options && options.excludeGlobal && options.excludeGlobal.includes(name)) {
      return false;
    }
    if (options && options.includeGlobal && !options.includeGlobal.includes(name)) {
      return false;
    }
    return true;
  }

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

  function stringEconomy(str, repeatCount) {
    return -(5 + str.length - (str.length - 1) * repeatCount);
  }

  return {
    name: 'babel-plugin-unsafe-optimizations-duplicated-globals',

    visitor: {
      Program(path) {
        const stringUsages = new Map();

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

            if (
              path.isExpression(path) &&
              isGlobalAllowedToTransform(identifierName) &&
              path.scope.hasGlobal(identifierName) &&
              !path.scope.getBinding(identifierName)
            ) {
              const usage = stringUsages.get(identifierName) || {
                usages: 0,
                topNonProgramScope: new Set(),
              };

              usage.usages++;

              let scope = path.scope;
              while (scope.parent && !t.isProgram(scope.parent.block)) {
                scope = scope.parent;
              }
              usage.topNonProgramScope.add(scope);

              stringUsages.set(identifierName, usage);
            }
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
        });

        const replacements = new Map();
        stringUsages.forEach((usage, str) => {
          if (
            stringEconomy(str, usage.usages) > 4 &&
            (isModule ||
              (usage.topNonProgramScope.size === 1 &&
                getFirstItem(usage.topNonProgramScope).block.type !== 'Program'))
          ) {
            replacements.set(str, peekIdentifier());
          }
        });

        path.traverse({
          Identifier(path) {
            const identifierName = path.node.name;
            const replacement = replacements.get(identifierName);
            if (replacement) {
              if (
                path.isExpression(path) &&
                path.scope.hasGlobal(identifierName) &&
                !path.scope.getBinding(identifierName)
              ) {
                path.replaceWith(t.Identifier(replacement));
                path.skip();
              }
            }
          },

          ImportDeclaration(path) {
            path.skip();
          },
        });

        if (isModule) {
          const declarations = [];
          replacements.forEach((identifier, str) => {
            const declarator = t.VariableDeclarator(t.Identifier(identifier), t.Identifier(str));
            declarations.push(declarator);
          });

          if (declarations.length > 0) {
            const declarationsStatement = t.VariableDeclaration(
              variableDeclarationType,
              declarations,
            );
            const index = path.node.body.findIndex(item => item.type !== 'ImportDeclaration');
            path.node.body.splice(index >= 0 ? index : 0, 0, declarationsStatement);
          }
        } else {
          replacements.forEach((identifier, str) => {
            const declarationsStatement = t.VariableDeclaration(variableDeclarationType, [
              t.VariableDeclarator(t.Identifier(identifier), t.Identifier(str)),
            ]);

            const usage = stringUsages.get(str);

            const block = getFirstItem(usage.topNonProgramScope).block;

            if (block.type === 'FunctionExpression' || block.type === 'FunctionDeclaration') {
              block.body.body.unshift(declarationsStatement);
            } else if (block.type === 'ArrowFunctionExpression') {
              if (block.body.type === 'BlockStatement') {
                block.body.body.unshift(declarationsStatement);
              } else {
                block.body = t.BlockStatement([
                  declarationsStatement,
                  t.ReturnStatement(block.body),
                ]);
              }
            } else {
              throw new Error('Unsupported case');
            }
          });
        }
      },
    },
  };
};
