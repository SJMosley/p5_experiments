class Zombie{
    constructor(x,y){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = 1.5;
        this.dying = false;
        this.deathTimer = 500;
        this.remove = false;
    }
    run(){
        if(char.cloakActive){
            this.applyForce(p5.Vector.random2D().normalize().mult(0));
        } else{
            this.follow(char);
        }
        this.checkWindow();
        this.checkPlayer();
        this.update();
        this.draw();
    }

    applyForce(force){
        this.acc.add(force);
    }

    follow(t){
        let target = t.pos;
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);

        var steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);
        
        this.applyForce(steering);
    }

    draw(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI/2);
        if(this.dying){
            fill(148, 151, 159);
            ellipse();
        } else{
            fill(83, 102, 59);
            beginShape();
            vertex(-10,0);
            vertex(0,10);
            vertex(10,0);
            endShape(CLOSE);
        }
        pop();
    }

    update(){
        if(this.dying){
            this.deathTimer -= 1;

            if(this.deathTimer < 0){
                this.remove = true;
            }
        }
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.mult(0);
    }

    checkWindow(){
        if(this.pos.x < 225&&
            this.pos.x > 175&&
            this.pos.y < 335&&
            this.pos.y > 285){
                this.dying = true;
            }
    }

    checkPlayer(){
        if(char.pos.x - 10 < this.pos.x &&
            char.pos.x + 10 > this.pos.x &&
            char.pos.y - 10 < this.pos.y &&
            char.pos.y + 10 > this.pos.y){
                console.log('happening');
            char.health -= 1;
            this.remove = true;
        }
    }
}