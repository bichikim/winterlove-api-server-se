import parseArgs from 'minimist'

export interface IServerOptions {
  protocol?: string
  port?: number
  host?: string
  key?: string
  cert?: string
}

function number(data: number, defaultData: number) {
  const num = Number(data)
  if(Number.isNaN(num)){
    return defaultData
  }
  return num
}

export default function getArgv(_argv: any): IServerOptions {
  const defaults = {
    port: 8080,
    host: 'localhost',
  }
  const argv = parseArgs(_argv, {
    alias: {
      r: 'protocol',
      p: 'port',
      h: 'host',
      k: 'key',
      c: 'cert',
    },
  })
  // define option values
  const port: number = number(argv.port || process.env.port, defaults.port)
  const host: string = argv.host || process.env.host || defaults.host
  const cert: string = argv.cert || process.env.cert
  const key: string = argv.key || process.env.key
  let protocol: string
  if(!cert || !key){
    protocol =  'http'
  }else{
    protocol = argv.protocol || process.env.protocol || 'https'
  }
  return {
    port, host, cert, key, protocol,
  }
}

