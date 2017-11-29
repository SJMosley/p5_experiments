var canvas;
var ship;
var aliens = [];
var xOffset, yOffset;
var score = 0;
var debug = true;


function setup(){
    canvas = createCanvas(500,500);
    background(40);
    
    //explicitly set modes
    rectMode(RADIUS);
    ellipseMode(RADIUS);

    //set up 2d array
    for (let i = 0; i < 8; i++) {
        aliens[i] = [];
    }
    xOffset = width/9;
    yOffset = height/10;
    //create aliens in full 2d array
    for (let i = 0; i < aliens.length; i++) {
        for (let j = 0; j < 4; j++) {
            aliens[i][j] = new Alien(xOffset * (i+1), yOffset * (j+1), i);
        }
    }
    ship = new Ship();
    noLoop();
}

function draw(){
    background(40);

    checkKeys();
    for (let i = 0; i < aliens.length; i++) {
        for (let j = 0; j < aliens[i].length; j++) {
             aliens[i][j].run();   
        }
    }
    ship.run();
    fill(255, 253, 84);
    text('Score: ' + score, 20,20);
}

function checkKeys(){
    if(keyIsDown(65) || keyIsDown(LEFT_ARROW)){
        ship.position.x =  ship.position.x - 2;
    }
    if(keyIsDown(68) || keyIsDown(RIGHT_ARROW)){
        ship.position.x =  ship.position.x + 2;
    }
}

function keyPressed(){
    if(key === ' '){
        ship.shoot();
    }
    if(key === 'S')
    {
        debug = !debug;
        
        if(debug){
            noLoop();
        } else {
            loop();
        }
    }
}