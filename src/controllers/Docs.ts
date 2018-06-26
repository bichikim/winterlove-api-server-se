import Controller from '@/Controller'
import {Request, ResponseToolkit} from 'hapi'
export default class Docs extends Controller {
  async get(request: Request) {
    // eslint-disable-next-line no-magic-numbers
    const {offset = 0, take = 5} = request.query as any
    const db = await this.context.lowDB()
    return {
      data: db.get('docs').drop(offset).take(take).value(),
    }
  }
  async save(request: Request) {
    const {title, description, ok = false} = request.payload as any
    console.log(title, description, ok)
    if(!title || !description){
      return {status: 'error'}
    }
    const db = await this.context.lowDB()
    const time = Date.now()
    const doc = {
      time, id: time, title, description, ok,
    }
    await db.get('docs')
      .push(doc)
      .last()
      .write()
    return doc
  }
  async modify(request: Request, h: ResponseToolkit) {
    const {id, title, description, ok} = request.payload as any
    const db = await this.context.lowDB()
    const doc = await db.get('docs').find({id})
    if(doc){
      if(ok){
        doc.assign({ok})
      }
      await doc.assign({title, description}).write()
    }
    return h.response()
  }

  async change(request: Request, h: ResponseToolkit) {
    const {id, ok} = request.payload as any
    const db = await this.context.lowDB()
    const doc = await db.get('docs').find({id})
    if(doc){
      await doc.assign({ok}).write()
    }
    return h.response()
  }

  async delete(request: Request, h: ResponseToolkit) {
    const {id} = request.payload as any
    const db = await this.context.lowDB()
    await db.get('docs').remove({id}).write()
    return h.response()
  }
}
