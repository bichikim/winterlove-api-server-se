import {Server} from 'hapi'
import {Model} from 'mongoose'

export interface IController<T> {
  readonly server: Server
  readonly context: T
  readonly models: Array<Model<any>>
  [name: string]: any
}

export default class Controller<T> implements IController<T> {
  public readonly server: Server
  public readonly context: T
  public readonly models: Array<Model<any>>

  constructor(
    server: Server,
    models: Array<Model<any>>,
    context: T,
  ) {
    this.server = server
    this.context = context
    this.models = models
  }
}
