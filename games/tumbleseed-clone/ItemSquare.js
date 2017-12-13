class ItemSquare{
    constructor(_x, _y, _r){
        this.x = _x;
        this.y = _y;
        this.r = 20;
        this.collected = false;
    }

    display(){
        if(this.collected){
            fill(102, 161, 77);
        } else{
            fill(65, 72, 97);
        }
        
        push();
        translate(this.x, this.y);
        rectMode(RADIUS);
        rotate(PI/4);
        rect(0,0, this.r, this.r);
        pop();
    }

    setCollected(){
        this.collected = true;
    }
    isCollected(){
        return this.collected;
    }

    createCrystals(){
        objects.push(new Crystal(this.x, this.y, this.r, 1));
        objects.push(new Crystal(this.x, this.y, this.r, 1));
    }
}