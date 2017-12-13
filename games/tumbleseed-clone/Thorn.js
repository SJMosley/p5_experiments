class Thorn{
    constructor(numThorns){
        this.index = numThorns;
        this.angle = numThorns == 0 ? 0 : TWO_PI/numThorns;
        this.damage = 1;
        this.remove = false;
        this.r = 6;
    }
    updateAngle(index, numThorns){
        this.index = index;
        this.angle = TWO_PI/numThorns;
    }
    checkEnemies(enems){
        for (let enemy of enems){
            //if enemy is too close, call hit on the enemy
        }
    }
    update(enems){
        this.checkEnemies(enems);
    }
    display(){
        push();
        rotate(this.index * this.angle);
        fill(102, 61, 36);
        rectMode(CENTER);
        rect(24, 0, 12, 4);
        fill(160,160,160);
        triangle(28, -this.r, 28, this.r, 28 + this.r, 0);
        pop();
    }
}