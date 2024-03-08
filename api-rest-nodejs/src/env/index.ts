import {config} from 'dotenv'
import { z } from 'zod';

console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV=='test'){
    config({path: '.env.test'})
}else{
    config()
}

const schema = z.object({
    DATA_URL: z.string(),
    DATA_CLIENT: z.enum(['sqlite', 'pg']),
    PORT: z.coerce.number().default(3333),
    NODE_ENV: z.enum(['development', 'test', 'production']).default('production')
})

export const env = schema.parse(process.env)