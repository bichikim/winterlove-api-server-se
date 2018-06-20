/*eslint complexity: ["error", 23]*/
import {IOptions as ILogOptions} from '@/plugins/log-good'
import parseArgs from 'minimist'

export interface IArgvServerOptions {
  cert?: string
  host?: string
  key?: string
  mongoDBUrl?: string
  log?: ILogOptions
  port?: number
}

function number(data: number, defaultData: number) {
  const num = Number(data)
  if(Number.isNaN(num)){
    return defaultData
  }
  return num
}

export default function getArgv(_argv: any): IArgvServerOptions {
  const defaults = {
    port: 8080,
    host: 'localhost',
    isConsoleLog: false,
    isLocalLog: false,
    isRemoteLog: false,
  }
  const argv = parseArgs(_argv, {
    alias: {
      d: 'mongoDBUrl',
      p: 'port',
      h: 'host',
      k: 'key',
      c: 'cert',
    },
  })
  // define option values
  const cert: string = argv.cert || process.envJs.cert || process.env.cert
  const host: string = argv.host || process.envJs.host || process.env.host || defaults.host
  const key: string = argv.key || process.envJs.key || process.env.key
  const mongoDBUrl = argv.mongoDBUrl || process.envJs.mongoDBUrl || process.env.mongoDBUrl
  const port: number = number(
    argv.port || process.envJs.port || process.env.port, defaults.port)
  const log = process.envJs.log || process.env.log

  return {
    port, host, cert, key, mongoDBUrl, log,
  }
}
