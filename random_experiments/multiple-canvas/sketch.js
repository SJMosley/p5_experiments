sketches = [];
var sketch = function(p){
    p.x = 100;
    p.y = 100;

    p.setup = function(){
        p.createCanvas(200,200);
        p.background(51);
    }
    p.draw = function(){
        p.fill(255,0,200,25);
        p.noStroke();
        p.ellipse(p.x, p.y, 48,48);

        p.x = p.x + p.random(-10,10);
        p.y = p.y + p.random(-10,10);
    }
    p.mousePressed = function(){
        createSketch();
    }
}

function createSketch(){
    if(sketches.length < 16){
        sketches.push(new p5(sketch));
    }
}
function resetBackground(){
    for (var i = 0; i < sketches.length; i++) {
        let sk = sketches[i];
        sk.x = sk.width/2;
        sk.y = sk.height/2;
        let bg = map(i,0,sketches.length, 51,235);
        sk.background(bg);
    }
}

createSketch();
var sketchInterval = setInterval(createSketch, 2000);