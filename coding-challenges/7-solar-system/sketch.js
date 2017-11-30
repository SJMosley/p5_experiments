var canvas;
var stars;
var planets = [];

function setup(){
    canvas = createCanvas(500,500);
    background(40);

    translate(width/2, height/2);
    ellipseMode(RADIUS);
    if(random(1) < 0.4){
        let starSize = random (40, 70);
        let starSpacing = random(10, 20);
        stars[0] = new Star(-(starSize + starSpacing/2), 0, starSize);
        stars[1] = new Star((starSize + starSpacing/2), 0, starSize);
    } else{
        let starSize = random (50, 80);
        stars[0] = new Star(0,0, starSize);
    }
}

function draw(){

}