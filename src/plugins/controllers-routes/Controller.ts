import {Server} from 'hapi'
import Mongoose from 'mongoose'

export interface IController<C, M> {
  readonly server: Server
  readonly context: C
  readonly models: M
}

export default class Controller<C, M> implements IController<C, M> {
  public readonly server: Server
  public readonly context: C

  constructor(
    server: Server,
    context: C,
  ) {
    this.server = server
    this.context = context
  }

  // eslint-disable-next-line class-methods-use-this
  get models(): M {
    return Mongoose.models as any
  }
}
