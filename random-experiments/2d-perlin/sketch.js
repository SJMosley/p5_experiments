let canvas;
let noiseScale = 0.01;

function setup(){
    canvas = createCanvas(500,500);
    background(40);
    pixelDensity(1);
}

function draw(){
    let yoff = 0;
    loadPixels();
    for (let y = 0; y < height; y++) {
        let xoff = 0;
        for (let x = 0; x < width; x++) {
            let index = (x + y * width) * 4; //since is stores r,g,b,a for each pixel

            let r = noise(xoff, yoff) * 255;
            pixels[index + 0] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = 255;

            xoff += noiseScale;
        }
        yoff += noiseScale;
    }

    updatePixels();
}