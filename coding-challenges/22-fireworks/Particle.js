class Particle{
    constructor(x,y, hu, firework){
        this.pos = createVector(x,y);
        this.firework = firework;
        this.lifespan = 255;
        this.hu = hu;

        if(this.firework){
            this.vel = createVector(0,random(-12, -8));
        } else{
            this.vel = p5.Vector.random2D();
            this.vel.mult(random(3, 15));
        }
        this.acc = createVector(0,0);
    }

    run(){
        this.update();
        this.draw();      
    }

    update(){
        if(!this.firework){
            this.vel.mult(0.85);
            this.lifespan -= 4;
        }

        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

    }

    applyForce(force){
        this.acc.add(force);
    }

    done(){
        if(this.lifespan < 0){
            return true;
        }
        else {
            return false;
        }
    }
    draw(){
        colorMode(HSB);
        stroke(this.hu,255,255, this.lifespan);
        if(!this.firework){
            strokeWeight(2);
        } else{
            strokeWeight(4);
        }
        point(this.pos.x, this.pos.y);
    }
}