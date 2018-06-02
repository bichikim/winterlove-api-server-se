import {Plugin} from 'hapi'
import Database from 'node-json-db'
import {resolve} from 'path'
const plugin: Plugin<any> = {
  name: 'jsonDB',
  version: '0.0.1',
  register: function(server, options = {}) {
    const {
      name = resolve(__dirname, '../../.db'),
      autoSave = false,
      readAble = false,
    } = options
    server.expose('jsonDB', new Database(name, autoSave, readAble))
  }
}

export default plugin