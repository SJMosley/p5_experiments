var canvas;
var flock;
var separationSlider;
var cohesionSlider;
var alignmentSlider;
var bgCheckbox,textCheckbox;

function setup(){
    canvas = createCanvas(640,360);
    background(40);

    // for(var i=0;i<20;i++){
    //     flock.addBoid(new Boid(random(width), random(height)));
    // }

    flock = new Flock();

    bgCheckbox = createCheckbox('Redraw BG', true);
    textCheckbox = createCheckbox('Show Boid Count', true);
    var separationTitle = createDiv('Separation: ');
    separationSlider = createSlider(0,5,1, 0.1);
    var cohesionTitle = createDiv('Cohesion: ');
    cohesionSlider = createSlider(0,5,1, 0.1);
    var alignmentTitle = createDiv('Alignment: ');
    alignmentSlider = createSlider(0,5,1,0.1);

    separationTitle.style('margin-top', '32px');


}

function draw(){
    if(bgCheckbox.checked()){
        background(40);
    }
    if(textCheckbox.checked()){
        var count = 'Boid Count: ' + flock.boids.length;
        fill(255);
        text(count, 32,32);
    }

    flock.run();
}

function mouseClicked(){

}

function mouseDragged(){
    var mouseInCanvas = (mouseX > 0) && (mouseX < width) && (mouseY > 0) && (mouseY < height);
    if(flock.boids.length < 500 && mouseInCanvas){
        flock.addBoid(new Boid(mouseX, mouseY, random(1, 3), random(0.1, 0.5)));
    }
}