import {Request, ResponseToolkit, ServerRoute} from 'hapi'

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
    path: '/',
    handler() {
      console.log('/')
      return {
        a: 'a'
      }
    }
  },
  {
    method: 'GET',
    path: '/a',
    handler(request: Request, h: ResponseToolkit) {
      console.log('/a')
      return h.response('abc')
    }
  }

]


export default routers