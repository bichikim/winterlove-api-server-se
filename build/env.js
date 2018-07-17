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
const {mongoDBUrl, cert, host, key, port, log} = config
module.exports = (webpackConfig) => {
  return webpackMerge(webpackConfig, {
    plugins: [
      new webpack.DefinePlugin({
        'process.envJs.cert': JSON.stringify(cert),
        'process.envJs.mongoDBUrl': JSON.stringify(mongoDBUrl),
        'process.envJs.host': JSON.stringify(host),
        'process.envJs.port': JSON.stringify(port),
        'process.envJs.key': JSON.stringify(key),
        'process.envJs.log': JSON.stringify(log),
      }),
    ],
  })
}