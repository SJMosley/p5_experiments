var canvas;
var debug = false;
var flowField;
var vehicles = [];
var pageOpen = new Date();

function setup(){
    canvas = createCanvas(640,360);
    flowField = new FlowField(20);

    for (var i = 0; i < 20; i++) {
        vehicles.push(new Vehicle(random(width), random(height), random(2, 5), random(0.1, 0.5)));
    }
    
}

function draw(){
    background(40);

    var target = createVector(mouseX, mouseY);
    var now = new Date();

    var count = 'Boid Coint: ' + vehicles.length;
    
    fill(255);
    text(count, 32,32);

    if(debug){
        flowField.display();
    }

    if(mouseIsPressed){
        //find which field it is in
        //flowField.change(target);
        
        //get length of vector

        //reset vector to field
    }
    var mouse = createVector(mouseX, mouseY);
    for(var i=0; i<vehicles.length; i++){
        if(vehicles[i] != null){
            //fun gets crazy fast
            //vehicles[i].setSpeed((now.getTime() - pageOpen.getTime())/1000);
            vehicles[i].follow(flowField);
            vehicles[i].run();
        }
    }
}

function mouseDragged(){
    if(vehicles.length < 500){
        vehicles.push(new Vehicle(mouseX, mouseY, random(2, 5), random(0.1, 0.5)));
    }
}

function keyPressed(){
    // console.log("p5 keyCode: " + keyCode);
    // console.log("p5 key: " + key);
    if(key === ' '){
        flowField.init();
    }
    if(key === 'A'){
        debug = !debug;
    }
    if(key === 'R'){
        pageOpen = new Date();
    }
}