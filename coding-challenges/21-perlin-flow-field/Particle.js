class Particle{
    constructor(x,y){
        if(x && y){
            this.pos = createVector(x,y);
        } else{
            this.pos = createVector(random(width),random(height));
        }
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = 2;
        this.prevPos = this.pos.copy();
    }

    update(){
        this.prevPos = this.pos.copy();
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.edges();
    }

    applyForce(force){
        this.acc.add(force);
    }

    follow(ff){
        let x = floor(this.pos.x / scl);
        let y = floor(this.pos.y / scl);

        let index = x + y * cols;
        let force = ff[index];

        this.applyForce(force);
    }

    updatePrev(){
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }

    edges(){
        if(this.pos.x > width){
            this.pos.x = 0;
            this.updatePrev();
        }
        if(this.pos.y > height){
            this.pos.y = 0;
            this.updatePrev();
        }
        if(this.pos.x < 0){
            this.pos.x = width;
            this.updatePrev();
        }
        if(this.pos.y < 0){
            this.pos.y = height;
            this.updatePrev();
        }
    }

    draw(){
        stroke(0,5);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);


    }
}