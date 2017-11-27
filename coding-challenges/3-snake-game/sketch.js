var canvas;
var snake;
var collectibles = [];

function setup(){
    canvas = createCanvas(500,500);
    background(40);
    
    snake = new Snake();
    collectibles.push(new Collectible());
}
function draw(){
    background(40);

    snake.run(collectibles);
    for (var i = 0; i < collectibles.length; i++) {
        collectibles[i].display();
    }
}

function keyPressed(){
    if(keyCode === UP_ARROW || key === 'W'){
        snake.setVelocity(createVector(0,-1));
    }
    if(keyCode === LEFT_ARROW || key === 'A'){
        snake.setVelocity(createVector(-1,0));
    }
    if(keyCode === DOWN_ARROW || key === 'S'){
        snake.setVelocity(createVector(0,1));
    }
    if(keyCode === RIGHT_ARROW || key === 'D'){
        snake.setVelocity(createVector(1,0));
    }
    if(keyCode === 32 || key === ' '){
        snake.setVelocity(createVector(0,0));
    }
}