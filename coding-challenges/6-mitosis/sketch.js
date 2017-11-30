var canvas;
var cells;

function setup(){
    canvas = createCanvas(500,500);
    cells = [];
    background(40);
    ellipseMode(RADIUS);
    
    cells.push(new Cell(random(width), random(height), random(20,50)));
}
function draw(){
    background(40);

    for (var i = 0; i < cells.length; i++) {
        cells[i].run();
    }
}

function mousePressed(){
    for (var i = 0; i < cells.length; i++) {
        if(dist(cells[i].x, cells[i].y, mouseX, mouseY) < cells[i].r){
            cells[i].split();
            break;
        }
    }
}

function keyPressed(){
    if(key === 'C'){
        cells.push(new Cell(random(width), random(height), random(20,50)));
    }
}