import {Server} from 'hapi'

export interface IController<C, M> {
  readonly server: Server
  readonly context: C
  readonly models: M
}

export default class Controller<C, M> implements IController<C, M> {
  public readonly server: Server
  public readonly context: C
  public readonly models: M

  constructor(
    server: Server,
    models: M,
    context: C,
  ) {
    this.server = server
    this.context = context
    this.models = models
  }
}
