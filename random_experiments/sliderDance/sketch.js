var sliders;
var masterSlider;
var angle;
var offset;

function setup(){
    noCanvas();
    
    angle = 0;
    sliders = [];
    createSpan('Master Slider (control offset)');
    masterSlider = createSlider(0,.25,0,0);
    createP(' ');
    for (var i = 0; i < 100; i++) {
        sliders[i] = createSlider(0,255,0,0);
        sliders[i].class('movingSlider');
        sliders[i].style('background-color', '#61AFEF');
    }
}
function draw(){
    offset = masterSlider.value();
    for (var i = 0; i < sliders.length; i++) {
        var x = map(sin(angle + (offset * i)), -1,1, 0,255);
        sliders[i].value(x);
    }

    angle += 0.1;
}