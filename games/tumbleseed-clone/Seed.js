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
class Seed{
    constructor(){
        this.seedType = 1;
        //position related variables
        this.position = createVector(width/2, (height*2)+height/2);
        this.acceleration = createVector(0,0);
        this.velocity = createVector(0,0);
        this.r = 14;

        //rotation related variables
        this.angle = 0;
        this.maxSpeed = 3;
        
        //falling related
        this.falling = false;
        this.fallenHole;
        this.fallPosition = createVector(0,0);
        this.opacity = 255;
        this.inAir = true;

        //Thorn Type variables
        this.thorns = [];
        //Crystal Type variables
        this.crystals = 2;
        this.crystalPieces = 2; //debug value is 2
        this.piecesToEarnCrystal = 3;

        //Heart Type variables
        this.hearts = 3;
        this.heartPieces = 3; //debug value is 3
        this.piecesToEarnHeart = 4;
    }

    run(holeArr,isArr,objArr){
        if(this.falling){
            this.fall();
        }else{
            this.update();
            if(!this.inAir){
                this.checkHoles(holeArr);
                this.checkItemSquares(isArr);
                this.checkObjects(objArr);
            }
        }
        this.display();
    }
    
    applyForce(f){
        this.acceleration.add(f);
    }

    checkHoles(holeArr){
        for (var i = 0; i < holeArr.length; i++) {
            if(dist(this.position.x, this.position.y, holeArr[i].x, holeArr[i].y) < holeArr[i].r){
                this.fallPosition = this.position;
                this.fallenHole = holeArr[i];
                this.falling = true;
                this.thorns = [];
            }
        }
    }

    checkItemSquares(isArr){
        for (var i = 0; i < itemSquares.length; i++) {
            //check distance from item square
            if(dist(this.position.x, this.position.y, isArr[i].x, isArr[i].y) < isArr[i].r){
                //if itemsquare hasn't been used and 
                if(!isArr[i].isCollected() && this.crystals >= neededCrystals[this.seedType]){ //if not collected then give bonus
                    switch(this.seedType){
                        //flag
                        case 0:
                        break;
                        //thorn
                        case 1: 
                        this.thorns.push(new Thorn(this.thorns.length));
                        for (let i = 0; i < this.thorns.length; i++) {
                            this.thorns[i].updateAngle(i, this.thorns.length);
                        }
                        isArr[i].setCollected();
                        break;
                        //crystal
                        case 2:
                        this.crystalPieces++;
                        if(this.crystalPieces == this.piecesToEarnCrystal){
                            isArr[i].createCrystals();
                            this.crystalPieces = 0;
                        }
                        isArr[i].setCollected();
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

    checkObjects(objArr){
        for (let i = 0; i < objArr.length; i++) {
            if(dist(this.position.x, this.position.y, objArr[i].x, objArr[i].y) < (this.r+objArr[i].r/2)){
                if(objArr[i].canCollect()){
                    seed.collectObject(objArr[i]);
                }
            }
        }
        for (let i=objArr.length-1; i>=0; i--){
            if(objArr[i].remove){
                objArr.splice(i,1);
            }
        }
    }

    collectObject(obj){
        switch(obj.getObjName()){
            case 'crystal':
            this.crystals = this.crystals + obj.getValue();
            break;
            default:
            break;
        }

        obj.remove = true;
    }

    fall(){
        //move Seed closer to the hole center after it hits the fall position.
        let fallVector = p5.Vector.sub(createVector(this.fallenHole.x, this.fallenHole.y), this.fallPosition);
        fallVector.mult(0.1);

        this.fallPosition.add(fallVector);
        this.position = this.fallPosition;
        this.opacity = this.opacity - 3;
    }

    changeSeedType(_st){
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

    update(){
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
            this.thorns[i].update(enemies);
        }
    }

    display(){
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

    displaySeed(){
        this.calculateRotation();
        
        ellipseMode(RADIUS);
        ellipse(0,0, this.r, this.r);
        fill(0);

        this.displayEye();
    }

    displayCrystalSeed(){
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

    displayEye(){
        fill(255, 255, 255,this.opacity);
        ellipse(0,0,9,6);
        fill(94, 42, 85,this.opacity);
        ellipse(0,0,4,4);
    }

    calculateRotation(){
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

    displayThorns(){
        for (var i = 0; i < this.thorns.length; i++) {
            this.thorns[i].display();
        }
    }

    displayStats(){
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