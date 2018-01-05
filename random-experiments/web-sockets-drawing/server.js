let express = require('express');
let app = express();
let server = app.listen(3000);

console.log('My socket server is running');

app.use(express.static('public'));

app.get('/', () => {

})

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection',newConnection);

function newConnection(socket){
    // console.log('new connection: ' + socket.id);

    socket.on('mouse', mouseMsg);

    function mouseMsg(data){
        //send to all other sockets
        socket.broadcast.emit('mouse', data);
        
        //send to all sockets including self
        //io.sockets.emit('mouse',data);
        // console.log(data);
    }
}