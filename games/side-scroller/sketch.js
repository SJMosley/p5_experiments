var canvas;
var char; //character
var obstacle;
function setup(){
    canvas = createCanvas(640,360);
    char = new Character();
    obstacle = createVector();
    background(40);
}

function draw(){
    background(40);
    checkKeys();
    
    
    translate(-char.position.x + 50,0);
    
    var gravity = createVector(0,0.2);
    char.applyForce(gravity);
    
    char.run();
    fill(255,0,100);
    rect(350, height - 50, 50,50);
}

function keyPressed(){
    if(key === 'W' || keyCode === UP_ARROW || key === ' '){
        var jump = createVector(0,-7);
        char.applyForce(jump);
    }
    // if(key === 'A' || keyCode === LEFT_ARROW){
    //     char.position.x--;
    // }
    // if(key === 'S' || keyCode === DOWN_ARROW){
        
    // }
    // if(key === 'D' || keyCode === RIGHT_ARROW){
    //     char.position.x++;

    // }
}

function checkKeys(){
    //W
    if(keyIsDown(87) || keyIsDown(UP_ARROW)){}
    //A
    if(keyIsDown(65) || keyIsDown(LEFT_ARROW)){
        char.position.x -= 2;
    }
    //S
    if(keyIsDown(83) || keyIsDown(DOWN_ARROW)){}
    //D
    if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
        char.position.x += 2;
    }
}