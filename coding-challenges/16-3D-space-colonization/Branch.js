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

    show(i){
        if(this.parent){
            let sr = map(this.pos.x, 0, width, 50, 255);
            let sg = map(this.pos.y, 0, height, 50, 255);
            let sb = map(this.pos.z, 0, width, 50, 255);

            stroke(sr, sg, sb);
            let sw = map(i, 0, tree.branches.length, 10, 0);
            strokeWeight(sw);
            line(this.parent.pos.x, this.parent.pos.y, this.parent.pos.z, this.pos.x, this.pos.y, this.pos.z);
        }
    }

    next(){
        let nextDir = p5.Vector.mult(this.dir, this.len);
        let nextPos = p5.Vector.add(this.pos, nextDir);
        let nextBranch = new Branch(this, nextPos, this.dir.copy());
        return nextBranch;
    }
}