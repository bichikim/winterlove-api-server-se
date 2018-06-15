process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const env = require('./env')
const webpackConfig = require('../config/webpack.build.config')

webpack(env(webpackConfig), function(error, stats) {
  if(error){
    throw error
  }
  console.log(stats.toString())
})
