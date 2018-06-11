import {IContext} from '@/types'
import {Plugin} from 'hapi'
import capitalize from 'lodash/capitalize'
import {IController, IOptions} from './types'
const plugin: Plugin<IOptions<any>> = {
  name: 'controllersRoutes',
  version: '0.0.1',
  register(server, options: IOptions<IContext> = {}) {
    const {
      controllers = [],
      routes = [],
      context = {},
      bindRoutes = true,
    } = options

    const controllerInstances: {[name: string]: IController<IContext>} = {}
    controllers.forEach((controller: any) => {
      controllerInstances[controller.name] = new controller(server, context)
    })
    const handler = (route: any, options: any) => {
      if(!options){return}
      let {controller, method} = options
      let controllerName: string
      let methodName: string
      if(typeof controller === 'string' && typeof method === 'string'){
        controllerName = controller
        methodName = method
      }else if(typeof options === 'string'){
        const [method, controller] = options.split('@')
        controllerName = controller
        methodName = method
      }
      controllerName = capitalize(controllerName)
      methodName = capitalize(methodName)
      const _controller = controllerInstances[controllerName]
      if(!_controller){
        throw new Error(
          `[controllers-routes] cannot find controller. options is ${options}`,
        )
      }
      const handle = _controller[methodName]
      return handle.bind(_controller)
    }
    server.decorate('handler', 'controller', handler)
    if(bindRoutes){
      Object.freeze(context)
      server.bind(context)
    }
    server.route(routes)
  },
}

export default plugin
