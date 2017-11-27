var canvas;
var spaceship;
var asteroids = [];
var gameEnd = false;

function setup(){
    canvas = createCanvas(500,500);
    background(40);

    spaceship = new Spaceship();
    for (var i = 0; i < 20; i++) {
        asteroids.push(new Asteroid(createVector(random(width),random(height)), random(10,40)));
    }
}

function draw(){
    background(40);
    // ellipse(mouseX,mouseY, 50,50);

    if(!gameEnd){
        spaceship.run();
        
        for (var i = 0; i < asteroids.length; i++) {
            if(asteroids[i].remove){
                var temp = asteroids.splice(i,1);
                delete temp;
            } else{
                asteroids[i].run();
            }
        }
    
        fill(255);
        text(("Health: " + spaceship.health), 10, 20);

        if(spaceship.health === 0 || asteroids.length === 0){
            gameEnd = true;
        }
    }
    else{
        if(spaceship.health === 0){
            gameOver();
        }
        else{
            gameWin();
        }
    }
}

function keyPressed(){
    if(keyCode === UP_ARROW || key === 'W'){
        spaceship.applyForce(createVector(0,-1));
    }
    if(keyCode === RIGHT_ARROW || key === 'D'){
        spaceship.applyForce(createVector(1,0));
    }
    if(keyCode === DOWN_ARROW || key === 'S'){
        spaceship.applyForce(createVector(0,1));
    }
    if(keyCode === LEFT_ARROW || key === 'A'){
        spaceship.applyForce(createVector(-1,0));
    }
    if(keyCode === 32 || key === ' '){
        spaceship.shoot();
    }
}

function gameOver(){
    textSize(64);
    fill(255, 253, 84);
    rectMode(CENTER);
    text("YOU DIED",width/2, height/2, 364,64);
    noLoop();
    rectMode(CORNER);
}
function gameWin(){
    textSize(64);
    fill(255, 253, 84);
    rectMode(CENTER);
    text("YOU WIN!!",width/2, height/2, 364,64);
    noLoop();
    rectMode(CORNER);
}

function mousePressed(){
    // asteroids.push(new Asteroid(createVector(mouseX, mouseY),100, createVector(0,-4)));
}