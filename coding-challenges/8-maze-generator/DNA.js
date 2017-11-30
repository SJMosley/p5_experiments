function DNA(newgenes){
    //0 is left
    //1 is top
    //2 is right
    //3 is bottom
    this.direction = [0,1,2,3]
    
    if(arguments.length > 0){
        this.genes = newgenes;
    } else{
        //the gene array
        this.genes = [];
        //fill it with random vectors
        for (var i = 0; i < agentLifetime; i++) {
            var ind = floor(random(this.direction.length));
            this.genes[i] = this.direction[ind];
        }
    }
    
    this.crossover = function(partner){
        var child = [];
        var midpoint = floor(random(this.genes.length));

        for (var i = 0; i < this.genes.length; i++) {
            if(i%2 == 0){
                child[i] = this.genes[i];
            } else{
                child[i] = partner.genes[i];
            }
        }
        var newgenes = new DNA(child);
        return newgenes;
    }

    this.mutate = function(mutationRate){
        for (var i = 0; i < recordLength; i++) { //only mutate genes up to the last one
            if(i == recordLength-1){ //ignore mutation rate. only mutate the last one
                let lastGenes = this.genes[i];
                do{
                    var ind = floor(random(this.direction.length));
                    this.genes[i] = this.direction[ind];
                }while(lastGenes == this.genes[i])
            }
        }
    }
}