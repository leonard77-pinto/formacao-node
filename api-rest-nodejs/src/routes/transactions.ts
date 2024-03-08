import { FastifyInstance } from "fastify"
import { knex } from "../database"
import { z } from "zod"
import { randomUUID } from "crypto"
import { checkSession } from "../middleware/check-session-id"

export async function transactionRoutes(app: FastifyInstance) {

  app.get('/', {
    preHandler: [checkSession]
  }, async (request) => {

    const t = await knex('transactions')
      .where('session_id', request.cookies.session_id)
      .select()

    return {
      ret: t
    }
  })

  app.get('/:id', {
    preHandler: [checkSession]
  }, async (request) => {

    const schema = z.object({
      id: z.string().uuid()
    })

    const p = schema.parse(request.params)

    const t = await knex('transactions')
      .where({
        'id': p.id,
        'session_id': request.cookies.session_id
      })
      .first()

    return {
      ret: t
    }
  })

  app.get('/sum', {
    preHandler: [checkSession]
  }, async (request) => {
    const s = await knex('transactions')
      .where('session_id', request.cookies.session_id)
      .sum('amount', { as: 'amount' }).first()

    return {
      ret: s
    }
  })

  app.post('/', async (request, reply) => {

    const schema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(['credit', 'debit'])
    })

    const body = schema.parse(request.body)

    let session_id = request.cookies.session_id

    if (!session_id) {
      session_id = randomUUID()

      reply.cookie('session_id', session_id, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      })
    }

    await knex('transactions')
      .insert({
        id: randomUUID(),
        title: body.title,
        amount: body.type == 'credit' ? body.amount : body.amount * -1,
        session_id: session_id
      })

    return reply.status(201).send()
  })
}