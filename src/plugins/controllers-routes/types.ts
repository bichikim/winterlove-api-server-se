import {ServerRoute} from 'hapi'
import {Controller} from './'

export interface IOptions<C, M> {
  controllers?: {[name: string]: typeof Controller}
  routes?: ServerRoute[]
  context?: C
  bindRoutes?: boolean
}
