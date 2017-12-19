class Leaf{
    constructor(){
        this.pos = p5.Vector.random3D();
        this.pos.mult(random(width/2));
        this.r = 4;
        this.reached = false;
    }

    show(){
        fill(80, 164, 63);
        noStroke();
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        ellipse(0,0, this.r, this.r);
        pop();
    }
}