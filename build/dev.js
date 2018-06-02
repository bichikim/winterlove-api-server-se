process.env.NODE_ENV = "development";
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.dev.config')
const compiler = webpack(webpackConfig, function(error, stats) {
  if(error){
    throw error
  }
  console.log(stats.toString())
})