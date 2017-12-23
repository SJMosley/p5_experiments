class Character{
    constructor(){
        this.health = 10;
        this.pos = createVector(200, 310);
        this.vel = createVector(0,0);
        this.cloakTimer = 0;
        this.cloakActive = false;
    }

    run(){
        this.update();
        this.draw();
    }

    update(){
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;

        if(this.pos.x < 275 && this.pos.x > 225 && this.pos.y > 400 && this.pos.y < 500){
            this.activateCloaking();
        }
        if(this.cloakActive){
            this.cloaking();
        }
        this.bounds();
    }

    draw(){
        this.drawHealth();

        this.drawSelf();
    }

    drawSelf(){
        push();
        strokeWeight(1);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading() + PI/2);
        if(this.cloakActive){
            fill(235, 235, 235);
        } else{
            fill(250, 234, 167);
        }
        beginShape();
        vertex(10, 20);
        vertex(0,-20);
        vertex(-10, 20);
        endShape(CLOSE);
        strokeWeight(3);
        stroke(94, 42, 85);
        point(0,0);
        pop();
    }

    drawHealth(){
        fill(189, 57, 41);
        let yPos = 20;
        let xPos = 20;
        let xOffset = 20;
        for (let i = 0; i < this.health; i++) {
            ellipse(xPos + (xOffset * i), yPos, 10,10);
        }
    }

    bounds(){
        if(this.pos.x > width) this.pos.x = 0;
        if(this.pos.x < 0) this.pos.x = width;
        if(this.pos.y > height) this.pos.y = 0;
        if(this.pos.y < 0) this.pos.y = height;
    }

    activateCloaking(){
        let cloakLength = 60 * 5;
        this.cloakActive = true;
        this.cloakTimer = cloakLength;
    }

    cloaking(){
        if(!this.cloakActive) return;

        if(this.cloakTimer > 0){
            this.cloakTimer -= 1;
        } else{
            this.cloakActive = false;
            this.cloakTimer = 0;
        }
    }
}