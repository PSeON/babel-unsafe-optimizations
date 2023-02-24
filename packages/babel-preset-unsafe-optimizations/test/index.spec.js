const path = require('path');
const pluginTester = require('babel-plugin-tester').default;
const pluginName = require('../package.json').name;

pluginTester({
  plugin: {},
  pluginName,
  babelOptions: {
    presets: [pluginName],
  },
  fixtures: path.join(__dirname, 'fixtures'),
});
