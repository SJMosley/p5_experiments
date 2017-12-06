function Crystal(_x, _y, _r){
    this.desiredX = _x + random(-_r*1.25, _r*1.25);
    this.desiredY = _y + random(-_r*1.25, _r*1.25);
    this.x = _x;
    this.y = _y;
    this.acc = createVector(0,0);
    this.vel = createVector(0,0);
    this.maxSpeed = 0.5;
    this.remove = false;

    this.run = function(){
        let seekForce = this.seek(createVector(this.desiredX, this.desiredY));
        this.applyForce(seekForce);
        this.update();
        this.display();
    }
    this.update = function(){
        this.vel.add(this.acc);
        this.x += this.vel.x;
        this.y += this.vel.y;

        this.acc.mult(0);
    }

    this.seek = function(target){
        var desired = p5.Vector.sub(target, createVector(this.x, this.y));
        
        desired.setMag(this.maxSpeed);

        if(dist(target.x, target.y, this.x, this.y) > 0.5){
            var steering = p5.Vector.sub(desired, this.vel);
            steering.limit(0.5);
            
            return steering;
        } else{
            this.acc = createVector(0,0);
            this.vel = createVector(0,0);
            return createVector(0,0);
        }

    }

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.display = function(){
        push();
        translate(this.x, this.y);
        fill(207, 255, 255);
        beginShape();
        vertex(0,-6);
        vertex(6,-4);
        vertex(6,4);
        vertex(0,6);
        vertex(-6,4);
        vertex(-6,-4);
        endShape(CLOSE);
        pop();
    }

}

//Easing function from
//https://github.com/danro/jquery-easing/blob/master/jquery.easing.js
//t = current time (going by frames)
//b = startValue
//c = change in value
//d = duration (we are going by frames)
function easeOutCirc(t,b,c,d){
    return c * Math.sqrt(1-(t=t/d-1)*t) + b;
}