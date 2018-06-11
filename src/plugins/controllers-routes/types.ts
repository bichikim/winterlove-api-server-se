import {Server, ServerRoute} from 'hapi'

export interface IController<T> {
  server: Server
  context: T
  [name: string]: any
}

export class Controller<T> implements IController<T> {
  public readonly server: Server
  public readonly context: T
  constructor(server: Server, context: T) {
    this.server = server
    this.context = context
  }
}

export interface IOptions<T> {
  controllers?: Array<IController<T>>
  routes?: ServerRoute[]
  context?: T
  bindRoutes?: boolean
}
