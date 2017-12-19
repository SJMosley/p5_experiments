let canvas;
let nSlider;
let aSlider;
let bSlider;
let superEll;


function setup(){
    canvas = createCanvas(500,500);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('n Slider');
    nSlider = createSlider(0.1,6,2,0);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('a slider');
    aSlider = createSlider(50, 200, 100, 1);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('b slider');
    bSlider = createSlider(50,200,100,1);
    createP(' '); //Why am I doing this whyyyyy?
    superEll = new superellipse(null, nSlider.value(), aSlider.value(), bSlider.value());
    background(40);
}

function draw(){
    background(40);
    translate(width/2, height/2);
    stroke(255);
    
    superEll.update(nSlider.value(), aSlider.value(), bSlider.value());
    superEll.display();
}