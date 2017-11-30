var canvas;
var cols, rows;
var scl = 10;
var land = [];
var w = 600;
var h = 600;
var noiseOffsetSlider, heightSlider;
var terrain;
var flying = 0;

function setup(){
    canvas = createCanvas(600,600,WEBGL);
    cols = w/scl;
    rows = h/scl;
    
    //create Sliders
    createP(' ')
    createSpan('Noise: ');
    noiseOffsetSlider = createSlider(0,0.5,0.14,0);
    createP(' ');
    createSpan('Height:');
    heightSlider = createSlider(0,100,20,5);

    //make a 2D array
    terrain = [];
    for (var i = 0; i < cols; i++) {
        terrain[i] = [];
    }
    console.log(terrain);
    
    background(40);
}
function draw(){
    flying -= noiseOffsetSlider.value();

    let yoff = flying;
    for (var y = 0; y < rows; y++) {
        let xoff = 0;
        for (var x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff,yoff),0,1,-20 - heightSlider.value(),100 + heightSlider.value());
            xoff += noiseOffsetSlider.value();
        }
        yoff += noiseOffsetSlider.value();
    }

    background(40);
    stroke(255);
    //noFill();
    rotateX(PI/3);
    translate(-width/2, -height/2);
    for (var y = 0; y < rows-1; y++) {
        beginShape(TRIANGLE_STRIP);
        for (var x = 0; x < cols; x++) {
            if(terrain[x][y] < 0){
                fill(50,100,235);
            } else if(terrain[x][y] < 15){
                fill(102, 61, 36);
            } else if(terrain[x][y] < 30){
                fill(83, 102, 59);
            } else if(terrain[x][y] < 50){
                fill(65, 72, 97);
            } else{
                fill(235, 235, 235);
            }
            noStroke();
            vertex(x*scl, y*scl, terrain[x][y]);
            vertex(x*scl, (y+1)*scl, terrain[x][y+1]);
        }
        endShape();
    }

}

