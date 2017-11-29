//Green Color (93, 198, 80)

function Alien(_x,_y, _col){
    this.position = createVector(_x,_y);
    this.r = 10;
    this.dir = .4;
    this.col = _col;

    this.run = function(){
        this.update();
        this.display();
    }
    this.move = function(num){
        this.position.x = this.position.x + (this.dir * num);
    }
    this.moveDown = function(){
        this.position.y  = this.position.y + yOffset;
    }
    this.hitSide = function(){
        for (var i = 0; i < aliens.length; i++) {
            for (var j = 0; j < aliens[i].length; j++) {
                aliens[i][j].dir = aliens[i][j].dir * -1;
                aliens[i][j].moveDown();
            }
        }
    }
    this.die = function(){
        score = score + 1;
        aliens[this.col].splice(aliens[this.col].indexOf(this),1);

    };
    this.update = function(){
        this.move(1);
        if(this.position.x < this.r || this.position.x > width - this.r){
            this.move(-1);
            this.hitSide();
        }
    }
    this.display = function(){
        fill(93, 198, 80);
        rect(this.position.x, this.position.y, this.r, this.r);
    }
}