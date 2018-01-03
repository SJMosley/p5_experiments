let canvas;
let fireworks = [];
let gravity;

function setup(){
    canvas = createCanvas(500,500);
    gravity = createVector(0,0.2);
    colorMode(HSB);
    background(0);
}

function draw(){
    colorMode(RGB);
    background(0,0,0,25);
    if(random(1) < 0.05){
        fireworks.push(new Firework(random(width),random(height/3 , height)));
    }
    for (let i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].run();

        if(fireworks[i].done()){
            fireworks.splice(i,1);
        }
    }

}