var canvas;
var axiom = "F";
var sentence = axiom;
var len = 100;
var angle;
var rules = [];
var branches = 0;
rules[0] = {
    a: "F",
    b: "FF+[+F-F-F]-[-F+F+F]"
}

function generate(){
    if(branches > 5000){
        console.log("too many branches, sorry");
        return;
    }
    len *= 0.5;
    let nextSentence = '';
    for (let i = 0; i < sentence.length; i++) {    
        let current = sentence.charAt(i);
        // console.log('current ' + current);
        let found = false;
        for (let j = 0; j < rules.length; j++) {    
            if(current == rules[j].a){
                nextSentence += rules[j].b;
                found = true;
                break;
            }
        }
        if(!found){
            nextSentence += current;
        }

    }
    sentence = nextSentence;
    createP(sentence);

    turtle();
}

function turtle(){
    background(40);
    resetMatrix();
    translate(width/2, height);
    stroke(255,120);
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);

        if(current == 'F'){
            line(0,0,0,-len);
            translate(0, -len);
            branches++;
        } else if(current == '+'){
            rotate(angle);
        } else if(current == '-'){
            rotate(-angle);
        } else if(current == '['){
            push();
        } else if(current == ']'){
            pop();
        }
    }
}

function setup(){
    canvas = createCanvas(400,400);
    angle = radians(25);
    background(40);
    stroke(255);

    createP('');
    var button = createButton('Generate');
    button.mousePressed(generate);
    createP(sentence);
    
    turtle();
}

function setRules(){
    
}

function newRule(){

}

//not needed
function draw(){}

function keyPressed(){
    if(key == 'G'){
        generate();
    }
}