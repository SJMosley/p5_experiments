function Vehicle(x,y,ms, mf){
    this.pos = createVector(x,y);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = ms || 1;
    this.maxForce = mf || 0.1;
    this.r = 4;
    this.separation = 15;
    //this.desired = createVector(0,0);

    this.run = function(){
        this.update();
        this.borders();
        this.display();
    }


    this.applyForce = function (force){
        //possible to add mass here if A = F/M
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
        if(d < 200){
            var m = map(d, 0, 200, 0, this.maxSpeed);
            desired.setMag(m);
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

    this.follow = function(flow){
        var desired = flow.lookup(this.pos) || this.seek(createVector(mouseX, mouseY));     
        desired.mult(this.maxSpeed);

        var steering = p5.Vector.sub(desired, this.vel);
        steering.limit(this.maxForce);
        this.applyForce(steering);
    }

    this.setSpeed = function(speed){
        this.maxSpeed = speed;
    }

    this.update = function (){
        this.vel.add(this.acc);
        //limit speed
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        
        //reset acceleration
        this.acc.mult(0);
    }

    this.separate = function(vehicles, skipIndex){
        var totalForce = createVector(0,0);
        var count=0;
        for(var i=0; i< vehicles.length; i++){
            var d = p5.Vector.dist(vehicles[i].pos, this.pos);
            if(( d < this.separation)&&(d > 0)){
                var diff = p5.Vector.sub(this.pos, vehicles[i].pos);
                diff.normalize();
                diff.div(d);
                
                totalForce.add(diff);
                count++;
            }
        }
        
        if(count > 0){
            totalForce.div(count);
            totalForce.normalize();
            totalForce.mult(this.maxSpeed);

            steering = p5.Vector.sub(totalForce, this.vel);
            steering.limit(this.maxForce);

        }
        this.applyForce(totalForce);
    }

    this.setSeparation = function(sep){
        this.separation = sep;
    }

    // Wraparound
    this.borders = function() {
        if (this.pos.x < -this.r) this.pos.x = width+this.r;
        if (this.pos.y < -this.r) this.pos.y = height+this.r;
        if (this.pos.x > width+this.r) this.pos.x = -this.r;
        if (this.pos.y > height+this.r) this.pos.y = -this.r;
    }

    this.display = function(){
        var theta = this.vel.heading() + PI/2;
        fill(127);
        stroke(200);
        strokeWeight(1);
        // {
        //     push();
        //     translate(this.pos.x, this.pos.y);
        //     rotate(theta);
        //     beginShape();
        //     vertex(0, -this.r * 2);
        //     vertex(-this.r, this.r * 2);
        //     vertex(this.r, this.r * 2);
        //     endShape(CLOSE);
        //     pop();
        // }
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    }
}