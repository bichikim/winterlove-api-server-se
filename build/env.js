const parseArgs = require('minimist')
const webpack = require('webpack')
const {resolve} = require('path')
const webpackMerge = require('webpack-merge')
const esm = require('esm')(module)
const ARGV_SKIP = 2
const argv = parseArgs(process.argv.slice(ARGV_SKIP), {
  alias: {
    c: 'config',
  },
})
let config
try{
  const path = resolve(__dirname, '..', argv.config || '.env.js')
  config = esm(path)
}catch(e){
  config = {}
}
console.log(config)
const {mongoDBUrl, cert, host, key, port} = config
config = {mongoDBUrl, cert, host, key, port}
module.exports = (webpackConfig) => {
  return webpackMerge(webpackConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify(config),
      }),
    ],
  })
}