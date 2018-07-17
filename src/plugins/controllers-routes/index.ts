import {Plugin, Server} from 'hapi'
import {ServerRoute} from 'hapi'
import hapiSwagger from 'hapi-swagger'
import inert from 'inert'
import {camelCase, capitalize, forEach} from 'lodash'
import Mongoose from 'mongoose'
import vision from 'vision'
import Controller, {IController} from './Controller'
export {Controller, IController}

export interface IOptions<C, M> {
  title?: string
  version?: string
  controllers?: {[name: string]: typeof Controller}
  routes?: ServerRoute[]
  context?: C
  bindRoutes?: boolean
  production?: boolean
}

const plugin: Plugin<IOptions<any, any>> = {
  name: 'controllers-routes',
  version: '0.0.1',
  register: async (server: Server, options: IOptions<any, any> = {}) => {
    const {
      title = 'unknown',
      version = 'unknown',
      controllers = {},
      routes = [],
      context = {},
      bindRoutes = true,
      production = true,
    } = options
    Object.freeze(context)
    const controllerInstances: any = {}
    forEach(controllers, (controller: any, key: string) => {
      controllerInstances[key] = new controller(server, context)
    })

    if(!production){
      await server.register([
        inert, vision,
      ])
    }

    await server.register({
      plugin: hapiSwagger,
      options: {
        info: {
          title,
          version,
        },
        documentationPage: !production,
        swaggerUI: !production,
      },
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
