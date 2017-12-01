var x, y, z, a, b, c, dt;
var points;

function setup(){
    createCanvas(600, 600, WEBGL);
    
    points = [];
    
    x = 0.01;
    y = 0;
    z = 0;
    
    a = 10;
    b = 28;
    c = 8/3;
    
    dt = 0.015;
}

function draw(){
    background(40);
    var dx = (a * (y - x)) * dt;
    var dy = (x * (b - z) - y) * dt;
    var dz = (x * y - c * z) * dt;
    
    x += dx;
    y += dy;
    z += dz;
    
    if (points.length > 500) points.splice(0, 1);
    points.push(createVector(x, y, z));
    
    camera();
    
    scale(4);
    rotateX(frameCount * 0.01);
    rotateY(frameCount * 0.01);
    ambientLight(255, 0,0);
    points.forEach(function(p){
        push();
        translate(p.x, p.y, p.z);
        ambientMaterial(255);
        sphere(0.3);
        pop();
    })
}

function mousePressed(){
    //setup();
}