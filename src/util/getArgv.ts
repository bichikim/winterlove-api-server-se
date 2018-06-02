import parseArgs from 'minimist'
import packageJson from '@/../package.json'
export interface IServerOptions {
  protocol?: string
  port?: number
  host?: string
  key?: string
  cert?: string
}

export function name() {
  return packageJson.name || 'server'
}

export default function getArgv(_argv: any) {
  const defaults = {
    port: 8080,
    host: 'localhost',
  }
  const argv = parseArgs(_argv, {
    alias: {
      pr: 'protocol',
      p: 'port',
      h: 'host',
      k: 'key',
      c: 'cert',
    }
  })

  // define option values
  const port: number = Number(argv.port || process.env.port || defaults.port)
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

