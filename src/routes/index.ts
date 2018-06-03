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