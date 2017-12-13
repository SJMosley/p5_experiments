//The bar that moves the sides
class Tumble{
    constructor(){
        this.leftPos = createVector(0,(height*2)+height*3/4);
        this.rightPos = createVector(width, (height*2)+height*3/4);
        this.length = width - 20;
        this.height = 10;
        this.movementVector = createVector(0,0);
        this.tumblePointUnderSeed = createVector(seed.position.x, this.leftPos.y);
    }

    run(){
        this.update();
        this.display();
    }
    update(){
        this.touchingSeed();
    }
    display(){
        //Should probably switch this to a rect. but then I have to deal with rotation so I will skip it for now.
        stroke(0);
        strokeWeight(8);
        line(this.leftPos.x, this.leftPos.y, this.rightPos.x, this.rightPos.y);

        //Display the vector movement underneath
        if(!seed.falling){
            push();
            fill(97, 175, 239);
            noStroke();
            translate(this.tumblePointUnderSeed.x, this.tumblePointUnderSeed.y);
            rotate(this.movementVector.heading());
            rectMode(CENTER);
            rect(0,0,20,6);
            fill(224, 107, 115)
            ellipse(this.movementVector.setMag(0.4),2,2);
            pop();
        }
    }
    touchingSeed(){
        if(seed.falling){
            return false;
        }
        let target;
        if(this.leftPos.y > this.rightPos.y){
            target = 'left';
        } else if(this.leftPos.y < this.rightPos.y){
            target = 'right';
        } else{
            target = 'even';
        }
        
        //if it is perfectly balanced
        if(target === 'even'){
            this.movementVector = createVector(0,0);
            this.tumblePointUnderSeed = createVector(seed.position.x, this.leftPos.y);

            if(seed.position.y + seed.r +  (this.height/2) + 2> this.tumblePointUnderSeed.y){
                seed.inAir = false;
                seed.position.y = this.tumblePointUnderSeed.y - seed.r - (this.height/2);
            } else{
                seed.inAir = true;
                seed.velocity = (createVector(0,1).setMag(0.1));
            }
        } else if(target === 'left'){ 
            //I definitely feel like I could rewrite the right and left sections to be cleaner, 
            //progress march on! 🙃
            
            //get the vector of the two points
            this.movementVector = p5.Vector.sub(this.leftPos, this.rightPos);
            
            this.movementVector.mult(seed.position.x/width);
            this.tumblePointUnderSeed = createVector(seed.position.x, this.leftPos.y-this.movementVector.y);

            // console.log('movement Vector after multiple: '+ movementVector);
            if(seed.position.y + seed.r +  (this.height/2) +  2 > this.tumblePointUnderSeed.y){
                seed.inAir = false;
                seed.applyForce(this.movementVector.setMag(0.006));
                seed.position.y = this.tumblePointUnderSeed.y - seed.r - (this.height/2);
            } else{
                seed.inAir = true;
                seed.applyForce(this.movementVector.setMag(0.006));
                seed.velocity = (createVector(0,1).setMag(0.1));
            }
        } else if(target === 'right'){
            //get the vector of the two points
            this.movementVector = p5.Vector.sub(this.rightPos, this.leftPos);
            //shorten the vector
            this.movementVector.mult(1-(seed.position.x/width));
            //get the point right under the seed
            this.tumblePointUnderSeed = createVector(seed.position.x, this.rightPos.y-this.movementVector.y);
            
            //if the point is right under the seed move the seed up.
            if(seed.position.y + seed.r +  (this.height/2) + 2> this.tumblePointUnderSeed.y){
                seed.inAir = false;
                seed.applyForce(this.movementVector.setMag(0.006));
                seed.position.y = this.tumblePointUnderSeed.y - seed.r - (this.height/2);
            } else{
                seed.inAir = true;
                seed.applyForce(this.movementVector.setMag(0.006));
                seed.velocity = (createVector(0,1).setMag(0.1));
            }
        }


    }

}

function textComments(_mv, _tpud){
    fill(0);
    text('tumblePointUnderSeed: ' + floor(_tpud.x) + ',' + floor(_tpud.y), width/2 -40, height - 40);
    text('movement vector: ' + floor(_mv.x) + ',' + floor(_mv.y), width/2 -40, height - 30);
    text('seedPos: ' + floor(seed.position.x) + ',' + floor(seed.position.y), width/2 -40, height - 20);
    text('seed velocity: ' + seed.velocity.x + ' , ' + seed.velocity.y, width/2 -40, height - 10);
    text('mousePos: '+ mouseX + ' , ' + mouseY, width/2 -40, height - 50);
    fill(179, 112, 218);
    //ellipse(_tpud.x, _tpud.y, 8,8);
    fill(255, 181, 67);
    //ellipse(constrain(_mv.x,0,width), constrain(_mv.y,0,height), 8,8);
}