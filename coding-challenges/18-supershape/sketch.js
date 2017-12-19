let canvas;
let mSlider;
let n1Slider, n2Slider, n3Slider;
let n1Check, n2Check, n3Check;
let angleSlider;
let radiusSlider;
let superSh;
let n2Val = 20;

function setup(){
    canvas = createCanvas(500,500);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('m Slider');
    mSlider = createSlider(0,10,0,1);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('n1 Slider');
    n1Slider = createSlider(0.01,20,1,0.01);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('n2 Slider');
    n2Slider = createSlider(0.1,20,1,0);
    n2Check = createCheckbox('oscillate', false);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('n3 Slider');
    n3Slider = createSlider(0.1,20,1,0);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('Rotation Slider');
    angleSlider = createSlider(2,20,2,2);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('Radius Slider');
    radiusSlider = createSlider(25,150,100,0);
    superSh = new supershape(null, mSlider.value(), n1Slider.value(), n2Slider.value(), n3Slider.value(), radiusSlider.value());
    background(40);
}

function draw(){
    background(40);
    translate(width/2, height/2);
    stroke(255);
    
    if(n2Check.checked()){
        if(n2Val <= 0){
            n2Val = 20;
        } else if(n2Val < 1){
            n2Val -= 0.01;
        } else{
            n2Val -= 0.1;
        }
        n2Slider.value(n2Val)
    }

    superSh.update(mSlider.value(), n1Slider.value(), n2Slider.value(), n3Slider.value(), radiusSlider.value());
    superSh.display();
}