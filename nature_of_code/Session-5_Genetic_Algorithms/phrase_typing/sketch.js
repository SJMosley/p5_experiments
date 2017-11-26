var population,popmax,mutationRate,target, phraseInput, phraseTitle, newPhraseButton;

var bestPhrase,allPhrases,stats;

function setup(){
    phraseTitle = createP('Target Phrase');
    phraseInput = createInput("target phrase");
    newPhraseButton = createButton('Set new phrase');
    newPhraseButton.mousePressed(setPhrase);

    bestPhrase = createP("Best Phrase:");
    bestPhrase.class("best");

    allPhrases = createP("All phrases:");
    allPhrases.position(600,32);
    allPhrases.class("all");

    stats = createP("Stats");
    stats.class("stats");

    target = "This is going to be fun";
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

function setPhrase(){
    population = new Population(phraseInput.value(),mutationRate,popmax);
    loop();
}