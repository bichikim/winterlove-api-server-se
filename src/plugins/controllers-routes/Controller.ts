import {Server} from 'hapi'

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
