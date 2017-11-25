var colorBox = false;
var speedUp = false;
var grow = false;
var count = 0;

var boxSize = 200;
var speed = 10;

function keyPressed(){
    background(180,80,180);    
}
function setup(){
    createCanvas(500,500, WEBGL);
    background(180,80,180);
}

function draw(){

    if(grow){
        if(boxSize < 1000){
            boxSize = boxSize + 1;
        }
    }
    else{
        if(boxSize > 200){
            boxSize = boxSize - 1;
        }
    }

    if(colorBox){
        fill(18,232,98);
    }
    else{
        fill(255);
    }
    rotateX(frameCount * speed/1000);
    rotateY(frameCount * speed/1000);
    box(boxSize,boxSize, boxSize);
}

function mouseClicked(){
    if(count > 2){
        count = 0;
    }
    count++;
    switch(count){
        case 1: 
        grow = true;
        break;
        case 2:
        grow = false;
        colorBox = true;
        break;
        default: 
        colorBox = false;
        grow = false;
        break;
    }
}