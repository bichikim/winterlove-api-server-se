import parseArgs from 'minimist'

export interface IArgvServerOptions {
  cert?: string
  host?: string
  key?: string
  mongoDBUrl?: string
  isLog?: boolean
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
    isLog: true,
  }
  const argv = parseArgs(_argv, {
    alias: {
      d: 'mongoDB',
      r: 'protocol',
      p: 'port',
      h: 'host',
      k: 'key',
      c: 'cert',
      l: 'isLog',
    },
  })
  // define option values
  const cert: string = argv.cert || process.env.cert
  const host: string = argv.host || process.env.host || defaults.host
  const key: string = argv.key || process.env.key
  const mongoDBUrl = argv.mongoDBUrl || process.env.mongoDBUrl
  const port: number = number(argv.port || process.env.port, defaults.port)
  const isLog: boolean = Boolean(argv.isLog || process.env.isLog || defaults.isLog)
  return {
    port, host, cert, key, mongoDBUrl, isLog,
  }
}
