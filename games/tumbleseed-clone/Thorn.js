function Thorn(_dist){
    this.damage = 1;
    this.remove = false;
    this.r = 6;
    this.index = seed.thorns.length || 0;
    if(this.index == 0){
        this.originalRotation = 0;
    } else{
        this.originalRotation = 2 * PI/seed.thorns.length;
    }
    // this.rotation = 2 * PI/seed.thorns.length;
    this.x = cos(this.rotation)  * (_dist + (this.r * 2));
    this.y = sin(this.rotation) * (_dist + (this.r * 2));

    this.update = function(seedAngle){
        this.rotation = map(seedAngle, 0, 360, 0, TWO_PI);
        this.x = cos(this.rotation)  * (_dist + (this.r * 1.5));
        this.y = sin(this.rotation) * (_dist + (this.r * 1.5));
    }

    this.display = function(){
        rotate(this.originalRotation);
        fill(102, 61, 36);
        rectMode(CENTER);
        rect(_dist, 0, 12, 4);
        fill(160,160,160);
        triangle(28, -this.r, 28, this.r, _dist + (this.r * 2), 0);
    }

    this.checkEnemies = function(){
        for (var i = 0; i < enemies.length; i++) {
            if(this.x < enemies[i].pos.x + enemies[i].r &&
               this.y < enemies[i].pos.y + enemies[i].r &&
               this.x > enemies[i].pos.x + enemies[i].r &&
               this.y > enemies[i].pos.y + enemies[i].r ){
                enemies[i].hit(this.damage);
            }
        }
    }
}