var canvas;
var stars = [];
var lightspeed = false;
function setup(){
    canvas = createCanvas(500,500);
    background(0);
    
    
    for (var i = 0; i < 80; i++) {
        stars.push(new Star(random(width), random(height)));
    }
    for (var i = 0; i < stars.length; i++) {    
        stars[i].display();
    }
}

function draw(){
    background(0);
    if(lightspeed){
        for (var i = 0; i < stars.length; i++) {
            if(stars[i].shouldReset){
                stars[i].reset();
            }
            else{
                stars[i].run();
            }
        }
    }
}

function mousePressed(){
    lightspeed = !lightspeed;
}

function Star(_x,_y){
    this.position = createVector(_x,_y);
    this.slowPosition = createVector(_x,_y);
    this.moveSpeed = p5.Vector.dist(this.position, createVector(width/2, height/2))/20;
    this.movement = p5.Vector.sub(this.position,createVector(width/2, height/2)).setMag(2);
    this.shouldReset = false;

    this.reset = function(){
        let _x = random(width);
        let _y = random(height);
        this.position = createVector(_x,_y);
        this.slowPosition = createVector(_x,_y);
        this.moveSpeed = p5.Vector.dist(this.position, createVector(width/2, height/2))/20;
        this.movement = p5.Vector.sub(this.position,createVector(width/2, height/2)).setMag(2);
        this.shouldReset = false;
    }
    this.run = function(){
        this.update();
        this.display();
    }
    this.update = function(){
        this.moveSpeed = p5.Vector.dist(this.position, createVector(width/2, height/2))/20;
        this.position.add(this.movement.setMag(this.moveSpeed * 2).limit(10));
        this.slowPosition.add(this.movement.setMag(this.moveSpeed).limit(10));
        if(0 > this.slowPosition.x || this.slowPosition.x > width || 0 > this.slowPosition.y || this.slowPosition.y > height){
            this.shouldReset = true;
        }
    }
    this.display = function(){
        stroke(255);
        fill(255);
        line(this.slowPosition.x, this.slowPosition.y, this.position.x, this.position.y);
    }
}