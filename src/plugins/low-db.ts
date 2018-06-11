import {Plugin, Server, ServerRoute} from 'hapi'
import Database from 'lowdb'
import FileAsync from 'lowdb/adapters/FileAsync'
interface IOptions {
  name?: string
  bind?: ServerRoute[],
  init?: {[name: string]: any}
}
const plugin: Plugin<IOptions> = {
  name: 'lowDB',
  version: '0.0.1',
  register: async (server: Server, options: IOptions = {}) => {
    const {
      name = './.db/db.json',
      init = {docs: [], info: 'unset', auth: []},
    } = options
    const lowDB = async () => {
      const adapter = new FileAsync(name)
      // eslint-disable-next-line no-return-await
      return await Database(adapter)
    }

    const db = await lowDB()
    db.defaults(init).write()
    server.expose({
      db: lowDB,
    })
  },
}

export default plugin
