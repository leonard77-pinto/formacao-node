import http from "node:http";
import { Transform } from "node:stream";

class TestTransform extends Transform{
   _transform(chunk, encod, callback){
      const t =  String(Number(chunk.toString()) * -1)
      
      console.log(t)

      callback(null, Buffer.from(t))
   }
}

const server = http.createServer(async (req, res) => {
   
   const buffers = []
   
   for await (const chunk of req){
      buffers.push(chunk)
   }

   const content = Buffer.concat(buffers).toString()

   //return req
      //.pipe(new TestTransform())
      //.pipe(res)
   
   return res.end(content)
})

server.listen(3334);