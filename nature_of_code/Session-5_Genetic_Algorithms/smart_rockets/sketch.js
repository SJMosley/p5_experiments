var lifetime; //how long rockets should live
var population; //population of rockets
var lifeCounter; //timer for cycle of generation
var target; //target obstacle
var info; 
var recordTime; //fastestTime to target
var obstacles; //array list of obstacles

function setup(){
    createCanvas(640, 360);

    lifetime = height;
    lifeCounter = 0;

    target = new Obstacle(width/2-12,24,24,24);

    var mutationRate = 0.01;
    population = new Population(mutationRate, 50);

    info = createP("");
    info.position(10,380);

    recordTime = lifeCounter;

    obstacles = [];
    obstacles.push(new Obstacle(width/2-100, height/2,200, 10));
}
function draw(){
    background(101);

    target.display();

    if(lifeCounter < lifetime){
        population.live(obstacles);
        if(population.targetReached() && (lifeCounter < recordTime)){
            recordTime = lifeCounter;
        }
        lifeCounter++;
    }else{
        lifeCounter = 0;
        population.calcFitness();
        population.selection();
        population.reproduction();
    }

    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].display();
    }

    info.html("Generation #: " + population.getGenerations() + "<br>" + "Cycles left: " + (lifetime-lifeCounter));
}

// Move the target if the mouse is pressed
// System will adapt to new target
function mousePressed() {
    target.position.x = mouseX;
    target.position.y = mouseY;
}

