function Rocket(pos_, dna_, totalRockets){
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.position = createVector(pos_.x, pos_.y);

    this.fitness = 0;
    this.dna = dna_;
    this.r = 4;
    this.geneCounter = 0;
    this.recordDist = 10000;
    this.finishTime = 0;

    this.hitObstacle = false;
    this.hitTarget = false;

    this.applyForce = function(f){
        this.acceleration.add(f);
    }

    this.update = function(){
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }


    this.calcFitness = function(){
        if(this.recordDist < 1){
            recordDist = 1;
        }

        //get fitness calc started using distance and time
        this.fitness = (1 / (this.finishTime * this.recordDist));

        this.fitness = pow(this.fitness,4);

        if(this.hitObstacle) this.fitness *= 0.1;
        if(this.hitTarget) this.fitness *= 2;
    }

    this.run = function(os){
        if(!this.hitObstacle && !this.hitTarget){
            this.applyForce(this.dna.genes[this.geneCounter]);
            this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
            this.update();

            //check for obstacles
            this.obstacles(os);
        }

        if(!this.hitObstacle){
            this.display();
        }
    }

    this.checkTarget = function(){
        var d = dist(this.position.x, this.position.y, target.position.x, target.position.y);
        if(d < this.recordDist) this.recordDist = d;

        if(target.contains(this.position) && !this.hitTarget){
            this.hitTarget = true;
        } else if(!this.hitTarget){
            this.finishTime++;
        }
    }

    this.obstacles = function(obstacleList){
        for (var i = 0; i < obstacleList.length; i++) {
            if(obstacleList[i].contains(this.position)){
                this.hitObstacle = true;
            }
        }
    }

    this.display = function(){
        var theta = this.velocity.heading() + PI/2;
        let r = this.r;

        stroke(0);
        //push in so we can translate coordinate space relative to each rocket
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);

        //thrusters
        rectMode(CENTER);
        rect(-r/2, r*2, r/2, r);
        rect(r/2, r*2, r/2, r);

        //rocket body
        fill(255);
        beginShape(TRIANGLES);
        vertex(0, -r*2);
        vertex(-r, r*2);
        vertex(r, r*2);
        endShape(CLOSE);
        //pop out of custom coordinate space
        pop();
    }

    this.getFitness = function(){
        return this.fitness;
    }
    this.getDna = function(){
        return this.dna;
    }
    this.stopped = function(){
        this.hitObstacle;
    }
}