class Crystal{
    constructor(_x, _y, _r, _val){
        this.desiredX = _x + random(-_r*1.25, _r*1.25);
        this.desiredY = _y + random(-_r*1.25, _r*1.25);
        this.x = _x;
        this.y = _y;
        this.r = 4;
        this.value = _val || 1;
        this.acc = createVector(0,0);
        this.vel = createVector(0,0);
        this.maxSpeed = 0.5;
        this.collectible = false;
        this.remove = false;
    }

    run(){
        let seekForce = this.seek(createVector(this.desiredX, this.desiredY));
        this.applyForce(seekForce);
        this.update();
        this.display();
    }
    update(){
        this.vel.add(this.acc);
        this.x += this.vel.x;
        this.y += this.vel.y;

        this.acc.mult(0);
    }

    seek(target){
        var desired = p5.Vector.sub(target, createVector(this.x, this.y));
        
        desired.setMag(this.maxSpeed);

        if(dist(target.x, target.y, this.x, this.y) > 0.5){
            var steering = p5.Vector.sub(desired, this.vel);
            steering.limit(0.5);
            
            return steering;
        } else{
            this.acc = createVector(0,0);
            this.vel = createVector(0,0);
            this.collectible = true;
            return createVector(0,0);
        }

    }

    applyForce(force) {
        this.acc.add(force);
    }

    getValue(){
        return this.value;
    }

    getObjName(){
        return 'crystal';
    }
    canCollect(){
        return this.collectible;
    }
    display(){
        push();
        translate(this.x, this.y);

        if(this.value = 1){
            fill(207, 255, 255);
        } else if(this.value = 3){
            fill(255, 165, 26);
        } else if(this.value = 5){
            fill(106, 235, 24);
        }
        beginShape();
        vertex(0,-this.r*2);
        vertex(this.r*1.5,-this.r);
        vertex(this.r*1.5,this.r);
        vertex(0,this.r*2);
        vertex(-this.r*1.5,this.r);
        vertex(-this.r*1.5,-this.r);
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