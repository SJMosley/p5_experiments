var canvas;
let house;
let char;
let zombies = [];
let newZombieInterval;
let timer = 3000;
let timerSet = 3000;
let gameState;

function setup(){
    canvas = createCanvas(500,500);
    background(40);
    gameState = new gameActive();
    house = new House();
    char = new Character();
}

function draw(){
    if(gameState.getState() > 0){
        gameState.display();
    } else{
        background(80, 164, 63);
        checkKeys();
        house.draw();
        char.run();
        for (let i = 0; i < zombies.length; i++) {
            zombies[i].run();
        }
        
        for (let i = zombies.length - 1; i >= 0; i--) {
            if(zombies[i].remove){
                zombies.splice(i, 1);
            }
        }
        
        if(timer < 0){
            timer = timerSet;
            timerSet -= 30;
            if(timerSet < 500){
                timerSet = 500;
            }
            addZombie();
        } else{
            timer -= 100/6;
        }
        
        gameState.display();
        gameState.checkExit();
    }
}

function checkKeys(){
    if(keyIsDown(UP_ARROW)){
        char.vel.y = -3;
    }
    if(keyIsDown(DOWN_ARROW)){
        char.vel.y = 3;
    }
    if(keyIsDown(LEFT_ARROW)){
        char.vel.x = -3;
    }
    if(keyIsDown(RIGHT_ARROW)){
        char.vel.x = 3;
    }
    if(!keyIsPressed){
        char.vel.x = 0;
        char.vel.y = 0;
    }
}

function addZombie(){
    if(zombies.length < 15){
        let side = floor(random(4));
        let x,y;

        switch(side){
            case 0:
            x = 0
            y = random(height);
            break;
            case 1:
            x = random(width);
            y = 0;
            break;
            case 2:
            x = width
            y = random(height);
            break;
            case 3:
            x = random(width)
            y = height;
            break;
            default:
            break;
        }


        zombies.push(new Zombie(x, y));
    }
}

function keyPressed(){
    if(key == ' '){
        zombies.push(new Zombie(width, height));
    }
}

function mouseDragged(){
    //zombies.push(new Zombie(mouseX, mouseY));
}

function gameActive(){
    
    this.change = function(){

    }

    this.checkExit = function(){
        if(char.health <= 0){
            gameState = new gameLost();
        }

    }

    this.getState = function(){
        return 0;
    }

    this.display = function(){
        fill(255)
        stroke(255);
        textSize(20);
        textFont('Helvetica');
        text('Score: ' + char.score, width*6/8, 24);
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
    background(40);
    gameState = new gameActive();
    house = new House();
    char = new Character();
}