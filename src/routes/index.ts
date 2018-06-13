import {IServerRoute} from '@/types'
import {Request, ResponseToolkit} from 'hapi'
import Joi from 'joi'

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
      async handler() {
        const db = await this.context.lowDB()
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
        payload: {
          data: Joi.string().required(),
        },
      },
      async handler(request: Request, h: ResponseToolkit) {
        const {data} = request.payload as any
        const db = await this.context.lowDB()
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
      // handler can be this type
      handler: {
        controller: {
          controller: 'Docs',
          method: 'get',
        },
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
      // handler can be this type [method]@[controller]
      handler: {
        controller: 'save@Docs',
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
      handler: {
        controller: 'modify@Docs',
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
      handler: {
        controller: 'change@Docs',
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
      handler: {
        controller: 'delete@Docs',
      },
    },
  },
]

export default routers
