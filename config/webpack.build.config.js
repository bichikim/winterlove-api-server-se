const WebpackBaseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
module.exports = webpackMerge(WebpackBaseConfig, {
  devtool: 'source-map',
  mode: 'production',
})