import {Controller} from '@/plugins/controllers-routes/types'
import {Request, ResponseToolkit} from 'hapi'
import {IContext} from '@/types'
import Boom from 'boom'
export default class Auth extends Controller<IContext> {

  async login(request: Request, h: ResponseToolkit) {
    const {name, password} = request.payload as any
    const db = await this.context.lowDB()
    const auth = await db.get('auth').find({name, password})
    if(!auth){
      return Boom.forbidden()
    }
    return h.response()
  }

  async join(request: Request, h: ResponseToolkit) {
    const {name, password} = request.payload as any
    const db = this.context.lowDB()
    const auth = await db.get('auth').find({name, password})
    if(auth){
      return Boom.forbidden()
    }
    await db.get('auth').push({name, password}).write()
    return h.response()
  }
}