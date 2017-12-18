var canvas;
let tree;
let max_dist = 200;
let min_dist = 10;
let slider;
let frame = 0;

function setup(){
    canvas = createCanvas(500,500);
    createP(' ');
    slider = createSlider(100, 2000, 250, 5);
    slider.changed(resetSketch);
    
    resetSketch();
}

function draw(){
    background(40);
    tree.show();    
    if(tree.leaves.length > 0){
        tree.grow();
    } else if(tree.leaves.length == 0){
        noLoop();
    }
}

function resetSketch(startPos){
    background(40);
    frame = frameCount;
    if(startPos != undefined){
        tree = new Tree(slider.value(), startPos);
    } else{
        tree = new Tree(slider.value());
    }
    loop();
}

function mousePressed(){
    if(mouseX > 0 && mouseX < width &&
        mouseY > 0 && mouseY < height){
            resetSketch(createVector(mouseX, mouseY));
        }
}