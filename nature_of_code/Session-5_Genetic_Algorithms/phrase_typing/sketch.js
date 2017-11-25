var population,popmax,mutationRate,target;

var bestPhrase,allPhrases,stats;

function setup(){
    bestPhrase = createP("Best Phrase:");
    bestPhrase.position(10,10);
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(600,10);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.position(10,200);
    stats.class("stats");

    target = "I love you so much";
    popmax = 200;
    mutationRate = 0.01;

    population = new Population(target, mutationRate, popmax);
}
function draw(){
    population.naturalSelection();
    
    population.generate();

    population.calcFitness();

    population.evaluate();

    //stop at target phrase
    if(population.isFinished()){
        noLoop();
    }

    displayInfo();
}

function displayInfo(){
    var answer = population.getBest();

    bestPhrase.html("Best phrase:<br>" + answer);

    var statstext = "total generations:  " + population.getGenerations() + "<br>";
    statstext +=    "average fitness:    " + population.getAverageFitness() + "<br>";
    statstext +=    "total population:   " + popmax + "<br>";
    statstext +=    "mutation rate:      " + floor(mutationRate * 100) + "%";    

    stats.html(statstext);

    allPhrases.html("All phrases:<br>"+population.allPhrases());
}