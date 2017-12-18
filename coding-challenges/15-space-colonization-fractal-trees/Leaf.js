class Leaf{
    constructor(){
        this.pos = createVector(random(width), random(height));
        this.r = 4;
        this.reached = false;
    }

    show(){
        fill(80, 164, 63);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }
}