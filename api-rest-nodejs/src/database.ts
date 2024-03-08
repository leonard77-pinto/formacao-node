//import 'dotenv/config'
import { Knex, knex as setupKnex } from 'knex'
import { env } from './env'

export const config: Knex.Config = {
  client: env.DATA_CLIENT,
  connection: env.DATA_CLIENT == 'sqlite'? {
    filename: env.DATA_URL,
  }: env.DATA_URL,
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './db/migrations',
  },
}

export const knex = setupKnex(config)
