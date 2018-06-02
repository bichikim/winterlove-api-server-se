import {Server} from 'hapi'
import {start} from '@/server'

start().then((server: Server) => {
  if(process.env.NODE_ENV === 'production'){return}
  console.log(
    `Server is running for ${server.info.address}:${server.info.port}\n` +
      `hapi version: ${server.version}`,
  )
})