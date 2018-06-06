import {Plugin, ServerRoute} from 'hapi'
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
  register: async function(server, options = {}) {
    const {
      name = './.db/db.json',
      init = {docs: [], info: 'unset', auth: []},
    } = options
    const adapter = new FileAsync(name)
    const db = await Database(adapter)
    db.defaults(init).write()
    server.expose({
      db,
    })
  },
}

export default plugin