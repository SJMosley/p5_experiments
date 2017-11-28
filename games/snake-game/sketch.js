var canvas;
var snake;
var collectibles = [];
var score;
var frameSlider;

function setup(){
    canvas = createCanvas(500,500);
    createP('');
    createSpan('Snake Speed: ');
    frameSlider = createSlider(10,60,15,1);
    background(40);
    frameRate(frameSlider.value());
    snake = new Snake();
    score = 0;
    collectibles.push(new Collectible());
}
function draw(){
    background(40);
    frameRate(frameSlider.value());
    snake.run(collectibles);
    for (var i = 0; i < collectibles.length; i++) {
        collectibles[i].display();
    }

    fill(255, 253, 84);
    text('Score: ' + score, 20,20);
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