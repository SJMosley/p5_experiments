var canvas;
var sponge;
var debug = false;
var reverseMenger = false;
var backgroundRedraw = true;
var a = 0;

var rotationSpeedSlider;

function setup(){
    createSpan('Rotation Speed:  ');
    rotationSpeedSlider = createSlider(0,0.2,0.01,0.01);
    createP('');
    canvas = createCanvas(500,500, WEBGL);
    background(40);
    translate(width/2, height/2);
    sponge = new Sponge();

}
function draw(){
    if(backgroundRedraw){
        background(40);
    }
    ambientLight(255);
    rotateX(a);
    rotateY(a);
    sponge.display();
    a += rotationSpeedSlider.value();

}

function Sponge(){
    this.cubes = [new Cube()];
    this.generation = 0;
    this.newCubes = []; 

    this.newGeneration = function(){
        for (var i = 0; i < this.cubes.length; i++) {
            this.cubes[i].split(this.newCubes);
        }
        this.cubes = this.newCubes;
        this.newCubes=[];
        this.generation++;
    }
    this.display = function(){
        for (var i = 0; i < this.cubes.length; i++) {
            this.cubes[i].display();
        }
    }
}
function Cube(_r,x,y,z){
    this.r = _r || width/2;
    this.position = createVector(x,y,z);

    this.split = function(_newCubes){
        if(this.r > 15){
            let newR = this.r/3;
            for (var x = -1; x < 2; x++) {
                for (var y = -1; y < 2; y++) {
                    for (var z = -1; z < 2; z++) {
                        //from video after I had figured it out my own way
                        let sum = abs(x) + abs(y) + abs(z);
                        //original cube removal code
                        // !(x==0 && y==0) &&
                        // !(x==0 && z==0) &&
                        // !(y==0 && z==0)
                        if(reverseMenger){
                            logic = sum<=1;
                        } else{
                            logic = sum>1;
                        }
                        if(
                            logic
                        ){
                            _newCubes.push(new Cube(newR,this.position.x + newR*x, this.position.y + newR*y, this.position.z + newR*z));
                        }
                    }
                }
            }
        }
    }

    this.display = function(){
        if(debug){
            stroke(255);
            noFill();
        } else{
            fill(255, 181, 67);
        }
        push();
        translate(this.position.x,this.position.y, this.position.z);
        box(this.r,this.r,this.r);
        pop();
    }
}

function mousePressed(){
    // sponge.newGeneration();
}
function keyPressed(){
    if(key === 'D'){
        debug = !debug;
    }
    if(key === 'B'){
        backgroundRedraw = !backgroundRedraw;
    }
    if(key === ' '){
        sponge.newGeneration();
    }
    if(key ==='N'){
        sponge = new Sponge();
    }
    if(key ==='R'){
        sponge = new Sponge();
        reverseMenger = !reverseMenger;
    }
}

function checkfps(){
    if(frameRate() < 20){
        noLoop();
    }
}