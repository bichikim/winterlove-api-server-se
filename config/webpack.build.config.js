const WebpackBaseConfig = require('./webpack.base.config')
const formatter = require('eslint-friendly-formatter')
const webpackMerge = require('webpack-merge')
module.exports = webpackMerge(WebpackBaseConfig, {
  devtool: 'source-map',
  mode: 'production',
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
    ],
  },
})