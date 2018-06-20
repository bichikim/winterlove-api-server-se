import good from 'good'
import {Plugin, Server} from 'hapi'

interface ILogglyOptions {
  token: string
  subdomain: string
  tags: string[]
  name: string
  hostname?: string
  threshold?: string
  maxDelay: number
}

interface IFileOptions {
  path: string
}

export interface IOptions {
  file?: IFileOptions
  screen?: boolean
  loggly?: ILogglyOptions
}

const plugin: Plugin<IOptions> = {
  name: 'log-good',
  version: '0.0.1',
  register: async (server: Server, options: IOptions = {}) => {
    const {
      file, screen = false, loggly,
    } = options
    // no options no log
    if(!file && !screen && !loggly){return}
    const reporters = {}
    if(file){
      Object.assign(reporters, {
        file: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{log: '*', request: '*', error: '*', response: '*'}],
          },
          {
            module: 'good-file',
            name: 'SafeJson',
          },
          {
            module: 'good-file',
            args: [file.path],
          },
        ],
      })
    }
    if(screen){
      Object.assign(reporters, {
        screen: [
          {
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{log: '*', request: '*', error: '*', response: '*'}],
          },
        ],
      })
    }
    if(loggly){
      Object.assign(reporters, {
        loggly: [
          {
            module: 'good-loggly',
            args: [
              loggly,
            ],
          },
        ],
      })
    }
    await server.register({
      plugin: good,
      options: {reporters},
    })
  },
}

export default plugin
