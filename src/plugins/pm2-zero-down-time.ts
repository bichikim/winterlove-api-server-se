import {Plugin} from 'hapi'
interface IOptions {
  timeout: number
}

/**
 * this idea is from
 * @link https://github.com/roylines/hapi-graceful-pm2
 */
const plugin: Plugin<IOptions> = {
  name: 'pm2ZeroDownTime',
  version: '0.0.1',
  register(server, options?: IOptions) {
    process.on('SIGINT', () => {
      server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...')
      server.stop(options).then(() => {
        server.log(['info', 'hapi', 'stop'], 'hapi stopped')
        return process.exit(0)
      })
    })
  },
}

export default plugin
