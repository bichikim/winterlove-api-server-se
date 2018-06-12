
import {Controller} from '@/plugins/controllers-routes'
import {IContext, IModels} from '@/types'
import {Server} from 'hapi'

/**
 * Controller shortcut with IContext
 */
export default class ServerController extends Controller<IContext, IModels> {
  public readonly server: Server
  public readonly context: IContext
  public readonly models: IModels
}
