import {IServerOptions, name} from './getArgv'
import Http2, {Http2Server, Http2SecureServer} from 'http2'
import fs from 'fs'

export function getListener(options: IServerOptions = {}): Http2Server | Http2SecureServer {
  const {protocol = 'http', key, cert} = options
  if(protocol === 'https'){
    if(!key || !cert){
      throw new Error(`[${name()}] key -> ${key} or cert -> ${cert} is not defined`)
    }
    return Http2.createSecureServer({
      key: fs.readFileSync(cert),
      cert: fs.readFileSync(key),
    })
  }
  return Http2.createServer()
}