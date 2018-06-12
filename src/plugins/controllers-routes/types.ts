import {ServerRoute} from 'hapi'
import {IController} from './Controller'

export interface IOptions<T> {
  controllers?: Array<IController<T>>
  routes?: ServerRoute[]
  context?: T
  bindRoutes?: boolean
}
