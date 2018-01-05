let canvas;
let blobs;

function setup(){
    canvas = createCanvas(500,500);
    blobs.push(new Blob(null, null, 64));
    background(40);
}

function draw(){
    background(40);
    for (let i = 0; i < blobs.length; i++) {
      blobs[i].run();
    }
}