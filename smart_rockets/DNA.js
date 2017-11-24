// Built from and based on course by Daniel Shiffman
// https://www.kadenze.com/courses/the-nature-of-code
// http://natureofcode.com/
// Session 5: Evolutionary Computing

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a psuedo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA

function DNA(newgenes){
    if(arguments.length > 0){
        this.genes = newgenes;
    } else{
        //the gene array
        this.genes = [];
        this.maxForce = 0.4;
        //fill it with random vectors
        for (var i = 0; i < lifetime; i++) {
            var angle = random(TWO_PI);
            this.genes[i] = p5.Vector.fromAngle(angle);
            this.genes[i].mult(random(0, this.maxForce));
        }
    }
    
    this.crossover = function(partner){
        var child = [];
        var midpoint = floor(random(this.genes.length));

        for (var i = 0; i < this.genes.length; i++) {
            if(i > midpoint) child[i] = this.genes[i];
            else child[i] = partner.genes[i];
        }
        var newgenes = new DNA(child);
        return newgenes;
    }

    this.mutate = function(mutationRate){
        for (var i = 0; i < this.genes.length; i++) {
            if(random(1) < mutationRate){
                var angle = random(TWO_PI);
                this.genes[i] = p5.Vector.fromAngle(angle);
                this.genes[i].mult(random(0, this.maxForce));
            }       
        }
    }
}