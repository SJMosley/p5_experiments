function Agent(_i,_j,_dna){
    this.i = _i;
    this.j = _j;
    this.count = 0;
    this.dna = _dna;
    this.path = [];
    this.solved = false;
    this.dead = false;
    this.deadEnd = true;
    this.fitness = 0;
    this.path.push(cells[this.i][this.j]);
    cells[this.i][this.j].hasAgent = true;
    
    this.move = function(_ni, _nj){
        cells[this.i][this.j].hasAgent = false;
        
        this.i += _ni;
        this.j += _nj;
        
        if(this.path.indexOf(cells[this.i][this.j]) < 0){
            this.path.push(cells[this.i][this.j]);
            cells[this.i][this.j].hasAgent = true;
            this.fitness = this.path.length;
        } else{
            this.dead = true;
            this.checkDeadEnd();
        }

        this.didSolve();
    }
    this.getFitness = function(){
        return this.fitness;
    }
    this.getDna = function(){
        return this.dna;
    }
    this.checkWall = function(){
        if(this.dead || this.solved) return null;
        //console.log(this.dna.genes[this.path.length-1]);
        switch(this.dna.genes[this.path.length-1]){
            case 0: if(!cells[this.i][this.j].walls[0]){//if wall is null
                this.move(-1,0);
            } else {
                this.dead = true;
                this.checkDeadEnd();
            }
            break;
            case 1: if(!cells[this.i][this.j].walls[1]){
                this.move(0,-1);
            } else {
                this.dead = true;
                this.checkDeadEnd();
            }
            break;
            case 2: if(!cells[this.i][this.j].walls[2]){
                this.move(1,0);
            } else {
                this.dead = true;
                this.checkDeadEnd();
            }
            break;
            case 3: if(!cells[this.i][this.j].walls[3]){
                this.move(0,1);
            } else {
                this.dead = true;
                this.checkDeadEnd();
            }
            break;
        }
    }
    this.checkDeadEnd = function(){
        let surroundingWalls = [];
        let openWalls = [];
        //check for walls
        for (var i = 0; i < 4; i++) {
            if(cells[this.i][this.j].walls[i]){ //wall is not null
                surroundingWalls.push(i);
            } else{
                openWalls.push(i)
            }
        }

        if(surroundingWalls.length == 3) this.deadEnd = true;
        
        let openCell = false;
        //check for open walls
        for (var i = 0; i < openWalls.length; i++) {
            //if open wall cells are in this.path then it is a dead end
            switch(openWalls[i]){
                case 0: openCell = openCell || (this.path.indexOf(cells[this.i-1][this.j]) < 0) //left
                case 1: openCell = openCell || (this.path.indexOf(cells[this.i]  [this.j-1]) < 0) //top
                case 2: openCell = openCell || (this.path.indexOf(cells[this.i+1][this.j]) < 0) //right
                case 3: openCell = openCell || (this.path.indexOf(cells[this.i]  [this.j+1]) < 0) //bottom
            }
        }
        if(!openCell){
            this.deadEnd = true;
        }
    }
    this.didSolve = function(){
        //if on the right wall and there is no right wall set win to true
        if(cells[this.i][this.j].end){
            this.solved = true;

            for (var i = 0; i < this.path.length; i++) {
                this.path[i].onPath = true;
            }
        }
    }

    this.calcFitness = function(){
        //put fitness into recordLength right before adding in distance figure.
        if(recordLength < this.fitness){
            recordLength = this.fitness;
        }
        if(this.solved) return pow(this.fitness, 3);
        if(this.deadEnd) return pow(this.fitness * 0.01, (1/2)); //super low
        if(this.dead){
            let distance = dist(this.i, this.j, end.gridPos.x, end.gridPos.y)
            let tempDist = map(distance, 0, distance, 0,this.fitness);
            return this.fitness + tempDist;
        } 

        //this will basically never happen
        return this.fitness * 3;
    }
}