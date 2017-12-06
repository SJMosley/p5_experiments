let canvas;
let seed;
let tumble;
let finishZone;
let holes = [];
let holeSlider;
let safety = 0;
const safetyMax = 2000;
let gameState;

function setup(){
    if(windowWidth > 600){
        canvas = createCanvas(600,windowHeight*2/3);
    } else{
        canvas = createCanvas(windowWidth - 32,windowHeight*2/3);
    }
    canvas.parent(select('#gameCanvas'));
    createSpan('Max Holes to increase difficulty (Press space after changing): ').parent(select('#game'));
    holeSlider = createSlider(40,100, 40, 1);
    holeSlider.parent(select('#game'));
    background(80, 158, 63);
    
    translate(0, height*3);

    gameState = new gameActive();
    seed = new Seed();
    tumble = new Tumble();
    finishZone = new FinishZone();
    
    generateHoles();
}

function draw(){
    background(80, 164, 63);

    if (gameState.getState() > 0) {
        gameState.display();
    } else{
        gameState.checkExit();

        //check game keys
        checkHeldKeys();
    


        //move the display area up and down with the tumble control
        translate(0, -tumble.tumblePointUnderSeed.y + (height * 0.6));
    
        for (let i = 0; i < holes.length; i++) {
            holes[i].display();
        }
        //Render last so they draw over everything
        tumble.run();
        seed.run();
        finishZone.display();
    }
}

function checkHeldKeys(){
    if(keyIsDown(81) || keyIsDown(87) || keyIsDown(69)){
        //leftside tumble moves up
        tumble.leftPos.y--;
        // tumble.leftPos.y = constrain(tumble.leftPos.y,0,height); //keep it on the canvas for now. maybe constrain to a certain angle later
    }
    if(keyIsDown(65) || keyIsDown(83) || keyIsDown(68)){
        //leftside tumble moves down
        tumble.leftPos.y++;
        // tumble.leftPos.y = constrain(tumble.leftPos.y++,0,height);
    }
    if(keyIsDown(UP_ARROW)){
        //rightside tumble moves up
        tumble.rightPos.y--;
        // tumble.rightPos.y = constrain(tumble.rightPos.y--,0,height);
    }
    if(keyIsDown(DOWN_ARROW)){
        //rightside tumble moves down
        tumble.rightPos.y++;
        // tumble.rightPos.y = constrain(tumble.rightPos.y++,0,height);
    }
}

function generateHoles(){
    let holeSpacing = 8;
    let newX = random(width);
    let newY = random(50,(height*3)-(height/3));
    let newR = floor(random(20,36));

    holes.push(new Hole(newX, newY, newR));

    //we are going to loop through and check that holes aren't overlapping
    while(safety < safetyMax && holes.length < holeSlider.value()){
        holeSpacing = random(4, 24);
        newX = random(width);
        newY = random(50,(height*3)-(height/3));
        newR = floor(random(20,36));
        
        let overlap = false;//assume it doesn't overlap
        for (var i = 0; i < holes.length; i++) {
            let tempDist = dist(holes[i].x, holes[i].y, newX, newY);
            let radiiWithSpacing = holes[i].r + newR + holeSpacing;
            if(tempDist < radiiWithSpacing){
                overlap = true;
            }
        }
        
        if(!overlap){
            //generate hole
            holes.push(new Hole(newX, newY, newR));
        }
        safety++;
    }
}

function keyPressed(){
    if(key === ' '){
        resetGame();
    }
}
function mousePressed(){
    // seed.velocity = createVector(0,0);
    // tumble.leftPos.y = mouseY;
    // tumble.rightPos.y = mouseY;
}

function gameActive(){
    
    this.change = function(){

    }

    this.checkExit = function(){
        if(
            finishZone.x < seed.position.x &&
            finishZone.y < seed.position.y &&
            seed.position.x < finishZone.x + finishZone.w &&
            seed.position.y < finishZone.y + finishZone.h
        ){
            gameState = new gameWon();
        }


        if(seed.opacity == 0){
            gameState = new gameLost();
        }

    }

    this.getState = function(){
        return 0;
    }

    this.display = function(){

    }
}

function gameWon(){
    this.getState = function(){
        return 1;
    }

    this.display = function(){
        background(0);
        resetMatrix();

        textSize(100);
        textAlign(CENTER);
        text("You Win!", width/2, height/2);

    };
}

function gameLost(){
    this.getState = function(){
        return 2;
    }

    this.display = function(){
        background(0);
        resetMatrix();

        textSize(100);
        textAlign(CENTER);
        text("You Lose :(", width/2, height/2);
    };
}

function resetGame(){
    translate(0, height*3);
    if(windowWidth > 600){
        canvas = createCanvas(600,windowHeight*2/3);
    } else{
        canvas = createCanvas(windowWidth - 32,windowHeight*2/3);
    }
    canvas.parent(select('#gameCanvas'));
    seed = new Seed();
    tumble = new Tumble();
    finishZone = new FinishZone();
    gameState = new gameActive();
    holes = [];//reset holes

    generateHoles();
}