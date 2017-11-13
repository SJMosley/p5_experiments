var particles = [];
var liquid;

function setup(){
    createCanvas(500,500);

    for(var i=0;i<10;i++){
        particles[i] = new Particle(i * 50,200,random(2,5));

    }
    liquid = new Liquid(0, height/2, width, height/2);
}

function draw(){
    background(40);

    liquid.display();

    for(var i=0;i<particles.length;i++){
        if(liquid.contains(particles[i])){
            var dragForce = liquid.calculateDrag(particles[i]);
            particles[i].applyForce(dragForce);
        }
        var gravity1 = createVector(0,0.2 * particles[i].mass);

        particles[i].applyForce(gravity1);
        particles[i].update();
        particles[i].edges();
        particles[i].display();
    }
}

function mouseClicked(){
    particles[particles.length] = new Particle(mouseX, mouseY, random(2,5));
}