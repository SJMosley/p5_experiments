let canvas;
let socket;
let blob;
let blobs = [];
let food = [];
let zoom = 1;
let dead = false;
let timer = 300;
let timerVal = 300;
let lastPos;

function setup(){
    canvas = createCanvas(500,500);
    socket = io.connect('http://localhost:3000');
    socket.on('heartbeat', heartbeat);
    socket.on('dead', death);

    ellipseMode(RADIUS);
    translate(width/2, height/2);
    resetBlob();

    let data = {
        x:blob.pos.x,
        y:blob.pos.y,
        r:blob.r,
        color: blob.color
    }
    socket.emit('start', data);
    // blobs = [];
    
    for (let i = 0; i < 200; i++) {
        let x = random(-width * 2, width * 2);
        let y = random(-height * 2, height * 2);
        food.push(new Blob(x, y, 8, false));
    }
    background(40);
}

function draw(){
    background(40);

    setFrame();

    handleNetworkBlobs();

    handleFood();

    blob.run();

    sendUpdate();
}

//
function death(){
    lastPos = createVector(blob.pos.x, blob.pos.y);
    console.log({lastPos});
    lastScale = 64/blob.r;
    
    
    setTimeout(resetBlob, 5000);
    dead = true;
    blob = null;
}

function resetBlob(){
    dead = false;
    blob = new Blob(random(-width*2, width*2), random(-height*2, height*2), 15, true);
    // blob = new Blob(0,0, 10);
}

function heartbeat(data){
    blobs = data;
}

function setFrame(){
    //handle positioning and scale

    translate(width/2, height/2);
    if(blob){
        if(blob.r >= 64){
            let newScale = 64/blob.r;
            zoom = lerp(zoom, newScale, 0.1);
            scale(zoom);
        }
        translate(-blob.pos.x, -blob.pos.y);
    } else{
        zoom = lerp(zoom, lastScale, 0.1);
        scale(zoom);
        translate(-lastPos.pos.x, -lastPos.pos.y);
    }
}

function handleNetworkBlobs(){
    if(blobs.length > 0){
        for (let i = blobs.length - 1; i >= 0; i--) {
            let id = blobs[i].id;

            if(id != socket.id && !blobs[i].dead){
                //draw Blob
                strokeWeight(4);
                stroke(blobs[i].color[0]-20, blobs[i].color[1]-20, blobs[i].color[2]-20);
                fill(blobs[i].color[0],blobs[i].color[1],blobs[i].color[2]);
                ellipse(blobs[i].pos.x, blobs[i].pos.y, blobs[i].r, blobs[i].r);
                
                //draw id of blob
                noStroke()
                textAlign(CENTER);
                textSize(12);
                text(blobs[i].id, blobs[i].x, blobs[i].y - blobs[i].r - 20);

                //check for collisions
                if(blob.eats(blobs[i])){
                    //pass blob that died
                    socket.emit('death', blobs[i]);
                }
            }
        }
    }
}

function handleFood(){
    //Own set of food
    for (let i = food.length - 1; i >= 0 ; i--) {
        food[i].draw();

        if(blob.eats(food[i])) food.splice(i,1);   
    }
    if(food.length < 50){
      let x = random(-width * 2, width * 2);
      let y = random(-height * 2, height * 2);
      food.push(new Blob(x, y, 8, false));
    }
}

function sendUpdate(){
    let data = {
        x:blob.pos.x,
        y:blob.pos.y,
        r:blob.r,
        color:blob.color
    }
    socket.emit('update', data);
}