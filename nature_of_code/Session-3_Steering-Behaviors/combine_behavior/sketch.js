var canvas;
var vehicles = [];
var seekSlider;
var sepSlider;

function setup(){
    canvas = createCanvas(640,360);
    background(40);

    // for(var i=0;i<20;i++){
    //     vehicles.push(new Vehicle(random(width), random(height)));
    // }
    createP('');
    createSpan('Seek');
    seekSlider = createSlider(0,5,1, 0.1);
    createP('');
    createSpan('Separation');
    sepSlider = createSlider(0,5,1, 0.1);


}

function draw(){
    background(40);

    var count = 'Boid Count: ' + vehicles.length;
    fill(255);
    text(count, 32,32);

    //calculate mouse once instead of vehicles.length times. 
    //But could make it lag a little behind actual position based on draw frame
    var mouse = createVector(mouseX, mouseY);

    for (var i = 0; i < vehicles.length; i++) {
        vehicles[i].applyBehaviors(mouse,vehicles, seekSlider.value(), sepSlider.value());
        vehicles[i].run();
    }
}

function mouseClicked(){
    //change separation based on mouseX/10
    // for (var i = 0; i < vehicles.length; i++) {
    //     vehicles[i].setSeparation(mouseX/10);
    // }
}

function mouseDragged(){
    var mouseInCanvas = (mouseX > 0) && (mouseX < width) && (mouseY > 0) && (mouseY < height);
    if(vehicles.length < 500 && mouseInCanvas){
        vehicles.push(new Vehicle(mouseX, mouseY, random(1, 3), random(0.1, 0.5)));
    }
}