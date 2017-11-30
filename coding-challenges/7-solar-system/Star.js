function Star(_x, _y, _r, _vel){
    this.position =  (_x && _y) ? createVector(_x,_y) : p5.Vector.random2D(); 
    this.r = _r || random(20, 50);
    this.velocity = _vel || createVector(0,0);

    this.run = function(){
        this.update();
        this.display();
    }
    this.update = function(){
        this.position.add(this.velocity);
    }
    this.display = function(){
        rect(this.x, this.y, this.r, this.r);
    }

}