function Boid(x,y,ms, mf){
    this.position = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acc = createVector(0,0);
    this.maxSpeed = 3;
    this.maxForce = 0.05;
    this.r = 7;
    //this.desired = createVector(0,0);

    this.run = function(boids, mouse){
        this.flock(boids, mouse);
        this.update();
        this.borders();
        this.display();
    }
    
    this.applyForce = function (force){
        //possible to add mass here if A = F/M
        this.acc.add(force);
    }

    this.flock = function(boids, mouse){
        var separateForce = this.separate(boids);
        var alignmentForce = this.align(boids);
        var cohesionForce = this.cohesion(boids);
        var fleeForce = this.flee(mouse);
        
        separateForce.mult(separationSlider.value());
        alignmentForce.mult(alignmentSlider.value());
        cohesionForce.mult(cohesionSlider.value());
        fleeForce.mult(fleeSlider.value());

        this.applyForce(separateForce);
        this.applyForce(alignmentForce);
        this.applyForce(cohesionForce);
        this.applyForce(fleeForce);
    }


    this.seek = function(target){
        var desired = p5.Vector.sub(target, this.position);
        desired.setMag(this.maxSpeed);

        var steering = p5.Vector.sub(desired, this.velocity);
        steering.limit(this.maxForce);
        
        return steering;
    }

    this.flee = function(target){
        if(p5.Vector.dist(target, this.position) < 40){
            var desired = p5.Vector.sub(target, this.position);
            desired.setMag(-this.maxSpeed);
        
            var steering = p5.Vector.sub(desired, this.velocity);
            steering.limit(this.maxForce);
            return steering;
        }
        else{
            return createVector(0,0);
        }
        
    }

    this.separate = function(boids){
        var separation = 25;
        var sum = createVector(0,0);
        var count=0;
        for(var i=0; i< boids.length; i++){
            var d = p5.Vector.dist(this.position, boids[i].position);
            if((d > 0)&&( d < separation)){
                var diff = p5.Vector.sub(this.position, boids[i].position);
                diff.normalize();
                diff.div(d);
                
                sum.add(diff);
                count++;
            }
        }
        
        if(count > 0){
            sum.div(count);
        }
        if(sum.mag() > 0){
            sum.normalize();
            sum.mult(this.maxSpeed);

            sum.sub(this.velocity);
            sum.limit(this.maxForce);
        }
        return sum;
    }

    this.cohesion = function(boids){
        var neighborDist = 50;
        var sum = createVector(0,0);
        var count = 0;

        for(var i=0; i<boids.length; i++){
            var d = p5.Vector.dist(this.position, boids[i].position);
            if((d > 0) && (d < neighborDist)){
                sum.add(boids[i].position);
                count++;
            }
        }
        if(count > 0){
            sum.div(count);
            return this.seek(sum);
        } else{
            return createVector(0,0);
        }
 
    }

    this.align = function(boids){
        var neighborDist = 50;
        var sum = createVector(0,0);
        var count = 0;

        for(var i=0; i<boids.length; i++){
            var d = p5.Vector.dist(this.position, boids[i].position);
            if((d > 0) && (d < neighborDist)){
                sum.add(boids[i].velocity);
                count++;
            }
        }
        if(count > 0){
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxSpeed);

            var steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxForce);
            return steer;
        } else{
            return createVector(0,0);
        }

    }

    this.setSpeed = function(speed){
        this.maxSpeed = speed;
    }

    this.update = function (){
        //update velocity
        this.velocity.add(this.acc);
        //limit speed
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);
        
        //reset acceleration
        this.acc.mult(0);
    }

    // Wraparound
    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = width+this.r;
        if (this.position.y < -this.r) this.position.y = height+this.r;
        if (this.position.x > width+this.r) this.position.x = -this.r;
        if (this.position.y > height+this.r) this.position.y = -this.r;
    }

    this.display = function(){
        var greenToOrange = true;
        var time = ((new Date).getTime()%10000)/50;
        var theta = this.velocity.heading() + PI/2;
        var from = color(253, 174, 120);
        var to = color(226, 129, 161);
        
        if(time <= 100){
            fill(lerpColor(from, to, time/100));
        } else{
            fill(lerpColor(to, from, time/100));
        }
        
        
        stroke(200);
        strokeWeight(1);
        {
            push();
            translate(this.position.x, this.position.y);
            rotate(theta);
            beginShape();
            vertex(0, -this.r * 2);
            vertex(-this.r, this.r * 2);
            vertex(this.r, this.r * 2);
            endShape(CLOSE);
            pop();
        }
        //ellipse(this.position.x, this.position.y, this.r*2, this.r*2);
    }
}