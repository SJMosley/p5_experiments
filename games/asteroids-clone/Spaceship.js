function Spaceship(){
    this.position = createVector(width/2, height/2);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);

    this.r = 10;
    this.rotation = 0;
    this.maxSpeed = 5;
    this.health = 5;
    this.bullets = [];
    this.bulletMax = 25;
    this.bulletIndex = 0;

    this.run = function(){
        this.update();
        this.borders();
        this.runBullets();
        this.checkAsteroids();
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
 
    this.moveForward = function(){
        let forwardForce = p5.Vector.fromAngle(radians(this.rotation));
        forwardForce.mult(0.1);
        this.applyForce(forwardForce);
    }
    this.display = function(){
        fill(255);

        //push into new coordinate space context
        push();
        translate(this.position.x, this.position.y);
        rotate(radians(this.rotation) + PI/2);
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
        let bulletVec = p5.Vector.fromAngle(radians(this.rotation)).setMag(4);
        this.bullets.push(new Bullet(this.position, bulletVec));
    }

    this.runBullets = function(){
        for (var i  = 0; i  < this.bullets.length; i ++) {
            this.bullets[i].run();
            if(this.bullets[i].remove){
                //remove bullet from the array and delete it
                delete this.bullets.splice(i,1);
            }
        }
    }

    this.checkAsteroids = function(){
        for (var i = 0; i < asteroids.length; i++) {
            if(dist(this.position.x, this.position.y, asteroids[i].position.x, asteroids[i].position.y)<asteroids[i].r){
                this.health--;
                asteroids[i].destroy();
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