const {join} = require('path')
const formatter = require('eslint-friendly-formatter')
const nodeExternals = require('webpack-node-externals')
const resolve = function(dir) {
  return join(__dirname, '..', dir)
}
// noinspection JSUnusedGlobalSymbols
module.exports = {
  target: 'node',
  entry: {
    app: ['./src/index.ts'],
  },
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    pathinfo: true,
  },
  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': resolve('src'),
      '~': resolve('lib'),
      '@@': resolve('./'),
      '~~': resolve('./'),
      'Controller': resolve('src', 'Controller.ts'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|ts|vue)/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        options: {
          formatter,
        },
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: [
          resolve('./node_modules/vision/lib/manager.js'),
        ],
        use: 'babel-loader',
      },
    ],
  },
  externals: [nodeExternals()],
  node: {
    __filename: true,
    __dirname: true,
  },
}
