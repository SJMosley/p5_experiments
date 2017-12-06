function ItemSquare(_x, _y, _r){
    this.x = _x;
    this.y = _y;
    this.r = 20;
    let isCollected = false;

    this.display = function(){
        fill(65, 72, 97);
        
        push();
        translate(this.x, this.y);
        rectMode(RADIUS);
        rotate(PI/4);
        rect(0,0, this.r, this.r);
        pop();
    }

    this.setCollected = function(){
        isCollected = true;
    }
    this.isCollected = function(){
        return isCollected;
    }

    this.createCrystals = function(){
        
    }
}