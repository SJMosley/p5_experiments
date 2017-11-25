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

//a-z or space or period
function newChar(){
    var c = floor(random(63,122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;
    return String.fromCharCode(c);
}

function DNA(num){
    this.targetLength = num;
    this.genes = [];
    this.fitness = 0;

    for (var i = 0; i < this.targetLength; i++) {
        this.genes[i] = newChar();
    }

    this.getPhrase = function(){
        return this.genes.join('');
    }

    this.calcFitness = function(target){
        var score=0;
        for (var i = 0; i < this.genes.length; i++) {
            if(this.genes[i] == target.charAt(i)){
                score++;
            }
        }
        this.fitness = score/target.length;
    }

    this.crossover = function(partner){
        var child = new DNA(this.genes.length);
        var midpoint = floor(random(this.genes.length));

        for (var i = 0; i < this.genes.length; i++) {
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }

        return child;
    }

    this.mutate = function(mutationRate){
        for (var i = 0; i < this.genes.length; i++) {
            if(random(1) < mutationRate){
                this.genes[i] = newChar();
            }       
        }
    }
}