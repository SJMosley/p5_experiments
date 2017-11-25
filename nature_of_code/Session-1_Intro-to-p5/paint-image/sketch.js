var img;
var circleSize;
var gridSize = 20;
function preload() {
  img = loadImage("../../../assets/Self-Chatt-Cropped.JPG");
}

function setup() {
  createCanvas(img.width, img.height);
  imageMode(CENTER);
  noStroke();
  background(255);
  img.loadPixels();
}
function draw() {
    if(mouseIsPressed){
        circleSize = 100;
    }
    else{
        circleSize = 20;
    }
    var pix = img.get(mouseX, mouseY);
    fill(pix, 128);
    ellipse(mouseX, mouseY, circleSize, circleSize);

    
}

function keyPressed(){
    if(key === ' '){
        for (var i = 0; i < width/gridSize; i++) {
                for (var j = 0; j < height/gridSize; j++) {
                    var pix = img.get(i*gridSize, j*gridSize);
                    fill(pix, 128);
                    ellipse(i*gridSize, j*gridSize, gridSize+10, gridSize+10);
                }
        }
    }
}