let canvas;
let tree = [];
let walkers = [];
let maxTreeLength = 1000;
let maxWalkers = 200;
let iterations = 200;
let drawType;
let r = 4;
let drawValue;
let imagesSaved = 0;

function setup(){
    canvas = createCanvas(500,500);
    createP('');
    drawType = createSelect();
    drawType.option('point attractor - center');
    drawType.option('point attractor - random');
    drawType.option('line attractor - left');
    drawType.option('line attractor - top');
    drawType.option('line attractor - right');
    drawType.option('line attractor - bottom');
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
    for (let i = 0; i < walkers.length; i++) {
        walkers[i].draw();
    }
    
    //always iterates through iterations and walkers.
    for (let n = 0; n < iterations; n++) {
        for (let i = 0; i < walkers.length; i++) {
            standard(i);
        }
    }

    //code that changes
    switch(drawValue){
        case 0: //point attractor - center
        spawnRandom();
        break;
        case 1: //point attractor - random
        spawnRandom();
        break;
        //0,1,2,3 -> Left, Top, Right, Bottom respectively for side values
        case 2: //line attractor - left
        spawnSide(2); //pass in value of opposite side. So right = 2
        break;
        case 3: //line attractor - top
        spawnSide(3);
        break;
        case 4: //line attractor - right
        spawnSide(0);
        break;
        case 5: //line attractor - bottom
        spawnSide(1);
        break;
        case 6: //rectangle attractor
        spawnCenter();
        break;
        case 7: //circular attractor
        spawnRandom();
        break;
        case 8: //internal circular attractor
        spawnCenter();
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
        case 'line attractor - left':
        drawValue = 2;
        setupLaLeft();
        break;
        case 'line attractor - top':
        drawValue = 3;
        setupLaTop();
        break;
        case 'line attractor - right':
        drawValue = 4;
        setupLaRight();
        break;
        case 'line attractor - bottom':
        drawValue = 5;
        setupLaBottom();
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

    //setupWalkers();
}


//setup functions
function setupPaCenter(){
    colorMode(HSB);
    
    tree[0] = new Walker(createVector(width/2, height/2), true);
}
function setupPaRandom(){
    colorMode(HSB);
    
    tree[0] = new Walker(createVector(random(width), random(height)), true);
}
function setupLaLeft(){drawPointLine(0, 0, 0, height, r);}
function setupLaTop(){drawPointLine(0, 0, width, 0, r);}
function setupLaRight(){drawPointLine(width, 0, width, height, r);}
function setupLaBottom(){drawPointLine(0, height, width, height, r);}
function setupRectangleAttractor(){
    //draw all sides
    drawPointLine(0, 0, 0, height, 4);
    drawPointLine(0, 0, width, 0, 4);
    drawPointLine(width, 0, width, height, 4);
    drawPointLine(0, height, width, height, 4);

    maxTreeLength += tree.length;

    
}
function setupCircular(){
    drawPointCircle(50, r);
    maxTreeLength += tree.length;
}
function setupInternalCircular(){
    drawPointCircle(Math.min(width, height)/2, r);
    maxTreeLength += tree.length;
}

//////////////////////////////////////////////
//walk functions
//////////////////////////////////////////////
function standard(i){       
    walkers[i].walk();
    
    if(walkers[i].checkStuck(tree)){
        tree.push(walkers[i]);
        walkers.splice(i,1);
    }
}

//////////////////////////////////////////////
//spawn functions
//////////////////////////////////////////////
function spawnSide(side){
    while(walkers.length < maxWalkers && tree.length < maxTreeLength){
        if(side == 0)     {walkers.push(new Walker(createVector(0            , random(height))))} //Left
        else if(side == 1){walkers.push(new Walker(createVector(random(width), 0)))} //Top
        else if(side == 2){walkers.push(new Walker(createVector(width        , random(height))))} //Right
        else if(side == 3){walkers.push(new Walker(createVector(random(width), height)))} //Bottom
    }
}
function spawnCenter(){
    while(walkers.length < maxWalkers && tree.length < maxTreeLength){
        walkers.push(new Walker(createVector(width/2, height/2)));
    }
}
function spawnRandom(){
    while(walkers.length < maxWalkers && tree.length < maxTreeLength){
        walkers.push(new Walker());
    }
}

//////////////////////////////////////////////
//helper functions
//////////////////////////////////////////////
function drawPointLine(x1,y1,x2,y2 , spacing){
    let dist = Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2));
    let moveVector = p5.Vector.sub(createVector(x2,y2),createVector(x1,y1)).setMag(spacing);
    let numPoints = ceil(dist / spacing); //lets it draw beginning and end

    for (let i = 0; i < numPoints; i++) {
        let x = x1 + (i * moveVector.x) ;
        let y = y1 + (i * moveVector.y) ;

        tree.push(new Walker(createVector(x,y), true));
    }
}
function drawPointCircle(circleRadius, spacing){
    let circumference = TWO_PI * circleRadius;
    let numPoints = ceil(circumference / spacing);
    let angle = TWO_PI / numPoints;

    for (let i = 0; i < numPoints; i++) {
        let x = sin(angle * i) * circleRadius + width/2;
        let y = cos(angle * i) * circleRadius + height/2;
        tree.push(new Walker(createVector(x,y), true));
    }

}


//////////////////////////////////////////////
//Key functions
//////////////////////////////////////////////
document.addEventListener("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
        let name = 'diffusion-limited-aggregation';
        if(imagesSaved != 0){
            name += '_';
            save(name + imagesSaved + '.png');
        } else{
            save(name + '.png');
        }
        imagesSaved += 1;
    }
  }, false);