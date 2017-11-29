function Cell(_x,_y,_r,_st){
    this.x = _x || random(width);
    this.y = _y || random(height);
    this.r = _r || floor(random(10,60));
    this.splitTimerOriginal = _st || random(height/2,height);
    this.splitTimer = this.splitTimerOriginal;


    this.split = function(){
        if(cells.length < 500){
            cells.push(new Cell(this.x, this.y, this.r, this.splitTimerOriginal));
        }
    }
    this.run = function(){
        this.update();
        this.display();

        if(this.splitTimer < 0){
            this.split();
            this.splitTimer = this.splitTimerOriginal;
        }
    }
    this.update = function(){
        this.x = this.x + random(-5,5);
        this.y = this.y + random(-3,3);

        if(this.x < 0) this.x = 0;
        if(this.x > width) this.x = width;
        if(this.y < 0) this.y = 0;
        if(this.y > height) this.y = height;

        this.splitTimer--;
    }
    this.display = function(){
        fill(235, 100,50, 175);
        ellipse(this.x, this.y, this.r, this.r);
    }

    
}