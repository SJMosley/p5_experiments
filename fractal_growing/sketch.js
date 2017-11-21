var canvas;
var currTime;
var branches = 2;
var minLength = 2;

var tree = [];
var leaves = [];

function setup(){
    canvas = createCanvas(500,500);
    background(40);
    var b0 = new Branch(createVector(width/2,height), createVector(0, -1), 100, 0);
    tree.push(b0);

}

function draw(){
    background(255);
    
    for(var i=0; i< tree.length; i++){
        tree[i].update();
        tree[i].render();

        if(tree[i].timeToBranch()){
            if(tree.length < 2048){
                tree.push(tree[i].branch(30));
                tree.push(tree[i].branch(-30));
            }
            else{
                leaves.push(new Leaf(tree[i].end, random(100)));
            }
        }
    }

    for(var i=0; i<leaves.length; i++){
        leaves[i].timeToFall();
        leaves[i].update();
        leaves[i].display();
    }
}

function mouseClicked(){

}