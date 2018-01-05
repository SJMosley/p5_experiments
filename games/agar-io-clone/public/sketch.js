let canvas;
let socket;
let blob;
let blobs;
let zoom = 1;

function setup(){
    canvas = createCanvas(500,500);
    socket = io.connect('')
    ellipseMode(RADIUS);
    translate(width/2, height/2);
    blob = new Blob(0, 0, 64);
    blobs = [];

    for (let i = 0; i < 100; i++) {
      let x = random(-width, width);
      let y = random(-height, height);
      blobs.push(new Blob(x, y, 8));
    }
    background(40);
}

function draw(){
    background(40);
    translate(width/2, height/2);
    let newScale = 64/blob.r;
    zoom = lerp(zoom, newScale, 0.1);
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y);

    blob.run();
    if(blobs.length > 0){
        for (let i = blobs.length - 1; i >= 0; i--) {
            blobs[i].draw();
            
            if(blob.eats(blobs[i])){
                blobs.splice(i,1);
            }
        }
    }
}