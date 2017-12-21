var canvas;
let maxIterations = 100;
let range = 5;
let minSlider, maxSlider;
let currentPos;

function setup(){
    canvas = createCanvas(360,360);
    currentPos = createVector(0,0);
    pixelDensity(1);
    createP('');
    createP('Min Slider');
    minSlider = createSlider(-range, 0, -range, 0.01);
    createP('Max Slider');
    maxSlider = createSlider(0, range, range, 0.01);
}
function draw(){
    loadPixels();
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let a = map(x, 0, width, minSlider.value(), maxSlider.value());
            let b = map(y, 0, height, minSlider.value(), maxSlider.value());

            let ca = a;
            let cb = b;

            let n = 0;
            let z = 0;

            while(n < maxIterations){
                let aa = a * a - b * b;
                let bb = 2 * a * b;

                a = aa + ca;
                b = bb + cb;

                if(abs(a + b) > 16){
                // if((a*a+b*b)>4){
                    break;
                }
                n++
            }

            let bright = map(n, 0, maxIterations, 0, 255);
            if(n === maxIterations){
                bright = 0;
            }

            let pix = (x + y * width) * 4;
            pixels[pix + 0] = bright; //red
            pixels[pix + 1] = bright; //green
            pixels[pix + 2] = bright; //blue
            pixels[pix + 3] = 255;//alpha
        }
    }
    updatePixels();
}