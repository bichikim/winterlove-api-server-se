import {Server, HandlerDecorations, Lifecycle, ServerRoute} from 'hapi'
import {Schema} from 'Joi'
import {LowdbAsync} from 'lowdb'

declare interface IAPIServer {
  readonly server: Server

  register(plugin: any, options?: any): Promise<any>

  start(): Promise<Server>

  stop(options?: {timeout: number}): void
}

declare interface IServerRoute extends ServerRoute{
  config?: {
    description?: string
    notes?: string
    tags: string[]
    response?: {}
    validate?: {
      payload?: {
        [name: string]: Schema
      }
      params?: {
        [name: string]: Schema
      },
      query?: {
        [name: string]: Schema
      }
      headers?: Schema
    }
    handler: Lifecycle.Method | HandlerDecorations
  }
}

interface IContext {
  lowDB: LowdbAsync<any>
}