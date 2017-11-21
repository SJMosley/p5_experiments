function Leaf(pos, timer){
    this.pos = pos.copy();
    this.vel = createVector(0,0);
    this.acc = createVector(0,0.1);
    this.timer = timer;
    this.falling = false;

    this.timeToFall = function(){
        this.timer--;
        if(this.timer < 0 && !this.falling){
            this.falling = true;
            return true;
        }
        else{
            return false;
        }
    }

    this.update = function(){
        if(this.falling){
            this.vel.add(this.acc);
            this.pos.add(this.vel);
        }
    }

    this.display = function(){
        noStroke();
        fill(50,100);
        ellipse(this.pos.x, this.pos.y, 8,8);
    }
}