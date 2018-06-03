import {Plugin} from 'hapi'
const plugin: Plugin<any> = {
  name: 'pm2ZeroDownTime',
  version: '0.0.1',
  register: function(server, options) {
    process.on('SIGINT', () => {
      server.log(['info', 'pm2', 'shutdown'], 'stopping hapi...')
      server.stop(options).then(() => {
        server.log(['info', 'pm2', 'shutdown'], 'hapi stopped')
        return process.exit(0)
      })
    })
  }
}

export default plugin