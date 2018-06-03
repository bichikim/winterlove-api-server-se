import {Plugin, ServerRoute} from 'hapi'
import capitalize from 'lodash/capitalize'
interface IController {
  [name: string]: any
}
interface IOptions {
  controllers?: IController[]
  routes: ServerRoute[]
  context?: {[name: string]: any}
  bindContextAtRoutes?: boolean
}
const plugin: Plugin<IOptions> = {
  name: 'controllersRoutes',
  version: '0.0.1',
  register: function(server, options) {
    const {
      controllers = [],
      routes,
      context = {},
      bindContextAtRoutes = true,
    } = options

    const controllerInstances: {[name: string]: IController} = {}
    controllers.forEach((Controller: any) => {
      controllerInstances[Controller.name] = new Controller(server, context)
    })
    const handler = (route: any, options: any) => {
      if(!options){return}
      let {controller, method} = options
      let controllerName, methodName
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
          `[controllers-routes] cannot find controller. options is ${options}`
        )
      }
      const handle = _controller[methodName]
      return handle.bind(_controller)
    }
    server.decorate('handler', 'controller', handler)
    const bind = bindContextAtRoutes ? context : {}
    Object.freeze(bind)
    server.bind(bind)
    server.route(routes)
  }
}

export default plugin