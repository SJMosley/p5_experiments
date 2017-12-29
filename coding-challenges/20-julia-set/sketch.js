var canvas;
let maxIterations = 100;
let range;
let oscillateACheck,oscillateBCheck,bwCheck;
let currentPos;
let angleA = 0;
let angleB = 0;
let imagesSaved = 0;

function setup(){
    canvas = createCanvas(600,600);
    currentPos = createVector(0,0);
    range = 1.4;
    pixelDensity(1);
    createP('');
    bwCheck = createCheckbox('Black and White', false);
    oscillateACheck = createCheckbox('Oscillate A', false);
    oscillateBCheck = createCheckbox('Oscillate B', false);
    oscillateACheck.changed(resetFocus);
    oscillateBCheck.changed(resetFocus);
}
function draw(){
    let w = 3;
    let h = (w * height)/ width;
    
    let xmin = -w/2;
    let ymin = -h/2;

    loadPixels();

    //set range for x
    let xmax = xmin + w;
    let ymax = ymin + h;
    
    //calculate change for each pixel
    let dx = (xmax-xmin)/width;
    let dy = (ymax-ymin)/height;

    let ca,cb;
    //julia set constants
    if(oscillateACheck.checked() && oscillateBCheck.checked()){
        ca = sin(angleA);
        cb = cos(angleB);
    } else if (oscillateACheck.checked()){
        ca = sin(angleA);
        cb = 0;
    } else if(oscillateBCheck.checked()){
        ca = 0;
        cb = cos(angleB);
    } else{
        ca = map(mouseX, 0, width, -range, range);
        cb = map(mouseY, 0, height, -range, range);
    }

    angleA += 0.03;
    angleB += 0.03;
    let a,b;

    let y = ymin;
    for (let j = 0; j < height; j++) {
        let x = xmin;
        for (let i = 0; i < width; i++) {
            let a = x;
            let b = y;
            let n = 0;

            while(n < maxIterations){
                let aa = a * a;
                let bb = b * b;
                let twoab = 2.0 * a * b;

                a = aa - bb + ca;
                b = twoab + cb;

                if(aa + bb > 4){
                    break;
                }
                n++;
            }

            let bright;
            
            //COLORS for gradient
            //Blue
            //RGB(0, 121, 191)
            //Orange
            //RGB(255, 165, 26)
            let red = map(n, 0, maxIterations, 0, 255);
            let green = map(n, 0, maxIterations, 121, 165);
            let blue = map(n, 0, maxIterations, 191, 26);
            
            let pix = (j + i * width) * 4;
            if(bwCheck.checked()){
                bright = map(n, 0, maxIterations, 0, 255);
                pixels[pix + 0] = bright; //red
                pixels[pix + 1] = bright; //green
                pixels[pix + 2] = bright; //blue
                pixels[pix + 3] = 255;//alpha
            } else{
                bright = map(n, 0, maxIterations, 100, 255);
                pixels[pix + 0] = red; //red
                pixels[pix + 1] = green; //green
                pixels[pix + 2] = blue; //blue
                pixels[pix + 3] = bright;//alpha
            }
            x += dx;
        }
        y += dy;
    }
    updatePixels();
}

document.addEventListener("keydown", function(e) {
    if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
      e.preventDefault();
        let name = 'julia-set';
        if(imagesSaved != 0){
            name += '_';
            save(name + imagesSaved + '.png');
        } else{
            save(name + '.png');
        }
        imagesSaved += 1;
    }
  }, false);

function resetFocus(){
    canvas.focus();
}