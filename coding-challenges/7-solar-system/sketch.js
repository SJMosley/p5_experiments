let canvas;
let sun;
let sunimg;
let planetsimgs;


// function draw(){
//     background(0);
//     ambientLight(100, 80, 80);
//     pointLight(255, 255, 255, mouseX, mouseY, 0);
//     translate(width/2, height/2);
//     sun.orbit();
//     sun.display();
// }

function setup(){
    canvas = createCanvas(710, 400, WEBGL);
    planetsimgs = [];
    sunimg = loadImage("img/sun.jpg");
    planetsimgs[0] = loadImage("img/mercury.jpg");
    planetsimgs[1] = loadImage("img/venus.jpg");
    planetsimgs[2] = loadImage("img/earth.jpg");
    planetsimgs[3] = loadImage("img/mars.jpg");
    planetsimgs[4] = loadImage("img/jupiter.jpg");
    planetsimgs[5] = loadImage("img/saturn.jpg");
    planetsimgs[6] = loadImage("img/uranus.jpg");
    planetsimgs[7] = loadImage("img/neptune.jpg");
    planetsimgs[8] = loadImage("img/pluto.jpg");
    sun = new Planet(50,0,0, sunimg);
    sun.spawnMoons(3,0);
}

function draw(){
    background(0);

    ambientLight(100, 80, 80);
    // pointLight(200, 200, 200, mouseX, mouseY, 0);
    pointLight(255, 255, 255, 0, 0, 0);
    normalMaterial();

   
    sun.orbit();
    sun.display();
}