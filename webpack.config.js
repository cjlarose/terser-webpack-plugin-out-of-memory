const path = require('path');

const TerserPlugin = require('terser-webpack-plugin');

const numEntries = 'NUM_ENTRIES' in process.env ? parseInt(process.env.NUM_ENTRIES, 10) : 500;
const workers = 'TERSER_WORKERS' in process.env ? parseInt(process.env.TERSER_WORKERS, 10) : 8;
const useCache = process.env.TERSER_CACHE !== undefined;

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
      new TerserPlugin({ parallel: workers, cache: useCache }),
    ],
  },
  target: 'node',
};
