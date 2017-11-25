var canvas,mic;

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
}

function setup(){
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    mic = new p5.AudioIn();
    mic.start();
    background(51);
}

function draw(){
    stroke(230,50,20);

    if(mouseIsPressed){
        rect(pmouseX, pmouseY, abs(mouseX-pmouseX), abs(mouseY-pmouseY));
    }
    var circleSize = 15;
    var vol = mic.getLevel();
    ellipse(width/2, height/2,(vol*windowWidth),(vol*windowHeight));
}