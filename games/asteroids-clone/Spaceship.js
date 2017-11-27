function Spaceship(){
    this.position = createVector(width/2, height/2);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);

    this.r = 10;
    this.maxSpeed = 5;
    this.bullets = [];
    this.bulletMax = 25;
    this.bulletIndex = 0;

    this.run = function(){
        this.update();
        this.borders();
        this.checkBullets();
        this.display();
    }

    this.update = function(){
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.position.add(this.velocity);

        this.acceleration.mult(0);
    }

    this.applyForce = function(force){
        this.acceleration.add(force);
    }

    this.display = function(){
        fill(255);

        //push into new coordinate space context
        push();
        translate(this.position.x, this.position.y);
        rotate(this.velocity.heading()+PI/2);
        beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape(CLOSE);

        pop();
        
    }

    this.die = function(){
        gameOver();
    }

    this.shoot = function(){
        if(this.velocity.x != 0 || this.velocity.y != 0){
            this.bullets.push(new Bullet(this.position, this.velocity));
        } else{
            this.bullets.push(new Bullet(this.position, p5.Vector.fromAngle(0).normalize()));
        }
    }

    this.checkBullets = function(){
        for (var i  = 0; i  < this.bullets.length; i ++) {
            this.bullets[i].run();
            if(this.bullets[i].remove){
                //remove bullet from the array and delete it
                delete this.bullets.splice(i,1);
            }
        }
    }

    // Wraparound
    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = width+this.r;
        if (this.position.y < -this.r) this.position.y = height+this.r;
        if (this.position.x > width+this.r) this.position.x = -this.r;
        if (this.position.y > height+this.r) this.position.y = -this.r;
    }
}