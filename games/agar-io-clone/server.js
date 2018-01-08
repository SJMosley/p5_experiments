let blobs = [];

class Blob {
  constructor (id, x, y, r, color) {
    this.id = id;
    this.pos = {
        x:x,
        y:y
    };
    this.r = r;
    this.color = color
    this.dead = false;
  }
}

let express = require('express');
let app = express();
let server = app.listen(3000, listen);
let emitted = false;

function listen(){
    let host = server.address().address;
    let port = server.address().port;

    console.log(`agar running at ` + host);
}

app.use(express.static('public'));

let socket = require('socket.io');
let io = socket(server);

setInterval(heartbeat, 1000/30);

function heartbeat(){
    io.sockets.emit('heartbeat', blobs);
}


io.sockets.on('connection',newConnection);

function newConnection(socket){
    console.log(`new connection: ${socket.id}`);

    socket.on('start', start);
    socket.on('update', update);
    socket.on('death', death);

    function start(data){
        let blob = new Blob(socket.id, data.x, data.y, data.r, data.color);
        blobs.push(blob);
    }

    function update(data){
        //get the matching blob
        let blob = blobs.filter((b) => {
            return b.id == socket.id;
        })[0];

        if(blob){
            blob.pos.x = data.x;
            blob.pos.y = data.y;
            blob.r = data.r;
            blob.color = data.color;
            // console.log(`${blob.x}, ${blob.y}`);
        }

        //broadcast single blob data
        // socket.broadcast.emit('update', data);
    }

    function death(deadBlob){
        console.log(deadBlob);

        let blob = blobs.filter((b) => {
            if(b.id == deadBlob.id){
                b.dead = true;
            }            
            return b.id == deadBlob.id;
        })[0];
        //send
        socket.to(blob.id).emit('dead', 'You died');
    }
}