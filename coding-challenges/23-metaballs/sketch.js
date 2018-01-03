let canvas;

function setup(){
    canvas = createCanvas(500,500);
    // background(40);
    pixelDensity(1);
}

function draw(){
    loadPixels();

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let pix = (x + y * width) * 4;

            let d = dist(x,y, width/2, height/2);
            pixels[pix + 0] = d;
            pixels[pix + 1] = d;
            pixels[pix + 2] = d;
            pixels[pix + 3] = 255;
        }
    }

    updatePixels();
}