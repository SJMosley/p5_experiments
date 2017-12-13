class Slug{
    constructor(_x,_y){
        this.ogPos = createVector(_x, _y);
        this.pos = createVector(_x, _y);
        this.r = 12;
        this.r2 = this.r - 3;
        this.r3 = this.r - 5;
        this.travelDistance = 4;
        this.speed = 0.4;
        this.crystalsDropped = 1;
        this.health = 1;
        this.remove = false;

        if(floor(random(2))){
            //if it is 1 go horizontal
            this.dir = createVector(1,0);
            
        }else{
            //if it is 0 go vertical
            this.dir = createVector(0,1);
        }
    }


    
    run(){
        this.update();
        this.display();
    }
    turn(){
        this.dir.mult(-1);
    }
    update(){
        //ensure offset
        if(dist(this.ogPos.x, this.ogPos.y, this.pos.x, this.pos.y) > (this.r*2)*this.travelDistance){
            this.turn();
        }
        this.pos.add(this.dir.setMag(this.speed));

        if(this.pos.x < 0 || this.pos.x > width || this.pos.y < 0){
            this.turn();
        }
    }
    display(){
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.dir.heading() + PI/2);
        // stroke(0);
        // strokeWeight(0.5);

        //form the slugs body, try to hardcode this less so that we can do animations as it moves.
        //I would like to have the offsets calculated off a sin function then mapped to the max offset value
        //so I can make it look like it is crawling
        fill(250, 234, 167);
        ellipse(0,-this.r/2,this.r, this.r);
        ellipse(0,this.r/2,this.r, this.r);
        let secondOffset = this.r/2 + this.r;
        ellipse(0,-secondOffset-2,this.r2, this.r2);
        ellipse(0,secondOffset,this.r2, this.r2);
        let thirdOffset = secondOffset + this.r-3;
        ellipse(0,thirdOffset,this.r-5, this.r-5);
        fill(102, 61, 36);
        ellipse(0,-thirdOffset-2,this.r-5, this.r-5);
        
        pop();
    }

    hit(damage){
        this.health = this.health - damage;

        //kill creature if health is less than zero
        if(this.health <= 0){
            this.kill();
        }
    }

    kill(){
        this.remove = true;
        this.createCrystals(this.crystalsDropped);
    }

    createCrystals(_num){
        let crystals = _num;
        for (var i = crystals; i > 0; i--) {
            if(crystals > 5){
                objects.push(new Crystal(this.x, this.y, this.r, 5));
                crystals -= crystals - 5;
            } else if(crystals >= 3){
                objects.push(new Crystal(this.x, this.y, this.r, 3));
                crystals -= crystals - 3;
            } else{
                objects.push(new Crystal(this.x, this.y, this.r, 1));
                crystals -= crystals - 1;
            }
        }
    }
}