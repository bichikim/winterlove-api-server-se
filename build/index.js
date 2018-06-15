process.env.NODE_ENV = 'production'
const webpack = require('webpack')
const webpackConfig = require('../config/webpack.build.config')
const webpackMerge = require('webpack-merge')
const parseArgs = require('minimist')
const ARGV_SKIP = 2
const argv = parseArgs(process.argv.slice(ARGV_SKIP), {
  alias: {
    c: 'config',
  },
})

webpack(webpackMerge(
  webpackConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(argv),
      }),
    ],
  }
), function(error, stats) {
  if(error){
    throw error
  }
  console.log(stats.toString())
})
