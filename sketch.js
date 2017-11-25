var canvas;
var rows = 10;
var columns = 10;
var shapes = [];
var debug = true;

function setup(){
    canvas = createCanvas(window.innerWidth,window.innerHeight);
    background(200);
    canvas.position('absolute', '0');
    canvas.style('z-index', '-1');
    
    for(var i=1;i<rows;i++){
        var x = i * (height/rows);
        for (var j = 1; j < columns; j++) {
            var y = j * (width/columns);
            shapes.push(new Shape(x,y, 10));
        }
    }
    console.log({shapes});
}

function draw(){
    background(255);

    for (var i = 0; i < shapes.length; i++) {
        shapes[i].display();
    }
    fill(255);
    noStroke();
    ellipse(mouseX,mouseY-25,250,250);
}

function Shape(_x, _y, _r){
    this.position = createVector(_x,_y);
    this.r = _r;
    
    push();
    translate(this.position.x + this.r/2, this.position.y + this.r/2);
    pop();

    this.display = function(){
        fill(172, 248, 235);
        
        
        //calculate theta based off mouse position
        var targetVector = p5.Vector.sub(createVector(mouseX,mouseY), this.position);
        //targetVector.setMag(0.4);
        var theta = targetVector.heading() + PI/2;
        // console.log(theta);
        
        if(debug){
            //push into its own coordinate space
            push();
            translate(this.position.x + this.r/2, this.position.y + this.r/2);
            rotate(theta);
            rect(0, 0, this.r, this.r);
            pop();
            //leave own coordinate space
        } else{
            rect(this.position.x, this.position.y, this.r, this.r);
        }
    }
}

function mouseClicked(){
    debug = !debug;
}