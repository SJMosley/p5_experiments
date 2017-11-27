function Bullet(_pos, _vel){
    this.lifetime = 300;
    this.position = createVector(_pos.x,_pos.y);
    this.velocity = createVector(_vel.x,_vel.y).mult(2).limit(8);
    this.r = 3;
    this.remove = false;

    this.run = function(){
        this.update();
        this.display();
        this.lifetime--;
    }

    this.update = function(){
        //move bullet
        this.position.add(this.velocity);
        
        //if outof bounds or waited too long to hit something
        if(this.position.x > width ||
        this.position.y > height||
        this.position.x < 0 ||
        this.position.y < 0 ||
        this.lifetime < 0){
            this.remove = true;
        }

        //go through all asteroids see if it hit anything
        for(let i=0;i<asteroids.length;i++){
            if(asteroids[i].contains(this.position)){
                this.remove = false;
                asteroids[i].hit();
            }
        }
    }

    this.display = function(){
        fill(255, 181, 67);
        rect(this.position.x, this.position.y, this.r, this.r);
    }
}