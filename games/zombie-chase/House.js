class House{
    constructor(){

    }

    draw(){
        stroke(255);
        //house
        fill(0, 99, 191);
        rect(130,250, 240, 300);
    
        //roof
        fill(255, 165, 26);
        beginShape();
        vertex(50, 250);
        vertex(250, 80);
        vertex(450, 250);
        endShape(CLOSE);
        //door
        fill(233, 213, 74);
        rect(225, height-100, 50, 100);
    
        //doorbell
        ellipse(288, 450, 10, 20);
    
        //door knob
        fill(106, 235, 24);
        ellipse(264, 450, 10, 10);
    
    
        //window
        fill(97, 175, 239);
        rect(175,285,50,50);
    }
}