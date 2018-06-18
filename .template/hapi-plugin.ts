import {Plugin, Server} from 'hapi'
interface IOptions {
  aaa?: any
}

const plugin: Plugin<IOptions> = {
  name: 'hapi-plugin',
  version: '0.0.1',
  register: async (server: Server, options: IOptions = {}) => {
    const {
      aaa,
    } = options
    console.log(server, aaa)
  },
}

export default plugin
