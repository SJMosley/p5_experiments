function Particle(x,y,mass){
    this.pos = createVector(x || width/2, y || height/2);
    this.vel = createVector(0,0);
    this.acc = createVector(0,0);
    this.mass = mass || 4;
    
    this.update = function(){
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        this.acc.set(0,0);
    }

    this.display = function(){
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.mass * 10, this.mass * 10);
    }
    this.applyForce = function (force){
        var tempForce = force.copy();
        tempForce.div(this.mass)
        this.acc.add(tempForce);
    }
    this.edges = function(){
        var spaceFromEdge = this.mass/2;

        if(this.pos.y > height - spaceFromEdge  || this.pos.y < spaceFromEdge){
            this.vel.y *= -1;
            if(this.pos.y > height - spaceFromEdge){
                this.pos.y = height - spaceFromEdge;
            }else{
                this.pos.y = spaceFromEdge;
            }
        }

        if(this.pos.x > width - spaceFromEdge || this.pos.x < spaceFromEdge){
            this.vel.x *= -1;
            if(this.pos.x > width - spaceFromEdge){
                this.pos.x = width - spaceFromEdge;
            }else{
                this.pos.x = spaceFromEdge;
            }
        }
    }
}