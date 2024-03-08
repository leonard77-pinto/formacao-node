import { Readable, Writable, Transform } from "node:stream";

class TestRead extends Readable {
    i = 0;

    _read(){
        //const x = this.i++
        this.i++

        setTimeout(()=>{
            if(this.i > 10){
                this.push(null)
            } else {
                const b = Buffer.from(String(this.i))
    
                this.push(b)
            }
        }, 1000)        
    }
}

class TestWrite extends Writable{
    _write(chunk, encod, callback){
        console.log(Number(chunk.toString()) * 100)
        callback()        
    }
}

class TestTransform extends Transform{
    _transform(chunk, encod, callback){
        callback(null, Buffer.from(String(Number(chunk.toString()) * -1)))
    }
}

//new TestRead().pipe(process.stdout)
new TestRead()
    .pipe(new TestTransform())
    .pipe(new TestWrite())