import {Request, ResponseToolkit} from 'hapi'
import Joi from 'joi'
import {IServerRoute} from '@/types'

const routers: IServerRoute[]  = [
  {
    method: 'GET',
    path: '/info',
    config: {
      description: 'Get info',
      notes: 'Returns a info for a main page',
      tags: ['api', 'info'],
      response: {
        schema: Joi.object({
          data: Joi.string().required().description('info data'),
        }),
      },
      handler: async function() {
        const db = await this.lowDB()
        return {
          data: db.get('info').value(),
        }
      },
    },
  },
  {
    method: 'POST',
    path: '/info',
    config: {
      description: 'Post info',
      notes: 'Save a info for a main page',
      tags: ['api', 'info'],
      validate: {
        payload:{
          data: Joi.string().required(),
        },
      },
      handler: async function(request: Request, h: ResponseToolkit) {
        const {data} = request.payload as any
        const db = await this.lowDB()
        await db.set('info', data).write()
        return h.response()
      },
    },
  },
  {
    method: 'GET',
    path: '/docs',
    config: {
      description: 'Get docs',
      notes: 'Save docs for docs list',
      tags: ['api', 'docs'],
      validate: {
        query: {
          offset: Joi.number(),
          take: Joi.number(),
        },
      },
      response: {
        schema: Joi.object({
          data: Joi.array().items(Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            ok: Joi.boolean().required(),
            id: Joi.number().required(),
            time: Joi.number().required(),
          })).required(),
        }),
      },
      handler: async function(request: Request) {
        // eslint-disable-next-line no-magic-numbers
        const {offset = 0, take = 5} = request.query as any
        const db = await this.lowDB()
        return {
          data: db.get('docs').drop(offset).take(take).value(),
        }
      },
    },
  },
  {
    method: 'POST',
    path: '/docs',
    config: {
      description: 'Post a doc',
      notes: 'Save a doc for docs list',
      tags: ['api', 'docs'],
      validate: {
        payload: {
          title: Joi.string().required(),
          description: Joi.string().required(),
          ok: Joi.boolean(),
        },
      },
      handler: async function(request: Request) {
        const {title, description, ok = false} = request.payload as any
        if(!title || !description){
          return {status: 'error'}
        }
        const db = await this.lowDB()
        const time = Date.now()
        const doc = {
          time, id: time, title, description, ok,
        }
        await db.get('docs')
          .push(doc)
          .last()
          .write()
        return doc
      },
    },

  },
  {
    method: 'PUT',
    path: '/docs',
    config: {
      description: 'Update a doc',
      notes: 'Update a doc for docs list',
      tags: ['api', 'docs'],
      validate: {
        payload: {
          id: Joi.number().required(),
          title: Joi.string().required(),
          description: Joi.string().required(),
          ok: Joi.boolean(),
        },
      },
      handler: async function(request: Request, h: ResponseToolkit) {
        const {id, title, description, ok} = request.payload as any
        const db = await this.lowDB()
        const doc = await db.get('docs').find({id})
        if(doc){
          if(ok){
            doc.assign({ok})
          }
          await doc.assign({title, description}).write()
        }
        return h.response()
      },
    },

  },
  {
    method: 'PATCH',
    path: '/docs',
    config: {
      description: 'Fix a doc',
      notes: 'Fix a doc for docs list',
      tags: ['api', 'docs'],
      validate: {
        payload: {
          id: Joi.number().required(),
          ok: Joi.boolean(),
        },
      },
      handler: async function(request: Request, h: ResponseToolkit) {
        const {id, ok} = request.payload as any
        const db = await this.lowDB()
        const doc = await db.get('docs').find({id})
        if(doc){
          await doc.assign({ok}).write()
        }
        return h.response()
      },
    },
  },
  {
    method: 'delete',
    path: '/docs',
    config: {
      description: 'Delete a doc',
      notes: 'Delete a doc for docs list',
      tags: ['api', 'docs'],
      validate: {
        payload: {
          id: Joi.number().required(),
        },
      },
      handler: async function(request: Request, h: ResponseToolkit) {
        const {id} = request.payload as any
        const db = await this.lowDB()
        await db.get('docs').remove({id}).write()
        return h.response()
      },
    },
  },
]


export default routers