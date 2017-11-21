function Branch(start, vel, n, g){
    this.start = start.copy();
    this.end = start.copy();
    this.vel = vel.copy();
    this.timerstart = n;
    this.timer = n;
    this.generation = g;

    this.isGrowing = true;

    this.timeToBranch = function() {
        this.timer--;
        if(this.timer < 0 && this.isGrowing){
            this.isGrowing = false;
            return true;
        } else {
            return false;
        }
    }

    this.branch = function(angle) {
        //find velocity direction
        var theta = vel.heading();
        //get speed
        var m = vel.mag();
        //turn branch
        theta += radians(angle);

        //convert polar coords to cartesian
        var newVel = createVector(m*cos(theta), m *sin(theta));
        //return newest branch in tree
        return new Branch(this.end, newVel, this.timerstart * 0.66, this.g + 1);

    };

    this.update = function() {
        if(this.isGrowing){
            this.end.add(this.vel);
        }
    }

    this.render = function() {
        stroke(0);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }
}