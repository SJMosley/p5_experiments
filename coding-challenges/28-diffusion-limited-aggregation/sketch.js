let canvas;
let tree = [];
let walkers = [];
let maxWalkers = 200;
let iterations = 200;
let drawType;
let r = 8;
let drawValue;

function setup(){
    canvas = createCanvas(500,500);
    createP('');
    drawType = createSelect();
    drawType.option('point attractor - center');
    drawType.option('point attractor - random');
    drawType.option('line attractor - top');
    drawType.option('line attractor - bottom');
    drawType.option('line attractor - left');
    drawType.option('line attractor - right');
    drawType.option('rectangle attractor');
    drawType.option('circular attractor');
    drawType.option('internal circular attractor');
    drawType.changed(resetSketch);
    background(40);

    resetSketch();

}
function draw(){
    background(40);

    //needed for everything
    for (let i = 0; i < tree.length; i++) {
        tree[i].draw(i, tree);
    }
    // for (let i = 0; i < walkers.length; i++) {
    //     walkers[i].draw();
    // }
    

    for (let n = 0; n < iterations; n++) {
        for (let i = 0; i < walkers.length; i++) {
            //code that changes
            
            walkers[i].walk();
    
            if(walkers[i].checkStuck(tree)){
                tree.push(walkers[i]);
                walkers.splice(i,1);
            }
        }
    }

    while(walkers.length < maxWalkers && tree.length < 1000){
        walkers.push(new Walker());
    }

    switch(drawValue){
        case 0:
        paCenter();
        break;
        case 1:
        paRandom();
        break;
        case 2:
        laTop();
        break;
        case 3:
        laBottom();
        break;
        case 4:
        laLeft();
        break;
        case 5:
        laRight();
        break;
        case 6:
        rectangleAttractor();
        break;
        case 7:
        circular();
        break;
        case 8:
        internalCircular();
        break;
    }
    
}

function resetSketch(){
    //reset values
    tree = [];
    walkers = [];

    switch(drawType.value()){
        case 'point attractor - center':
        drawValue = 0;
        setupPaCenter();
        break;
        case 'point attractor - random':
        drawValue = 1;
        setupPaRandom();
        break;
        case 'line attractor - top':
        drawValue = 2;
        setupLaTop();
        break;
        case 'line attractor - bottom':
        drawValue = 3;
        setupLaBottom();
        break;
        case 'line attractor - left':
        drawValue = 4;
        setupLaLeft();
        break;
        case 'line attractor - right':
        drawValue = 5;
        setupLaRight();
        break;
        case 'rectangle attractor':
        drawValue = 6;
        setupRectangleAttractor();
        break;
        case 'circular attractor':
        drawValue = 7;
        setupCircular();
        break;
        case 'internal circular attractor':
        drawValue = 8;
        setupInternalCircular();
        break;
        default:
        setupPaCenter();
        break;
    }

}


//setup functions
function setupPaCenter(){
    colorMode(HSB);
    
    tree[0] = new Walker(createVector(width/2, height/2), true);
    for (let i = 0; i < maxWalkers; i++) {
        walkers[i] = new Walker();
    }
}
function setupPaRandom(){}
function setupLaTop(){}
function setupLaBottom(){}
function setupLaLeft(){}
function setupLaRight(){}
function setupRectangleAttractor(){}
function setupCircular(){}
function setupInternalCircular(){}

//setup functions
function paCenter(){}
function paRandom(){}
function laTop(){}
function laBottom(){}
function laLeft(){}
function laRight(){}
function rectangleAttractor(){}
function circular(){}
function internalCircular(){}

//helper functions
function drawPointLine(){}
function drawPointCircle(){}