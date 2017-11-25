var canvas;
var currTime;
var branches = 2;
var minLength = 2;

function setup(){
    canvas = createCanvas(500,500);
    background(40);
}

function draw(){
    background(51);
    
    //time based control
    //currTime = ((new Date).getTime()%80000)/10000;
    //angle = PI/(2+currTime);
    
    //mouse based control
    angle = map(mouseX, 0, width, 0, PI/2);
    
    translate(width/2, height);
    stroke(255);
    branch(120, 1);
}

function branch(len, generation){
    strokeWeight(map(generation, 1,10,4,1));
    line(0,0,0,-len);

    translate(0, -len);
    len *= 0.66

    generation++;
    if(len > minLength){
        push();
        rotate(angle);
        branch(len, generation);
        pop();
        
        push();
        rotate(-angle);
        branch(len, generation);
        pop();

        if(branches == 3){
            push();
            branch(len, generation);
            pop();
        }
    }
}

function mouseClicked(){
    if(branches > 2){
        branches = 2
    }
    else{
        branches = 3;
        minLength = 4;
    }
}