var canvas;

let bubbles;
let spinner;


function setup(){
    canvas = createCanvas(600,650);
    bubbles = [new Bubble()];
    spinner = new Spinner();
    ellipseMode(RADIUS);
    background(40);
}
function draw(){
    background(40);
    
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].run(spinner);
    }
    spinner.run();
}

function mousePressed(){
    let move = p5.Vector.sub(createVector(mouseX, mouseY), bubbles[0].pos);
    bubbles[0].shoot(move);

    bubbles.unshift(new Bubble());
}