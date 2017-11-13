var maxCircleSize = 20;
var phase=0, speed=0.03;
var numRows=10;
var numCols=10;
var colorA, colorB;
var numStrands;
var posSlider, strandSlider, circleSizeSlider;

function setup(){
    createCanvas(500,500);
    textSize(20);
    noStroke();
    colorA = color(253, 174, 120);
    colorB = color(226, 129, 161);

    posSlider = createSlider(0,100,0);
    posSlider.position(110, 480);
    posSlider.style('width', '80px');
    
    
    strandSlider = createSlider(2,10,2,1);
    strandSlider.position(210, 480);
    strandSlider.style('width', '80px');
    
    circleSizeSlider = createSlider(20,60,20);
    circleSizeSlider.position(310, 480);
    circleSizeSlider.style('width','80px');
}

function draw(){
    background(4, 58, 74);
    fill(255);
    text('Position', 110, 470);
    text('Strand', 210, 470);
    text('Circle Size', 310, 470);

    numStrands = strandSlider.value();
    phase = frameCount * speed;
    for(var strand = 0; strand<numStrands; strand++){
        var strandPhase = phase + map(strand, 0, numStrands, 0, TWO_PI);
        
        if(strand < 4){
            maxCircleSize = circleSizeSlider.value();
        }
        else{
            maxCircleSize = 20;
        }

        for(var col=0;col<numCols;col++){
            var colOffset = map(col, 0, numCols, 0, TWO_PI);
            var x = map(col, 0, numCols, 50, width-50);
            x = x + sin(strandPhase + colOffset) * posSlider.value();

            for(var row=0;row<numRows;row++){
                //var y=height/2 + row * 10 + sin(phase * colOffset) * 50; //Cool faster effect
                var y=height/2 + row * 10 + sin(strandPhase + colOffset) * (50 + posSlider.value());
                var sizeOffset = (cos(strandPhase - (row * 0.1)+ colOffset) + 1) * 0.5;
                var circleSize = sizeOffset * maxCircleSize;

                if(mouseIsPressed){
                    colorA = color(120, 174, 253);
                }
                else{
                    colorA = color(253, 174, 120);
                }
                fill(lerpColor(colorA, colorB, row/numRows));
                ellipse(x,y, circleSize,circleSize);

            }
        }
    }
}