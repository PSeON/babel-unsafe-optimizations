const pluginName = require('../../../package.json').name;

module.exports = {
  presets: [[pluginName, { target: 'es5' }]],
};
