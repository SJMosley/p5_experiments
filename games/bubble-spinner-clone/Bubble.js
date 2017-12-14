
class Bubble{
    constructor(){
        let colors = ['red', 'dark-blue', 'green', 'pink', 'light-blue', 'yellow'];
        //for now random color
        this.color = colors[floor(random(colors.length))];
        this.r = 12;
        this.pos = createVector(width/2, this.r*3);
        this.vel = createVector(0,0);
        this.setColor(this.color);
        this.attached = false;

    }
    setColor(col){
        switch(col){
            case 'red':
            this.setRGB(189, 57, 41);
            break;
            case 'dark-blue':
            this.setRGB(0, 99, 191);
            break;
            case 'light-blue':
            this.setRGB(97, 175, 239);
            break;
            case 'green':
            this.setRGB(47, 106, 22);
            break;
            case 'pink':
            this.setRGB(224, 107, 115);
            break;
            case 'yellow':
            this.setRGB(233, 213, 74);
            break;
        }
    }
    setRGB(_r,_g,_b){
        this.red = _r;
        this.green = _g;
        this.blue = _b;
    }

    shoot(vec){
        this.vel = vec.setMag(10);
    }

    //look for collision with attached bubbles
    checkCollision(spin){
        if((spin == null) || this.attached) return;

        
        for (let i = 0; i < spin.attachedBubbles.length; i++) {
            let newPos = spin.attachedBubbles[i].pos.rotate(spin.rotation);
            let dis = dist(
                newPos.x + width/2
                , newPos.y + height/2
                , this.pos.x
                , this.pos.y
            )

            //if the distance is less than and the other bubble is attached
            if(spin.attachedBubbles[i].attached && dis < (this.r*2.5)){
                this.collide(spin);
            }
        }
        if(dist(spin.pos.x, spin.pos.y, this.pos.x, this.pos.y) < (this.r*2.5)){
            this.collide(spin);
        }
    }

    collide(spin){
        if(this.attached) return;
        this.attached = true;
        
        //applyTorque to spinner
        spin.applyTorque(this.vel, this.pos, this.color);
        //move position to accurate gridpos
        spin.moveToGrid(this);
        
        //drop velocity to zero after passing it in
        this.vel.mult(0);
    }

    run(spin){
        this.update();
        this.bounce();
        this.checkCollision(spin);
        this.display();
    }

    update(){
        this.pos.add(this.vel);
    }

    display(){
        noStroke();
        fill(this.red, this.green, this.blue);
        ellipse(this.pos.x, this.pos.y, this.r);
        
        fill(255,255,255,180);
        ellipse(this.pos.x - this.r/3, this.pos.y, this.r/3);
    }

    bounce(){
        if((this.pos.x > width - this.r) || (this.pos.x < this.r)) this.vel = createVector(-this.vel.x, this.vel.y);
        if((this.pos.y > height - this.r) || (this.pos.y < this.r)) this.vel = createVector(this.vel.x, -this.vel.y);
    }
}