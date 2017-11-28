function Seed(){
    this.position = createVector(width/2, height/2);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.r = 12;
    this.maxSpeed = 3;
    this.opacity = 255;
    this.falling = false;
    this.fallPosition = createVector(0,0);
    this.fallenHole;
    this.inAir = true;

    this.run = function(){
        if(this.falling){
            this.fall();
        }else{
            this.update();
            this.checkHoles();
        }
        this.display();
    }
    this.applyForce = function(f){
        this.acceleration.add(f);
    }

    this.checkHoles = function(){
        if(!this.inAir){
            for (var i = 0; i < holes.length; i++) {
                if(dist(this.position.x, this.position.y, holes[i].x, holes[i].y) < holes[i].r){
                    console.log('checkHoles');
                    this.fallPosition = this.position;
                    this.fallenHole = holes[i];
                    this.falling = true;
                }
            }
        }
    }
    this.fall = function(){
        //move Seed closer to the hole center after it hits the fall position.
        let fallVector = p5.Vector.sub(createVector(this.fallenHole.x, this.fallenHole.y), this.fallPosition);
        fallVector.mult(0.1);

        this.fallPosition.add(fallVector);
        this.position = this.fallPosition;
        this.opacity = this.opacity - 1;
        if(this.opacity < 0){
            this.reset();
        }

    }
    this.update = function(){
        if(this.inAir){
            this.velocity.setMag(0.3);
        } else{
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
        }
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        if(this.position.x < this.r){
            this.position.x = this.r;
            this.velocity = createVector(0,0);
        } 
        if(this.position.x > width - this.r){
            this.position.x = width - this.r;
            this.velocity = createVector(0,0);
        } 
    }
    this.display = function(){
        fill(223, 120, 115, this.opacity);
        noStroke();
        ellipseMode(RADIUS);
        ellipse(this.position.x, this.position.y, this.r, this.r);
    }
    this.reset = function(){

    };
}