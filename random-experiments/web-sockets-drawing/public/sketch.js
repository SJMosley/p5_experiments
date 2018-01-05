let canvas;
let socket;
let col;

function setup(){
    canvas = createCanvas(500,500);
    socket = io.connect('http://localhost:3000');
    socket.on('mouse', newDrawing);
    col = {
        r: random(255),
        g: random(255),
        b: random(255)
    }
    background(40);
    noStroke();
}

function newDrawing(data){
    fill(data.r,data.g,data.b);
    ellipse(data.x, data.y, 10,10);
}

function draw(){
    // background(40);
}

function mouseDragged(){
    if(mouseIsPressed){
        let data = {
            x: mouseX,
            y: mouseY,
            r:col.r,
            g:col.g,
            b:col.b
        }

        socket.emit('mouse', data);
        // console.log(`Sending ${mouseX}, ${mouseY}`);
        fill(255);
        ellipse(mouseX, mouseY, 10,10);
    }
}