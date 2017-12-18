class Spinner{
    constructor(){
        this.pos = createVector(width/2, height/2);
        this.rotation = 0;
        this.angularvel = 0;
        this.angularacc = 0;
        this.friction = 0.0001;
        this.r = 12;
        this.attachedBubbles = [];
    }

    run(){
        this.update();
        this.updateBubbles();
        this.display();
    }

    applyTorque(_vel, _pos, col){
        // Torque = Cross Product of (Distance Vector (r) & Velocity Vector)
        let r = p5.Vector.sub(this.pos, _pos); //position vector
        let torque = p5.Vector.cross(r, _vel);
        
        //Magnitude of the torque = distance from fulcrum(r2) * mag of force applied(_vel.mag()) * sin(Theta)
        // Theta = angle between force vector and position vector
        let r2 = dist(this.pos.x, this.pos.y, _pos.x, _pos.y);
        //let theta = r.angleBetween(_vel);

        //Moment of inertia = mass * distance to pivot point squared
        let i = 10 * r2 * r2;

        //angular acceleration = Torque(net) magnitude / Moment of intertia
        this.angularacc = torque.mag()/i;
        this.angularvel += this.angularacc;
        
        this.angularacc = 0;
    }

    moveToGrid(bub){
        //calculate bubbles position in grid and snap to it?

        //cut bubble out of bubbles array
        bubbles.splice(bubbles.indexOf(bub), 1);

        let target = createVector(width/2, height/2);

        bub.pos.x = target.x - bub.pos.x;
        bub.pos.y = target.y - bub.pos.y;
        console.log(bub.pos);
        this.attachedBubbles.push(bub);


    }

    update(){
        this.rotation += this.angularvel;
        // console.log(this.angularvel);
        if(this.angularvel > 0.05){
            this.angularvel = 0.05;
        } else if(this.angularvel > 0){
            this.angularvel -= this.friction;
            if(this.angularvel < 0){
                this.angularvel = 0;
            }
        }
    }
    
    updateBubbles(){
        for (var i = 0; i < this.attachedBubbles.length; i++) {
            let deltaX = 0;
            let deltaY = 0;
            
            this.attachedBubbles[i].pos = createVector(
                this.attachedBubbles[i].pos.x + deltaX,
                this.attachedBubbles[i].pos.x + deltaY
            );
        }
    }

    display(){
        fill(85);
        stroke(200);
        strokeWeight(2);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.rotation);
        beginShape();
        for (var i = 0; i < 6; i++) {
            let x = cos(i*(TWO_PI/6)) * this.r;
            let y = sin(i*(TWO_PI/6)) * this.r;
            vertex(x,y);
        }
        endShape(CLOSE);
        this.displayBubbles();
        pop();
    }
    displayBubbles(){
        for (var i = 0; i < this.attachedBubbles.length; i++) {
            this.attachedBubbles[i].run();
        }
    }
}



//let newX = cos(this.angle) * this.distance;
//let newY = sin(this.angle) * this.distance;