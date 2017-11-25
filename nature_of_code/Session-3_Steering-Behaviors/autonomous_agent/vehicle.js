function Vehicle(x,y,m){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 5;
    this.maxForce = 0.5;
    this.r = 5;
    this.arrival = 0;
    this.m;
    //this.desired = createVector(0,0);

    this.applyForce = function (force){
        this.acc.add(force);
    }

    this.seek = function(target){
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(this.maxSpeed);

        var steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);
        
        this.applyForce(steering);
    }

    this.arrive = function(target){
        var desired = p5.Vector.sub(target, this.pos);
        
        var d = desired.mag();
        if(d < this.arrival){
            this.m = map(d, 0, this.arrival, 0, this.maxSpeed);
            desired.setMag(this.m);
        }
        else{
            desired.setMag(this.maxSpeed);
        }


        var steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);

        this.applyForce(steering);
    }

    this.flee = function(target){
        var desired = p5.Vector.sub(target, this.pos);
        desired.setMag(-this.maxSpeed);

        var fleeing = p5.Vector.sub(desired, this.vel);
        fleeing.limit(this.maxForce);
        
        this.applyForce(fleeing);
    }

    this.setSpeed = function(speed){
        this.maxSpeed = speed;
    }
    this.setArrival = function(arrival){
        this.arrival = arrival;
    }
    this.update = function (){
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if(this.pos.x < 24){
            this.pos.x = 24;
        }
        if(this.pos.y < 24){
            this.pos.y = 24;
        }
        if(this.pos.x > width - 24){
            this.pos.x = width - 24;
        }
        if(this.pos.y > height - 24){
            this.pos.y = height -24;
        }
        this.acc.set(0,0);
    }

    this.display = function(){
        var theta = this.vel.heading() + PI/2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
        
        //ellipse(this.pos.x, this.pos.y, 48,48);
    }
}