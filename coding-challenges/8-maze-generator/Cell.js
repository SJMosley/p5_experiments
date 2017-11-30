function Cell(_x, _y, _r, _i, _j){
    this.position = createVector(_x, _y);
    this.r = _r;
    this.gridPos = createVector(_i, _j);
    this.chosenCell;

    //bunch of booleans for different colors
    this.visited = false;
    this.currentCell = false;
    this.onPath =false;
    this.hasAgent = false;
    this.end = false;

    this.walls = [
        new Wall(createVector(this.position.x, this.position.y), createVector(this.position.x, this.position.y +this.r)),
        new Wall(createVector(this.position.x, this.position.y), createVector(this.position.x +this.r, this.position.y)),
        new Wall(createVector(this.position.x + this.r, this.position.y), createVector(this.position.x +this.r, this.position.y +this.r)),
        new Wall(createVector(this.position.x, this.position.y +this.r), createVector(this.position.x +this.r, this.position.y +this.r))
    ]

    this.display = function(){
        //This is horrible :puke:
        if(this.end){
            fill(255, 253, 84);
        } else if(this.currentCell || this.hasAgent){
            fill(235, 100, 50);
        } else if(this.onPath){
            fill(50, 235, 100);
        } else if(this.visited){
            fill(50,100,235);
        }else{
            fill(0);
        }
        noStroke();
        rect(this.position.x, this.position.y, this.r, this.r);

        for (var i = 0; i < this.walls.length; i++) {
            if(this.walls[i]){
                this.walls[i].display(this.visited);
            }
        }
    }

    this.checkNeighbors = function(){
        let chooseCell = [];

        //Check the four neighbors (couldn't think of a good loop quick enough
        //only push non actual cells to chooseCell
        if(this.checkDir(-1,0)){
            chooseCell.push(this.checkDir(-1,0));
        }
        if(this.checkDir(0,-1)){
            chooseCell.push(this.checkDir(0,-1));
        }
        if(this.checkDir(1,0)){
            chooseCell.push(this.checkDir(1,0));
        }
        if(this.checkDir(0,1)){
            chooseCell.push(this.checkDir(0,1));
        }
        
        if(chooseCell.length == 0){
            this.currentCell = false;
            this.visited = true;
            currentCell = visitedCells.pop();
            currentCell.currentCell = true;
        } else{
            //Randomly pick from unvisited cells found
            this.chosenCell = chooseCell[floor(random(chooseCell.length))];
            
            this.visited = true;
            visitedCells.push(this);
            
            this.removeWall();
        }
    }

    this.removeWall = function(){
        let dirVec = createVector(this.chosenCell.gridPos.x - this.gridPos.x, this.chosenCell.gridPos.y - this.gridPos.y);
        if(dirVec.equals(createVector(-1,0))){
            this.walls[0] = null;
            this.chosenCell.walls[2] = null;
        }
        if(dirVec.equals(createVector(0,-1))){
            this.walls[1] = null;
            this.chosenCell.walls[3] = null;
        }
        if(dirVec.equals(createVector(1,0))){
            this.walls[2] = null;
            this.chosenCell.walls[0] = null;
        }
        if(dirVec.equals(createVector(0,1))){
            this.walls[3] = null;
            this.chosenCell.walls[1] = null;
        }

        this.setNewCell();
    }

    this.setNewCell = function(){
        this.currentCell = false;
        currentCell = this.chosenCell;
        currentCell.currentCell = true;
    }

    this.checkDir = function(_x,_y){
        if(this.gridPos.x + _x >= 0 && 
            this.gridPos.y + _y >= 0 &&
            this.gridPos.x + _x < cells.length && 
            this.gridPos.y + _y < cells[0].length
        ){ //make sure you don't jump off the grid
            if(!cells[this.gridPos.x + _x][this.gridPos.y + _y].visited){ //check visited
                return cells[this.gridPos.x + _x][this.gridPos.y + _y]
            }
        }

        return null;
    };

    
}

function Wall(_pos1, _pos2){
    this.pos1 = _pos1;
    this.pos2 = _pos2;

    this.display = function(){
        stroke(255);
        line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y);
    }
}