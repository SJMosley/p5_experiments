var canvas;
var seed;
var tumble;
var holes = [];

function setup(){
    canvas = createCanvas(500,500);
    background(230);
    
    seed = new Seed();
    tumble = new Tumble();
    
    for (var i = 0; i < 24; i++) {
        holes.push(new Hole(random(width), random(height - 100), floor(random(15,24))));
    }
}

function draw(){
    background(230);

    //check game keys
    checkHeldKeys();


    for (var i = 0; i < holes.length; i++) {
        holes[i].display();
    }
    //Render last so they draw over everything
    tumble.run();
    seed.run();
}

function checkHeldKeys(){
    if(keyIsDown(81) || keyIsDown(87) || keyIsDown(69)){
        //leftside tumble moves up
        tumble.leftPos.y--;
        tumble.leftPos.y = constrain(tumble.leftPos.y,0,height); //keep it on the canvas for now. maybe constrain to a certain angle later
    }
    if(keyIsDown(65) || keyIsDown(83) || keyIsDown(68)){
        //leftside tumble moves down
        tumble.leftPos.y++;
        tumble.leftPos.y = constrain(tumble.leftPos.y++,0,height);
    }
    if(keyIsDown(UP_ARROW)){
        //rightside tumble moves up
        tumble.rightPos.y--;
        tumble.rightPos.y = constrain(tumble.rightPos.y--,0,height);
    }
    if(keyIsDown(DOWN_ARROW)){
        //rightside tumble moves down
        tumble.rightPos.y++;
        tumble.rightPos.y = constrain(tumble.rightPos.y++,0,height);
    }
}

function mousePressed(){
    seed.velocity = createVector(0,0);
    tumble.leftPos.y = mouseY;
    tumble.rightPos.y = mouseY;
}