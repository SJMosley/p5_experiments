class Branch{
    constructor(parent, pos, dir){
        this.parent = parent;
        this.pos = pos;
        this.dir = dir;
        this.originalDir = this.dir.copy();
        this.len = 5;
        this.count = 0;
    }

    reset(){
        this.dir = this.originalDir.copy();
        this.count = 0;
    }

    show(){
        if(this.parent){
            stroke(255);
            strokeWeight(4);
            line(this.parent.pos.x, this.parent.pos.y, this.pos.x, this.pos.y);
        }
    }

    next(){
        let nextDir = p5.Vector.mult(this.dir, this.len);
        let nextPos = p5.Vector.add(this.pos, nextDir);
        let nextBranch = new Branch(this, nextPos, this.dir.copy());
        return nextBranch;
    }
}