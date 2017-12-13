class Thorn{
    constructor(numThorns){
        this.angle = TWO_PI/numThorns;
        this.damage = 1;
        this.remove = false;
        this.r = 6;
    }
    updateAngle(num){
        this.angle = TWO_PI/num;
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
        rotate(this.rotation);
        fill(102, 61, 36);
        rectMode(CENTER);
        rect(_dist, 0, 12, 4);
        fill(160,160,160);
        triangle(28, -this.r, 28, this.r, _dist + (this.r * 2), 0);
        pop();
    }
}