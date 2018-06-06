import {Controller} from '@/plugins/controllers-routes/types'
import {Request, ResponseToolkit} from 'hapi'
import {IContext} from '@/types'
import Boom from 'boom'
export default class Auth extends Controller<IContext> {

  async login(request: Request, h: ResponseToolkit) {
    const {name, password} = request.payload as any
    const {lowDB} = this.context
    const auth = await lowDB.get('auth').find({name, password})
    if(!auth){
      return Boom.forbidden()
    }
    return h.response()
  }

  async join(request: Request, h: ResponseToolkit) {
    const {name, password} = request.payload as any
    const {lowDB} = this.context
    const auth = await lowDB.get('auth').find({name, password})
    if(auth){
      return Boom.forbidden()
    }
    await lowDB.get('auth').push({name, password}).write()
    return h.response()
  }
}