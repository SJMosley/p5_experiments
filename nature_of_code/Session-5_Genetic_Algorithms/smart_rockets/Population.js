function Population(m, num){
    this.mutationRate = m;
    this.population = [];
    this.matingPool = [];
    this.generations = 0;
    this.popmax = num;
    
    this.best = "";

    for(var i=0;i<this.popmax;i++){
        var location = createVector(width/2, height-20);
        this.population[i] =new Rocket(location, new DNA());
    }

    this.live = function(obs){
        for (var i = 0; i < this.population.length; i++) {
            this.population[i].checkTarget();       
            this.population[i].run(obs);
        }
    }

    this.calcFitness = function(){
        for (var i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness();       
        }
    }

    this.targetReached = function(){
        for (var i = 0; i < this.population.length; i++) {
            if(this.population[i].hitTarget) return true;
        }
        return false; //nothing hit the target
    }

    this.selection = function(){
        this.matingPool = [];

        //calculate the top value to map to
        var maxFitness = this.getMaxFitness();
        //build mating pool
        for (var i = 0; i < this.population.length; i++) {
            var fitnessNormal = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            var n = floor(fitnessNormal * 100);

            for (var j = 0; j < n; j++) {

                this.matingPool.push(this.population[i]);
            }
        }
    }
    
    this.reproduction = function(){
        for (var i = 0; i < this.population.length; i++) {
            //get two random indeces to pick parents
            var a = floor(random(this.matingPool.length));
            var b = floor(random(this.matingPool.length));
            //pick parents
            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];

            var partnerAgenes = partnerA.getDna();
            var partnerBgenes = partnerB.getDna();

            var child = partnerAgenes.crossover(partnerBgenes);
            child.mutate(this.mutationRate);

            var location = createVector(width/2, height-20);
            this.population[i] = new Rocket(location, child);
        }
        this.generations++;
    }

    this.getGenerations = function(){
        return this.generations;
    }

    //get highest fitness
    this.getMaxFitness = function(){
        var record = 0;
        for (var i = 0; i < this.population.length; i++) {
            if(this.population[i].getFitness()> record){
                record = this.population[i].getFitness();
            }
        }

        return record;
    }

    this.getAverageFitness = function(){
        var total = 0;
        for (var i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }

        return total/(this.population.length);
    }
}