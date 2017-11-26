var canvas;
var spaceship;
var asteroids = [];

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

    spaceship.run();

    for (var i = 0; i < asteroids.length; i++) {
        if(asteroids[i].remove){
            var temp = asteroids.splice(i,1);
            delete temp;
        } else{
            asteroids[i].run();
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


function Asteroid(_pos, _r, _vel){
    if(_pos){
        this.position = createVector(_pos.x, _pos.y);
    } else{
        this.position = createVector(random(width), random(height));
    }
    this.r = _r || 40;
    // this.r = _r || random(10,30);
    if(_vel){
        this.velocity = createVector(_vel.x, _vel.y);
    } else{
        this.velocity = createVector(random(-this.r/10, this.r/10),random(-this.r/10, this.r/10));;
    }

    this.run = function(){
        this.update();
        this.borders();
        this.display();
    }
    this.update = function(){
        this.position.add(this.velocity);
    }
    this.display = function(){
        fill(179, 112, 218);
        ellipseMode(CENTER);
        ellipse(this.position.x, this.position.y, this.r, this.r);
        ellipseMode(CORNER);
    }

    this.contains = function(_pos){
        let inX = false;
        let inY = false;
        if((this.position.x-this.r) < _pos.x && _pos.x < (this.position.x + this.r)){
            inX = true;
        }
        if((this.position.y-this.r) < _pos.y && _pos.y < (this.position.y + this.r) ){
            inY = true;
        }

        return inX && inY;
    }

    this.hit = function(){
        if(this.r > 32){
            asteroids.push(new Asteroid(this.position, this.r/2));
            asteroids.push(new Asteroid(this.position, this.r/2));
            this.remove = true;
        } else{
            this.remove = true;
        }
    }


    // Wraparound
    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = width+this.r;
        if (this.position.y < -this.r) this.position.y = height+this.r;
        if (this.position.x > width+this.r) this.position.x = -this.r;
        if (this.position.y > height+this.r) this.position.y = -this.r;
    }

}

function Bullet(_pos, _vel){
    this.lifetime = 300;
    this.position = createVector(_pos.x,_pos.y);
    this.velocity = createVector(_vel.x,_vel.y).mult(2).limit(8);
    this.r = 3;
    this.remove = false;

    this.run = function(){
        this.update();
        this.display();
        this.lifetime--;
    }

    this.update = function(){
        //move bullet
        this.position.add(this.velocity);
        
        //if outof bounds or waited too long to hit something
        if(this.position.x > width ||
        this.position.y > height||
        this.position.x < 0 ||
        this.position.y < 0 ||
        this.lifetime < 0){
            this.remove = true;
        }

        //go through all asteroids see if it hit anything
        for(let i=0;i<asteroids.length;i++){
            if(asteroids[i].contains(this.position)){
                this.remove = false;
                asteroids[i].hit();
            }
        }
    }

    this.display = function(){
        fill(255, 181, 67);
        rect(this.position.x, this.position.y, this.r, this.r);
    }
}

function Spaceship(){
    this.position = createVector(width/2, height/2);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);

    this.r = 10;
    this.maxSpeed = 5;
    this.bullets = [];
    this.bulletMax = 25;
    this.bulletIndex = 0;

    this.run = function(){
        this.update();
        this.borders();
        this.checkBullets();
        this.display();
    }

    this.update = function(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        this.acceleration.mult(0);
    }

    this.applyForce = function(force){
        this.acceleration.add(force);
    }

    this.display = function(){
        fill(255);

        //push into new coordinate space context
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading()+PI/2);
        beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape(CLOSE);

        pop();
        
    }

    this.die = function(){
        gameOver();
    }

    this.shoot = function(){
        if(this.velocity.x != 0 || this.velocity.y != 0){
            this.bullets.push(new Bullet(this.position, this.velocity));
        } else{
            this.bullets.push(new Bullet(this.position, p5.Vector.fromAngle(0).normalize()));
        }
    }

    this.checkBullets = function(){
        for (var i  = 0; i  < this.bullets.length; i ++) {
            this.bullets[i].run();
            if(this.bullets[i].remove){
                //remove bullet from the array and delete it
                delete this.bullets.splice(i,1);
            }
        }
    }

    // Wraparound
    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = width+this.r;
        if (this.position.y < -this.r) this.position.y = height+this.r;
        if (this.position.x > width+this.r) this.position.x = -this.r;
        if (this.position.y > height+this.r) this.position.y = -this.r;
    }
}

function gameOver(){
    textSize(64);
    fill(255, 253, 84);
    rectMode(CENTER);
    text("YOU DIED",width/2, height/2, 364,64);
    noLoop();
    rectMode(CORNER);
    console.log("so this happened");
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