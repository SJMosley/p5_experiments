var canvas;
var tree = [];
var jitter;
var branchNum;
var fullCircle;

function setup(){
    canvas = createCanvas(500,500);
    background(40);
    jitter = createCheckbox('jitter', false);
    fullCircle = createCheckbox('circle', false);
    branchNum = createSlider(1,20,3,1);
    
    resetSketch();
    
    
}

function draw(){
    background(40);

    for (let i = 0; i < tree.length; i++) {
        if(jitter.checked()){
            tree[i].update();
        }
        tree[i].display();
    }
}

function mousePressed(){
    
}

function keyPressed(){
    if(key == ' '){
        for (let i = tree.length-1; i >= 0; i--) {
            if(!tree[i].finished){
                tree[i].branch(tree,branchNum.value());
            }
        }
    }
    if(key == 'R'){
        resetSketch();
    }
}

function resetSketch(){
    tree = [];
    
    let root;
    let branchLength = 100;
    if(fullCircle.checked()){
        let a = createVector(width/2, height/2);
        let b = createVector(width/2, height/2);
    
        root = new Branch(a,b, branchLength);
    } else{
        let a = createVector(width/2, height);
        let b = createVector(width/2, height-branchLength);
    
        root = new Branch(a,b);
    }

    tree[0] = root;
}