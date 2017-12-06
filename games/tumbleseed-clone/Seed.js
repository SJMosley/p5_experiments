const seedTypes = [
    'flag', //0
    'thorn', //1
    'crystal', //2
    'heart' //3
];
function Seed(){
    this.position = createVector(width/2, (height*2)+height/2);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.r = 12;
    this.angle = 0;
    this.maxSpeed = 3;
    this.opacity = 255;
    this.falling = false;
    this.fallPosition = createVector(0,0);
    this.fallenHole;
    this.inAir = true;
    this.seedType = 1;

    //Thorn Type Stats
    this.thorns = [];

    //Crystal Type Stats
    this.crystals = 2;
    this.crystalPieces = 0;
    this.piecesToEarnCrystal = 3;

    //Heart Type Stats
    this.hearts = 3;
    this.heartPieces = 0;
    this.piecesToEarnHeart = 4;


    this.run = function(){
        if(this.falling){
            this.fall();
        }else{
            this.update();
            this.checkHoles();
            this.checkItemSquares();
        }
        this.display();
    }
    this.applyForce = function(f){
        this.acceleration.add(f);
    }

    this.checkHoles = function(){
        if(!this.inAir){
            for (var i = 0; i < holes.length; i++) {
                if(dist(this.position.x, this.position.y, holes[i].x, holes[i].y) < holes[i].r){
                    this.fallPosition = this.position;
                    this.fallenHole = holes[i];
                    this.falling = true;
                }
            }
        }
    }
    this.checkItemSquares = function(){
        if(!this.inAir){
            for (var i = 0; i < itemSquares.length; i++) {
                if(dist(this.position.x, this.position.y, itemSquares[i].x, itemSquares[i].y) < itemSquares[i].r){
                    if(!itemSquares[i].isCollected() && this.crystals >= 1){ //if not collected then give bonus
                        switch(this.seedType){
                            //flag
                            case 0:
                            break;
                            //thorn
                            case 1: 
                            this.thorns.push(new Thorn());
                            break;
                            //crystal
                            case 2:
                            this.crystalPieces++;
                            if(this.crystalPieces == this.piecesToEarnCrystal){
                                itemSquares[i].createCrystals();
                            }
                            break;
                            //heart
                            case 3:
                            break;
                            default:
                            break;
                        }
                        itemSquares[i].setCollected();
                        this.crystals--; //subtract future crystal requirement
                    }


                }
            }
        }
    }

    this.checkObjects = function(){

    }

    this.fall = function(){
        //move Seed closer to the hole center after it hits the fall position.
        let fallVector = p5.Vector.sub(createVector(this.fallenHole.x, this.fallenHole.y), this.fallPosition);
        fallVector.mult(0.1);

        this.fallPosition.add(fallVector);
        this.position = this.fallPosition;
        this.opacity = this.opacity - 3;

    }
    this.update = function(){
        if(this.inAir){
            this.velocity.setMag(0.3);
        } else{
            this.velocity.add(this.acceleration);
            this.velocity.limit(this.maxSpeed);
        }
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        if(this.position.x < this.r){
            this.position.x = this.r;
            this.velocity = createVector(0,0);
        } 
        if(this.position.x > width - this.r){
            this.position.x = width - this.r;
            this.velocity = createVector(0,0);
        } 
    }
    this.display = function(){
        //Just a switch for fill color
        switch(this.seedType){
            //flag
            case 0:
            fill(224, 107, 115, this.opacity);
            break;
            //thorn
            case 1: 
            fill(160,160,160, this.opacity);
            break;
            //crystal
            case 2:
            fill(226, 230, 233, this.opacity);
            break;
            //heart
            case 3:
            fill(189, 57, 41, this.opacity);
            break;
            default:
            break;
        }
        noStroke();
        push();
        translate(this.position.x, this.position.y);

        this.displaySeed();

        this.displayThorns();

        this.displayStats();

        pop();
    }
    this.changeSeedType = function(){ //very basic circular switching instead of a full menu
        this.seedType++;
        if(this.seedType > 3){
            this.seedType = 0;
        }
    }
    this.displaySeed = function(){
        if(!this.inAir){
            angleMode(DEGREES);
            let rotationSpeed = map(this.velocity.x, -3, 3, -4, 4);
            if(this.velocity.x < 0){ //moving left
                this.angle = this.angle + rotationSpeed;
            } else if(this.velocity.x > 0){ //moving right
                this.angle = this.angle + rotationSpeed;
            }
            rotate(this.angle);
            angleMode(RADIANS);
        }

        ellipseMode(RADIUS);
        ellipse(0,0, this.r, this.r);
        fill(0);
        rectMode(CENTER);
        rect(0,0,4,20);
        
    }

    this.displayThorns = function(){
        //Change angle so that it updates based on the number of thorns.
        //this needs to be changed so that each thron save it's own angle, that way
        //if I lose one the others will stay in place until I gain another. like the real game
        for (var i = 0; i < this.thorns.length; i++) {
            rotate(2 * PI/this.thorns.length);
            fill(102, 61, 36);
            rect(22, 0, 12, 4);
            fill(160,160,160);
            triangle(28, -6, 28, 6, 36, 0);
        }
    }

    this.displayStats = function(){
        push();
        resetMatrix();
        fill(179, 112, 218);
        rectMode(CORNER);
        rect(10,height-40, 100, 30);
        fill(0);
        text('Crystals: ' + this.crystals, 20, height-20);
        pop();
    }

}