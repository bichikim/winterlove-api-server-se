process.env.NODE_ENV = 'development'
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.dev.config')
const env = require('./env')
webpack(env(webpackConfig), function(error, stats) {
  if(error){
    throw error
  }
  console.log(stats.toString())
})