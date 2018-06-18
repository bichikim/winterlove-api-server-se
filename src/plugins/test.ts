import {Plugin, Server} from 'hapi'
interface IOptions {
  test?: any
}

const plugin: Plugin<IOptions> = {
  name: 'hapi-plugin',
  version: '0.0.1',
  register: (server: Server, options: IOptions = {}) => {
    const {
      test,
    } = options
    console.log(server, test)
  },
}

export default plugin
