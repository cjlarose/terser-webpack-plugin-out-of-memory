const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const numEntries = 500;

module.exports = {
  entry: () => {
    const source = './src/index.js';
    const entries = {};
    for (let i = 0; i < numEntries; i++) {
      entries[`entry${i}`] = source;
    }
    return entries;
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({ parallel: 8, cache: false }),
    ],
  },
  target: 'node',
};
