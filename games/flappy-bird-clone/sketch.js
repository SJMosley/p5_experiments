let canvas;
let bird;
let pipes;
let score;

function setup(){
    canvas = createCanvas(400,600);
    
    resetGame();
}

function draw(){
    background(40);

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].run();
      if(pipes[i].offscreen()){
          pipes.splice(i,1);
      }

      if(pipes[i].hit(bird)){
          setTimeout(resetGame, 3000);
          noLoop();
      }

      if(pipes[i].x + pipes[i].width < bird.x && !pipes[i].scored){
          score += 1;
          pipes[i].scored = true;
      }
    }

    bird.run();

    if(frameCount % 100 == 0){
        newPipe();
    }

}

function keyPressed(){
    if(key == ' '){
        bird.up();
    }
}

function newPipe(){
    pipes.push(new Pipe());
}

function resetGame(){
    pipes = [];
    bird = new Bird();
    score = 0;
    loop();
    
    //call first pipe and start recurring calls
    newPipe();
    background(40);
}