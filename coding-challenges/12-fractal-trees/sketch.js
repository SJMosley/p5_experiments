var canvas;
var currTime;
var branches = 2;
var minLength = 4;
let branchCount;
let angle;
let checkBox;

function setup(){
    canvas = createCanvas(500,500);
    background(40);
    checkBox = createCheckbox('uniform', false);
    branchCount = floor(random(2,5));
    angle = random(PI/(branchCount + 1));

    translate(width/2, height);
    stroke(255);
    branch(120, 1);
}

function draw(){
    //background(51);
    
    
}

function branch(len, generation){
    strokeWeight(map(generation, 1,10,4,1));
    line(0,0,0,-len);

    translate(0, -len);
    len *= 0.66

    generation++;
    
    if(!checkBox.checked()){
        branchCount = floor(random(2,6));
        angle = random(PI/(branchCount + 1));
    }

    if(len > minLength){
        
        if(branchCount > 2){
            for (var i = -floor(branchCount/2); i < ceil(branchCount/2); i++) {
                push();
                rotate(angle * i);
                branch(len, generation);
                pop();
            }
        } else{
            push();
            rotate(-angle);
            branch(len, generation);
            pop();
            push();
            rotate(angle);
            branch(len, generation);
            pop();
        }
        
    }
}

function mouseClicked(){
    background(51);
    if(checkBox.checked()){
        branchCount = floor(random(2,5));
        angle = random(PI/(branchCount + 1));
    }
    translate(width/2, height);
    stroke(255);
    branch(120, 1);
}