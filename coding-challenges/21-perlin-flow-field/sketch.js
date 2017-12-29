let canvas;
let noiseScale = 0.1;
let scl = 20;
let cols, rows;
let flowField;
let particles = [];
let zoff = 0;
let imagesSaved = 0;
let fr;

function setup(){
    canvas = createCanvas(500,500);
    background(255);
    strokeWeight(2);
    cols = width/scl;
    rows = height/scl;
    fr = createP('');

    flowField = new Array(cols * rows);

    for (let i = 0; i < 1000; i++) {
        particles[i] = new Particle();
    }
}

function draw(){
    //background(255);
    let yoff = 0;
    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        for (let x = 0; x < cols; x++) {
            let index = (x + y * cols);

            let angle = noise(xoff, yoff, zoff) * TWO_PI * 2;
            let v = p5.Vector.fromAngle(angle);
            v.setMag(0.5);
            flowField[index] = v;
            xoff += noiseScale;
            // stroke(0, 50);
            // push();
            // translate(x * scl, y *scl);
            // rotate(v.heading());
            // strokeWeight(1);
            // //line(0,0,scl,0);
            // pop();


        }
        yoff += noiseScale;

        zoff += 0.0001;
    }
    fr.html(floor(frameRate()));

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        particles[i].follow(flowField);
    }
}

function mouseDragged(){
    particles.push(new Particle(mouseX, mouseY));
}

function keyPressed(){
    if(key === ' '){
        background(255);
    }
}

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
        let name = 'perlin-flow-field';
        if(imagesSaved != 0){
            name += '_';
            save(name + imagesSaved + '.png');
        } else{
            save(name + '.png');
        }
        imagesSaved += 1;
    }
  }, false);