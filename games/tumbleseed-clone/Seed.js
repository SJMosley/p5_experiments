const seedTypes = [
    'flag', //0
    'thorn', //1
    'crystal', //2
    'heart' //3
];
const neededCrystals = [
    1,
    1,
    0,
    1
]
function Seed(){
    this.position = createVector(width/2, (height*2)+height/2);
    this.acceleration = createVector(0,0);
    this.velocity = createVector(0,0);
    this.r = 14;
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
    this.crystalPieces = 2; //debug value is 2
    this.piecesToEarnCrystal = 3;

    //Heart Type Stats
    this.hearts = 3;
    this.heartPieces = 3; //debug value is 3
    this.piecesToEarnHeart = 4;


    this.run = function(){
        if(this.falling){
            this.fall();
        }else{
            this.update();
            if(!this.inAir){
                this.checkHoles();
                this.checkItemSquares();
                this.checkObjects();
            }
        }
        this.display();
    }
    this.applyForce = function(f){
        this.acceleration.add(f);
    }

    this.checkHoles = function(){
        for (var i = 0; i < holes.length; i++) {
            if(dist(this.position.x, this.position.y, holes[i].x, holes[i].y) < holes[i].r){
                this.fallPosition = this.position;
                this.fallenHole = holes[i];
                this.falling = true;
                this.thorns = [];
            }
        }
    }
    this.checkItemSquares = function(){
        for (var i = 0; i < itemSquares.length; i++) {
            if(dist(this.position.x, this.position.y, itemSquares[i].x, itemSquares[i].y) < itemSquares[i].r){
                if(!itemSquares[i].isCollected() && this.crystals >= neededCrystals[this.seedType]){ //if not collected then give bonus
                    switch(this.seedType){
                        //flag
                        case 0:
                        break;
                        //thorn
                        case 1: 
                        this.thorns.push(new Thorn(this.thorns.length));
                        itemSquares[i].setCollected();
                        break;
                        //crystal
                        case 2:
                        this.crystalPieces++;
                        if(this.crystalPieces == this.piecesToEarnCrystal){
                            itemSquares[i].createCrystals();
                            this.crystalPieces = 0;
                        }
                        itemSquares[i].setCollected();
                        break;
                        //heart
                        case 3:
                        break;
                        default:
                        break;
                    }
                    this.crystals = this.crystals - neededCrystals[this.seedType]; //subtract future crystal requirement
                }


            }
        }
    }

    this.checkObjects = function(){
        for (let i = 0; i < objects.length; i++) {
            if(dist(this.position.x, this.position.y, objects[i].x, objects[i].y) < (this.r+objects[i].r/2)){
                if(objects[i].canCollect()){
                    seed.collectObject(objects[i]);
                }
            }
        }
        for (let i=objects.length-1; i>=0; i--){
            if(objects[i].remove){
                objects.splice(i,1);
            }
        }
    }

    this.collectObject = function(obj){
        
        switch(obj.getObjName()){
            case 'crystal':
            this.crystals = this.crystals + obj.getValue();
            break;
            default:
            break;
        }

        obj.remove = true;
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

        for (var i = 0; i < this.thorns.length; i++) {
            this.thorns[i].update();
        }
    }
    this.display = function(){
        noStroke();
        push();
        translate(this.position.x, this.position.y);

        //determine fill color and displayType, fill color will move into each display function
        //as they are implemented
        switch(this.seedType){
            //flag
            case 0:
            fill(224, 107, 115, this.opacity);
            this.displaySeed();
            break;
            //thorns
            case 1: 
            fill(160,160,160, this.opacity);
            this.displaySeed();
            break;
            //crystal
            case 2:
            this.displayCrystalSeed();
            break;
            //heart
            case 3:
            fill(189, 57, 41, this.opacity);
            this.displaySeed();
            break;
            default:
            break;
        }

        this.displayThorns();

        this.displayStats();

        pop();
    }
    this.changeSeedType = function(_st){ //very basic circular switching instead of a full menu
        console.log(!_st);
        if(!_st){
            this.seedType++;
            if(this.seedType > 3){
                this.seedType = 0;
            }
        }else{
            this.seedType = _st;
            
        }
    }
    this.displaySeed = function(){
        this.calculateRotation();

        ellipseMode(RADIUS);
        ellipse(0,0, this.r, this.r);
        fill(0);

        this.displayEye();
        
    }
    this.displayCrystalSeed = function(){
        this.calculateRotation();
        
        stroke(226, 230, 233, this.opacity);
        strokeWeight(3);
        noFill();
        beginShape();
        for (var i = 0; i < 7; i++) {
            let x = cos(i*(TWO_PI/7)) * this.r;
            let y = sin(i*(TWO_PI/7)) * this.r;
            vertex(x,y);
        }
        endShape(CLOSE);
        // ellipseMode(RADIUS);
        fill(216, 255, 255, this.opacity);
        noStroke();
        if(this.crystalPieces != 0){
            arc(0,0, this.r, this.r, 0, TWO_PI*(this.crystalPieces/this.piecesToEarnCrystal));
        }
        fill(0);
        

        this.displayEye();
        
    }
    this.displayEye = function(){
        fill(255, 255, 255,this.opacity);
        ellipse(0,0,9,6);
        fill(94, 42, 85,this.opacity);
        ellipse(0,0,4,4);
    }

    this.calculateRotation = function(){
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
    }
    
    this.displayThorns = function(){
        //Change angle so that it updates based on the number of thorns.
        //this needs to be changed so that each thron save it's own angle, that way
        //if I lose one the others will stay in place until I gain another. like the real game
        for (var i = 0; i < this.thorns.length; i++) {
            //this.thorns[i].display();
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
        noStroke();
        rectMode(CORNER);
        rect(10,height-40, 100, 30);
        textSize(16);
        textAlign(CENTER,CENTER);
        fill(0);
        text('Crystals: ' + this.crystals, 10,height-40, 100, 30);
        pop();
    }

}