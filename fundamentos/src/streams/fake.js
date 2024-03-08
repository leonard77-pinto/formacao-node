import { Readable } from "node:stream";

class TestRead extends Readable {
    i = 0;

    _read(){
        //const x = this.i++
        this.i++

        setTimeout(()=>{
            if(this.i > 5){
                this.push(null)
            } else {
                const b = Buffer.from(String(this.i))
    
                this.push(b)
            }
        }, 1000)        
    }
}

fetch('http://localhost:3334', {
    method: 'POST',
    body: new TestRead(),
    duplex: 'half'
}).then(r => {
    return r.text()
}).then(d => {
    console.log(d)
})