import {
  HandlerDecorations,
  Lifecycle,
  ServerRoute,
} from 'hapi'
import {Schema} from 'Joi'
import {LowdbAsync} from 'lowdb'

declare interface IServerRoute extends ServerRoute{
  config?: {
    description?: string
    notes?: string
    tags: string[]
    response?: {}
    validate?: {
      payload?: {
        [name: string]: Schema,
      }
      params?: {
        [name: string]: Schema,
      },
      query?: {
        [name: string]: Schema,
      }
      headers?: Schema,
    }
    handler: Lifecycle.Method | HandlerDecorations,
  }
}

interface IContext {
  lowDB(): LowdbAsync<any>
}
