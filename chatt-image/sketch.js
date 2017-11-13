var img;
var circleSize;
function preload() {
  img = loadImage("../assets/Self-Chatt-Cropped.JPG");
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