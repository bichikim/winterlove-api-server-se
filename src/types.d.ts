import {
  HandlerDecorations,
  Lifecycle,
  ServerRoute,
} from 'hapi'
import {Schema} from 'Joi'
import {LowdbAsync} from 'lowdb'
import {Model} from 'mongoose'

declare interface IServerRoute extends ServerRoute {
  config?: {
    description?: string,
    notes?: string,
    tags: string[],
    response?: {},
    validate?: {
      payload?: {
        [name: string]: Schema,
      },
      params?: {
        [name: string]: Schema,
      },
      query?: {
        [name: string]: Schema,
      },
      headers?: Schema,
    },
    handler: Lifecycle.Method | HandlerDecorations | {
      controller: {
        controller: string,
        method: string,
      } | string,
    },
  }
}

declare interface IContext {
  models: {[name: string]: Model<any>}
  lowDB(): LowdbAsync<any>
  [name: string]: any
}

declare interface IModels {
  Docs: Model<any>
  Info: Model<any>
}
