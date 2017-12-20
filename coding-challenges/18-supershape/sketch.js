let canvas;
let mSlider;
let n1Slider, n2Slider, n3Slider;
let n1Check, n2Check, n3Check, sCheck, fmCheck, bCheck;
let rotationSlider;
let radiusSlider;
let superSh;
let n1Angle = 0;
let n2Angle = 0;
let n3Angle = 0;
let sAngle = 0;
let nMax = 20;

function setup(){
    canvas = createCanvas(500,500);
    frameRate(30);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('m Slider');
    mSlider = createSlider(0.01,20,1,0.01);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('n1 Slider');
    n1Slider = createSlider(0.01,nMax,1,0.01);
    n1Check = createCheckbox('oscillate', false);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('n2 Slider');
    n2Slider = createSlider(0.01,nMax,1,0.01);
    n2Check = createCheckbox('oscillate', false);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('n3 Slider');
    n3Slider = createSlider(0.01,nMax,1,0.01);
    n3Check = createCheckbox('oscillate', false);
    createP(' '); //Why am I doing this whyyyyy?
    createP('Number of Rotations Slider: (Will slow down due to number of points)');
    rotationSlider = createSlider(2,nMax,2,2);
    createP(' '); //Why am I doing this whyyyyy?
    createSpan('Radius Slider');
    radiusSlider = createSlider(25,150,100,0);
    sCheck = createCheckbox('Spin', false);
    fmCheck = createCheckbox('Follow Mouse', false);
    bCheck = createCheckbox('Repaint Background', true);
    superSh = new supershape(null, mSlider.value(), n1Slider.value(), n2Slider.value(), n3Slider.value(), radiusSlider.value());
    background(40);
}

function draw(){
    if(bCheck.checked()){
        background(40);
    }

    if(fmCheck.checked()){
        translate(mouseX, mouseY);
    } else{
        translate(width/2, height/2);
    }

    stroke(255);
    
    if(n1Check.checked()){
        n1Angle = updateVal(n1Angle, n1Slider);
    }
    if(n2Check.checked()){
        n2Angle = updateVal(n2Angle, n2Slider);
    }
    if(n3Check.checked()){
        n3Angle = updateVal(n3Angle, n3Slider);
    }

    if(sCheck.checked()){
        rotate(sAngle);
        sAngle += 0.1;
    }
    superSh.update(mSlider.value(), n1Slider.value(), n2Slider.value(), n3Slider.value(), radiusSlider.value());
    superSh.display();
}

function updateVal(angle, slider){
    let newAngle = angle;
    let newVal = map(sin(newAngle), -1,1, 0.01, nMax);
    
    newAngle += 0.1;

    // if(n2Val <= 0){
    //     n2Val = 20;
    // } else if(n2Val < 1){
    //     n2Val -= 0.01;
    // } else{
    //     n2Val -= 0.1;
    // }
    // n2Slider.value(n2Val)

    slider.value(newVal);

    return newAngle;
}