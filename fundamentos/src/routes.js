import { randomUUID } from "node:crypto";

import { DataBase } from "./db.js";
import { readPath } from "./utils/read-path.js";

const users = new DataBase()

export const routes = [
    {
        method: 'GET',
        url: readPath('/users'),
        handler: (req, res) => {
            //console.log(req.query)
            return res.end(JSON.stringify(users.select('users', req.query)))
        }
    },
    {
        method: 'POST',
        url: readPath('/users'),
        handler: (req, res) => {
            users.insert(
                'users',
                {
                   id: randomUUID(),
                   name: req.body.name,
                   email: req.body.email
                }
             )
             
             return res.writeHead(201).end()       
        }
    },
    {
        method: 'DELETE',
        url: readPath('/users/:id'),
        handler: (req, res) => {
            users.delete('users', req.params.id)
            
            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        url: readPath('/users/:id'),
        handler: (req, res) => {

            const {name, email} = req.body

            users.update('users', req.params.id, {name, email})
            
            return res.writeHead(204).end()
        }
    },

]