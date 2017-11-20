var canvas;

function setup(){
    canvas = createCanvas(640,640);
    background(51);

    cantor(20,30,600);

    noFill();
    drawCircle(width/2, height*2/3, 300);
}

function draw(){
    noLoop();
}

function drawCircle(x,y,d){
    ellipse(x,y,d,d);

    if(d>10){
        drawCircle(x + d/2, y, d/2);
        drawCircle(x - d/2, y, d/2);
    }
}

function cantor(x,y, length){
    var h=30;

    if(length  >= 1){
        stroke(255);
        strokeWeight(1);

        line(x,y, x+length, y);

        y+=h;

        cantor(x,y,length/3);
        cantor(x+length*2/3, y, length/3);
    }
}
