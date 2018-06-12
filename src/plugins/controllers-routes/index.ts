import {Plugin, Server} from 'hapi'
import {camelCase, capitalize, forEach} from 'lodash'
import Mongoose from 'mongoose'
import Controller, {IController} from './Controller'
import {IOptions} from './types'
export {Controller, IController}

const plugin: Plugin<IOptions<any, any>> = {
  name: 'controllersRoutes',
  version: '0.0.1',
  register(server: Server, options: IOptions<any, any> = {}) {
    const {
      controllers = {},
      routes = [],
      context = {},
      bindRoutes = true,
    } = options
    Object.freeze(context)
    const controllerInstances: any = {}
    forEach(controllers, (controller: any, key: string) => {
      controllerInstances[key] = new controller(server, Mongoose.models, context)
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
      methodName = camelCase(methodName)
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
      server.bind({
        context,
        modules: Mongoose.models,
      })
    }
    server.route(routes)
  },
}

export default plugin
