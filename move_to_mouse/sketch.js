var x = 0, y=0, xoff=0;
var walker;
var moveX = 1;
var moveY = 1;

function Walker(xPos, yPos){
    this.pos = createVector(xPos, yPos);
    this.vel = createVector(0,0);
    
    this.display = function(fillColor) {
        fill(fillColor || 255);
        ellipse(this.pos.x, this.pos.y, 48,48);
    }
    
    this.update = function(mag) {
        var mouse = createVector(mouseX, mouseY);
        this.acc = p5.Vector.sub(mouse, this.pos);
        this.acc.setMag(mag || 0.4);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }
}

function mouseClicked(){
    walker.vel = createVector(0,0);
    billy.vel = createVector(0,0);
}

function setup(){
    createCanvas(500,500);
    walker = new Walker(width/2 , height/2);
    billy = new Walker(mouseX, mouseY);
}

function draw(){
    background(120);

    //Perlin vs Random
    var x = noise(xoff) * width;
    xoff = xoff + 0.05;
    fill(0,0,255);
    ellipse(x, height - 60, 30,30);
    fill(255, 0,0);
    ellipse(random(width), height - 24, 30, 30.);
    
    //Mouse Followers
    walker.display();
    walker.update();
    billy.display(color(0,230,0));
    billy.update(0.6);
}
