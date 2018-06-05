import {Request, ServerRoute} from 'hapi'

const routers: ServerRoute[]  = [
  {
    method: 'GET',
    path: '/info',
    handler: function() {
      return {
        data: this.lowDB.get('info').value(),
      }
    },
  },
  {
    method: 'POST',
    path: '/info',
    handler: async function(request: Request) {
      const {data} = request.payload as any
      await this.lowDB.set('info', data).write()
      return {
        data: this.lowDB.get('info').value(),
      }
    },
  },
  {
    method: 'GET',
    path: '/docs',
    handler: function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {offset = 0, take = 5} = request.params as any
      const docs = this.lowDB.get('docs').value()
      return {
        data: [...docs].splice(offset, take),
      }
    },
  },
  {
    method: 'POST',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {title, description, ok = false} = request.payload as any
      if(!title || !description){
        return {status: 'error'}
      }
      await this.lowDB.get('docs').push({title, description, ok}).write()
      return {
        status: 'ok',
      }
    },
  },
  {
    method: 'put',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {index, title, description, ok} = request.payload as any
      let status = 'error'
      if(!index || !title || !description){
        return {status}
      }
      await this.lowDB.update('docs', (docs: any[]) => {
        if(!docs[index]){
          return docs
        }
        docs[index] = {
          title, description, ok: ok ? ok : docs[index].ok,
        }
        status = 'ok'
        return docs
      }).write()
      return {
        status,
      }
    },
  },
  {
    method: 'patch',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {index, ok} = request.payload as any
      let status = 'error'
      if(!index || !ok){
        return {status}
      }
      const _ok = ok === 'false' ? false : Boolean(ok)
      await this.lowDB.update('docs', (docs: any[]) => {
        if(!docs[index]){
          return docs
        }
        docs[index].ok = _ok
        status = 'ok'
        return docs
      }).write()
      return {
        status,
      }
    },
  },
  {
    method: 'delete',
    path: '/docs',
    handler: async function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {index} = request.payload as any
      let status = 'error'
      if(!index){
        return {status}
      }
      await this.lowDB.update('docs', (docs: any[]) => {
        if(!docs[index]){
          return docs
        }
        docs.splice(index, 1)
        status = 'ok'
        return docs
      }).write()
      return {
        status,
      }
    },
  },
]


export default routers