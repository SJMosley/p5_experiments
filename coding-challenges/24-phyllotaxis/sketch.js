let canvas;
let seeds = [];

function setup(){
    canvas = createCanvas(500,500);
    background(0);
}

function draw(){

}

function polarToCartesian(r, angle){
    let x = r * cos(angle);
    let y = r * sin(angle);
    return createVector(x,y);
}