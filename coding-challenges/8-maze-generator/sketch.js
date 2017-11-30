//Samuel Mosley
//Depth first search
//Recursive Backtracker
//https://en.wikipedia.org/wiki/Maze_generation_algorithm#Recursive_backtracker

var canvas;
var cells;
var cellSize;
var currentCell;
var visitedCells;
var trackerInterval;
var allVisited;
var agentLifetime;
var agents;
var recordLength = 0;
var end;

function setup(){
    canvas = createCanvas(500,500);
    background(40);

    cells = [];
    cellSize = 25;
    visitedCells = [];
    allVisited = false;

    for (var i = 0; i < width/cellSize; i++) {
        cells[i] = [];
        for (var j = 0; j < height/cellSize; j++) {
            cells[i].push(new Cell(i*cellSize, j*cellSize, cellSize, i, j));
        }
    }
    agentLifetime = cells.length * cells[0].length;
    currentCell = cells[0][0];
    currentCell.currentCell = true;
    
}

function draw(){
    background(40);
    
    for (var i = 0; i < cells.length; i++) {
        for (var j = 0; j < cells[i].length; j++) {
            cells[i][j].display();
        }
    }

    //Check through the agents
    if(agents){
        for (var i = 0; i < agents.population.length; i++) {
            agents.population[i].checkWall();
        }
    }

    //make a new generation
    if(agents){        
        let agentsLiving = agents.population.length;
        for (var i = 0; i < agents.population.length; i++) {
            if(agents.population[i].dead){
                agentsLiving--;
            }
        }
        if(agentsLiving == 0){
            agents.calcFitness();
            agents.selection();
            agents.reproduction();
        }
    }
}

function keyPressed(){
    if(key === ' '){
        if(!allVisited){
            trackerInterval = setInterval(stepCurrent, 50);
        } else{
            setup();
        }
    }
    if(key === 'B'){
        if(!allVisited){
            trackerInterval = setInterval(stepCurrent, 0);
        } else{
            setup();
        }
    }
    // if(key === 'T'){
    //     if(allVisited){
    //         agents = new Population(0.05, 25);
    //     }
    // }
}

function mousePressed(){
    if(!allVisited){
        currentCell.checkNeighbors();
    } else{
        setup();
    }
}

function stepCurrent(){
    currentCell.checkNeighbors();

    if(visitedCells.length == 0){
        clearInterval(trackerInterval);
        allVisited = true;
        currentCell.currentCell = false;
        //cut the right wall out of a random cell in the last column
        end = cells[cells.length-1][floor(random(cells[cells.length-1].length))];
        end.end = true; //just to color it differently
        console.log('ended');
    }


}