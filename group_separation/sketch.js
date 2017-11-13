var canvas;
var vehicles = [];

function setup(){
    canvas = createCanvas(640,360);
    background(40);

    // for(var i=0;i<20;i++){
    //     vehicles.push(new Vehicle(random(width), random(height)));
    // }
}

function draw(){
    background(40);

    var count = 'Boid Count: ' + vehicles.length;
    fill(255);
    text(count, 32,32);

    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].separate(vehicles, i);
        vehicles[i].run();
    }
}

function mouseClicked(){
    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].setSeparation(mouseX/10);
    }
}

function mouseDragged(){
    if(vehicles.length < 500){
        vehicles.push(new Vehicle(mouseX, mouseY, random(1, 3), random(0.1, 0.5)));
    }
}