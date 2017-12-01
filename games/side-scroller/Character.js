function Character(){
    this.position = createVector(50,height);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);

    this.applyForce = function(force) {
        this.acceleration.add(force);
    }
    this.run = function(){
        this.update();
        this.display();
    }
    this.update = function(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        this.edges();
    }
    this.display = function(){
        fill(255);
        stroke(0);
        rect(this.position.x, this.position.y-50, 20,50);
    }
    this.edges = function(){
        //if(this.position.x > width) this.position.x = width;
        if(this.position.y > height){
            this.velocity.y *= 0;
            this.position.y = height;
        } 
        //if(this.position.x < 0) this.position.x = 0;
        //if(this.position.y < 0) this.position.y = 0;
    }
}