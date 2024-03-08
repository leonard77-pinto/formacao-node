import { FastifyReply, FastifyRequest } from "fastify"

export async function checkSession(request: FastifyRequest, reply: FastifyReply){
    const session = request.cookies.session_id

    if(!session){
        return reply.status(401).send({
            error: 'Not Identify User'
        })
    }
}