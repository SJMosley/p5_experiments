var canvas;
var rain = [];
var rainCount = 200;
var x;
var y;

function setup(){
    canvas = createCanvas(500,500);
    background(40);
    for (var i = 0; i < rainCount; i++) {
        rain[i] = new Rain();
    }
    drop = new Rain();
    x = width/2;
    y =0;
}

function draw(){
    background(40);
    y++;
    for (var i = 0; i < rain.length; i++) {
        rain[i].run();
    }
}

function Rain(){
    this.x = random(0,width);
    this.y = random(0, height);
    this.z = random(1,4);
    this.length = random(25, 50);
    this.speed = random(5,10);
    this.run = function(){
        this.update();
        this.display();
        if(this.y - this.length > height){
            this.reset();
        }
                
    }
    this.update = function(){
        this.y += this.speed;
        this.speed += 0.1;
    }
    this.display = function(){
        strokeWeight(this.z);
        stroke(138,43,226);
        line(this.x, this.y, this.x, this.y - this.length);
    }
    this.reset = function(){
        this.x = random(0,width);
        this.y = random(-1, -5);
        this.z = random(1,4);
        this.length = random(10, 30);
        this.speed = random(5,10);
    }
}