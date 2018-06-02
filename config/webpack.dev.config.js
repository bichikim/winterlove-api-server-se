const WebpackBaseConfig = require('./webpack.base.config')
const webpackMerge = require('webpack-merge')
module.exports = webpackMerge(WebpackBaseConfig, {
  /**
   * Test in this project needs development
   * For more info See this
   * @link https://medium.com/webpack/webpack-4-mode-and-optimization-5423a6bc597a
   */
  mode: 'development',
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
})
