import {Request, ServerRoute} from 'hapi'

const routers: ServerRoute[]  = [
  {
    method: 'GET',
    path: '/info',
    handler: function() {
      return {
        data: this.lowDB.get('info').value(),
      }
    }
  },
  {
    method: 'POST',
    path: '/info',
    handler: function(request: Request) {
      const {data} = request.payload as any
      this.lowDB.set('info', data).write()
      return {
        data: this.lowDB.get('info').value(),
      }
    }
  },
  {
    method: 'GET',
    path: '/docs',
    handler: function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {offset = 0, take = 5} = request.params as any
      const docs = this.lowDB.get('docs').value()
      return {
        data: [...docs].splice(offset, take)
      }
    }
  },
  {
    method: 'POST',
    path: '/docs',
    handler: function(request: Request) {
      // eslint-disable-next-line no-magic-numbers
      const {title, description, ok = false} = request.payload as any
      let status = 'error'
      if(!title && !description){
        this.lowDB.get('docs').push({
          title, description, ok
        }).write()
        status = 'ok'
      }
      return {
        status,
      }
    }
  },
]


export default routers