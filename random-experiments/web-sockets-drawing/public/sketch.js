let canvas;

function setup(){
    canvas = createCanvas(500,500);
    background(40);
}

function draw(){
    // background(40);
    ellipse(mouseX, mouseY, 60,60);
}