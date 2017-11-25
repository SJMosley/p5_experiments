function Population(t,m, num){
    this.population;
    this.matingPool;
    this.generations = 0;
    this.finished = false;
    this.target = t;
    this.mutationRate = m;
    this.perfectScore = 1;
    this.popmax = num;
    
    this.best = "";

    this.population = [];
    for(var i=0;i<this.popmax;i++){
        this.population[i] = new DNA(this.target.length);
    }

    this.matingPool = [];

    this.calcFitness = function(){
        for (var i = 0; i < this.population.length; i++) {
            this.population[i].calcFitness(this.target);       
        }
    }
    this.calcFitness();

    this.naturalSelection = function(){
        this.matingPool = [];

        //calculate the top value to map to
        var maxFitness = 0;
        for (var i = 0; i < this.population.length; i++) {
            if(this.population[i].fitness > maxFitness){
                maxFitness = this.population[i].fitness;
            }       
        }
        //build mating pool
        for (var i = 0; i < this.population.length; i++) {
            var fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
            var n = floor(fitness * 100);

            for (var j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);       
            }
        }

    }

    this.generate = function(){
        for (var i = 0; i < this.population.length; i++) {
            var a = floor(random(this.matingPool.length));
            var b = floor(random(this.matingPool.length));
            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];
            var child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations++;
    }



    this.isFinished = function(){
        return this.finished;
    }

    this.getGenerations = function(){
        return this.generations;
    }

    this.getAverageFitness = function(){
        var total = 0;
        for (var i = 0; i < this.population.length; i++) {
            total += this.population[i].fitness;
        }

        return total/(this.population.length);
    }
    this.evaluate = function(){
        var record = 0.0;
        var index = 0;
        for (var i = 0; i < this.population.length; i++) {
            if(this.population[i].fitness > record){
                index = i;
                record = this.population[i].fitness;
            }       
        }

        this.best = this.population[index].getPhrase();
        if(record === this.perfectScore){
            this.finished = true;
        }
    }

    this.getBest = function(){
        return this.best;
    }

    this.allPhrases = function() {
        var everything = "";

        var displayLimit = min(this.population.length,50);


        for (var i = 0; i < displayLimit; i++) {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything;
    }

}