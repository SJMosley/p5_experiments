var biggie = false;

function setup(){
    createCanvas(windowWidth, windowHeight);
    background(127);
}

function draw(){
    fill(lerpColor(color(120,253,174),color(120,30,120),mouseX/mouseY));
    
    if(biggie){
        ellipse(mouseX, mouseY, ((windowWidth - mouseX)/10), ((windowWidth - mouseX)/10));
    }
    else{
        ellipse(mouseX, mouseY, (mouseX/10) , (mouseX/10));
    }
}

function mouseClicked(){
    biggie = !biggie;
}