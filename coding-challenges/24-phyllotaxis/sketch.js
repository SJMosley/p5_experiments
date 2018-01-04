let canvas;
let seeds = [];
let angle = 137.5;
let scl = 8;
let number = 0;
let shakeCheckbox;

function setup(){
    canvas = createCanvas(500,500);
    background(0);
    colorMode(HSB);
    angleMode(DEGREES)
    noStroke();

    shakeCheckbox = createCheckbox('Shake', false);
}

function draw(){
    colorMode(RGB);
    background(0,25);
    colorMode(HSB);
    translate(width/2, height/2);
    if(seeds.length < 10000){
        let r = scl * sqrt(number);
        let phi = number * angle;
        let seedPos = polarToCartesian(r,phi);
        let seed = new Seed(seedPos, number%255);
        number += 1;
        
        seeds.push(seed);
    } else{
        for (let i = 0; i < seeds.length; i++) {    

        }
    }

    for (let i = 0; i < seeds.length; i++) {
        if(i%3 == 0 && shakeCheckbox.checked()){
            seeds[i].shake();
        }
        seeds[i].draw();
    }
}

function polarToCartesian(r, angle){
    let x = r * cos(angle);
    let y = r * sin(angle);
    return createVector(x,y);
}

class Seed{
    constructor(pos, hu){
        this.pos = pos.copy();
        this.hu = hu;
    }

    update(){}
    shake(){
        this.pos.x += random(-2, 2);
        this.pos.y += random(-2, 2);
    }
    draw(){
        fill(this.hu, 255, 255);
        ellipse(this.pos.x, this.pos.y, 8,8);
    }
}