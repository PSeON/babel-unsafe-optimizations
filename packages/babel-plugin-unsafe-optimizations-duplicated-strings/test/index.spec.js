const path = require('path');
const pluginTester = require('babel-plugin-tester').default;
const plugin = require('../index.js').default;
const pluginName = require('../package.json').name;

pluginTester({
  plugin,
  pluginName,
  fixtures: path.join(__dirname, 'fixtures'),
});
