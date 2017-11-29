function Ship(){
    this.position = createVector(width/2, height-40);
    this.r = 10;
    this.maxSpeed = 3;
    this.bullets = [];

    this.run = function(){
        this.update();
        this.display();
    }
    this.update = function(){
        if(ship.position.x < this.r) ship.position.x = this.r;
        if(ship.position.x > width - this.r) ship.position.x = width - this.r;

        this.checkBullets();
    }
    this.display = function(){
        fill(226, 230, 233);
        rect(this.position.x, this.position.y, this.r, this.r);
    }
    this.checkBullets = function(){
        //just run through bullets see if they hit aliens
        for (var i = 0; i < this.bullets.length; i++) {
            this.bullets[i].update();
            this.bullets[i].display();

            for (var ai = 0; ai < aliens.length; ai++) {
                for (var aj = 0; aj < aliens[ai].length; aj++) {
                    if(dist(this.bullets[i].position.x, 
                        this.bullets[i].position.y, 
                        aliens[ai][aj].position.x, 
                        aliens[ai][aj].position.y)
                    < aliens[ai][aj].r){
                        aliens[ai][aj].die();
                        this.bullets[i].remove = true;
                    }
                }
            }

            if(this.bullets[i].remove){
                this.bullets.splice(i,1);
            }
        }

        
    }
    this.shoot = function(){
        this.bullets.push(new Bullet(this.position.x, this.position.y - this.r));
    }
}

function Bullet(_x,_y){
    this.position = createVector(_x,_y);
    this.velocity = createVector(0,-2);
    this.r = 3;
    this.remove = false;
    this.lifetime = height;

    this.update = function(){
        this.position.add(this.velocity);

        if(this.lifetime > 0){
            this.lifetime--;
        } else{
            this.remove = true;
        }
    }
    this.display = function(){
        fill(255, 181, 67);
        rect(this.position.x, this.position.y, this.r, this.r);
    }
}