function Asteroid(_pos, _r, _vel){
    if(_pos){
        this.position = createVector(_pos.x, _pos.y);
    } else{
        this.position = createVector(random(width), random(height));
    }
    this.r = _r || 40;
    // this.r = _r || random(10,30);
    if(_vel){
        this.velocity = createVector(_vel.x, _vel.y);
    } else{
        this.velocity = createVector(random(-this.r/10, this.r/10),random(-this.r/10, this.r/10));;
    }

    this.run = function(){
        this.update();
        this.borders();
        this.display();
    }
    this.update = function(){
        this.position.add(this.velocity);
    }
    this.display = function(){
        fill(179, 112, 218);
        ellipseMode(CENTER);
        ellipse(this.position.x, this.position.y, this.r, this.r);
        ellipseMode(CORNER);
    }

    this.contains = function(_pos){
        let inX = false;
        let inY = false;
        if((this.position.x-this.r) < _pos.x && _pos.x < (this.position.x + this.r)){
            inX = true;
        }
        if((this.position.y-this.r) < _pos.y && _pos.y < (this.position.y + this.r) ){
            inY = true;
        }

        return inX && inY;
    }

    this.hit = function(){
        if(this.r > 32){
            asteroids.push(new Asteroid(this.position, this.r/2));
            asteroids.push(new Asteroid(this.position, this.r/2));
            this.remove = true;
        } else{
            this.remove = true;
        }
    }


    // Wraparound
    this.borders = function() {
        if (this.position.x < -this.r) this.position.x = width+this.r;
        if (this.position.y < -this.r) this.position.y = height+this.r;
        if (this.position.x > width+this.r) this.position.x = -this.r;
        if (this.position.y > height+this.r) this.position.y = -this.r;
    }

}