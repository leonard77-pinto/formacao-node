import http from "node:http";

import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/read-path.js";

const server = http.createServer(async (req, res) => {
   const {method, url} = req

   await json(req, res)

   const route = routes.find(r => {
      return r.method == method && r.url.test(url)
   })

   
   if (route){

      const routeParams = req.url.match(route.url)
      //req.params = {...params.groups}
      const { query, ...params } = routeParams.groups

      req.params = params
      req.query = query ? extractQueryParams(query) : null

      return route.handler(req, res)
   }
   
   return res.writeHead(404).end()
})

server.listen(3333);