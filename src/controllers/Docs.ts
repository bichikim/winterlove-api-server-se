import Controller from '@/Controller'
import {Request} from 'hapi'
export default class Docs extends Controller {
  async get(request: Request) {
    // eslint-disable-next-line no-magic-numbers
    const {offset = 0, take = 5} = request.query as any
    const db = await this.context.lowDB()
    return {
      data: db.get('docs').drop(offset).take(take).value(),
    }
  }
}
