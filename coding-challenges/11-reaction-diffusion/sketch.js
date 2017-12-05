var canvas;
var cellSize = 20;
var grid;
var next;

const dA = 1.0;
const dB = 0.5;
// const feed = 0.055;
const feed = 0.055;
// const k = 0.062;
const k = 0.062;
const t = 1;

function setup(){
    canvas = createCanvas(200,200);
    pixelDensity(1);
    grid = [];
    next = [];

    // aColor = color(255, 253, 84);
    // bColor = color(65, 72, 97);
    for (var x = 0; x < width; x++) {
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y < height; y++) {
            grid[x][y] = {a:1,b:0};
            next[x][y] = {a:1,b:0};
        }
    }

    for (var i = 100; i < 110; i++) {
        for (var j = 100; j < 110; j++) {
            grid[i][j].b = 1;
        }
    }
}

function draw(){
    background(51);

    for (var x = 1; x < width-1; x++) {
        for (var y = 1; y < height-1; y++) {
            let a = grid[x][y].a;
            let b = grid[x][y].b;
            next[x][y].a = a + 
                           (dA * laplaceA(x,y)) - 
                           (a * b * b) +
                           (feed * (1 - a)) * t;
            next[x][y].b = b + 
                           (dB * laplaceB(x,y)) +
                           (a * b * b) -
                           ((k + feed) * b) * t;
            next[x][y].a = constrain(next[x][y].a, 0, 1);
            next[x][y].b = constrain(next[x][y].b, 0, 1);
        }
    }

    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var pix = (x + y * width) * 4;
            var a = next[x][y].a;
            var b = next[x][y].b;
            var c = floor((a-b) * 255);
            c = constrain(c,0,255);
            pixels[pix + 0] = c;
            pixels[pix + 1] = c;
            pixels[pix + 2] = c;
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();

    swap();
}
function laplaceA(x,y){
    var sumA = 0;
    sumA += grid[x][y].a * -1;
    sumA += grid[x - 1][y].a * 0.2;
    sumA += grid[x + 1][y].a * 0.2;
    sumA += grid[x][y - 1].a * 0.2;
    sumA += grid[x][y + 1].a * 0.2;
    sumA += grid[x - 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y - 1].a * 0.05;
    sumA += grid[x + 1][y + 1].a * 0.05;
    sumA += grid[x - 1][y + 1].a * 0.05;
    return sumA;
}
function laplaceB(x,y){
    var sumB = 0;
    sumB += grid[x][y].b * -1;
    sumB += grid[x - 1][y].b * 0.2;
    sumB += grid[x + 1][y].b * 0.2;
    sumB += grid[x][y - 1].b * 0.2;
    sumB += grid[x][y + 1].b * 0.2;
    sumB += grid[x - 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y - 1].b * 0.05;
    sumB += grid[x + 1][y + 1].b * 0.05;
    sumB += grid[x - 1][y + 1].b * 0.05;
    return sumB;
}

// my original laplace function slowed everything down. So I removed it
// function laplace(x,y,prop){
//     let laplaceTotal = 0;
//     for (var i = -1; i < 2; i++) {
//         for (var j = -1; j < 2; j++) {
//             if(abs(i)+abs(j) == 2){
//                 laplaceTotal += grid[x + i][y + j][prop] * 0.05;
//             } else if(abs(i)+abs(j) == 1){
//                 laplaceTotal += grid[x + i][y + j][prop] * 0.2;
//             } else{
//                 laplaceTotal += grid[x + i][y + j][prop] * -1;
//             }
//             //console.log({laplaceTotal});
//         }
//     }

//     return laplaceTotal;
// }

function swap(){
    let temp = grid;
    grid = next;
    next = temp;
}

function mouseDragged(){
    for (var i = -5; i < 6; i++) {
        for (var j = -5; j < 6; j++) {
            grid[mouseX + i][mouseY + j].a = 0;
            next[mouseX + i][mouseY + j].a = 0;
            grid[mouseX + i][mouseY + j].b = 1;
            next[mouseX + i][mouseY + j].b = 1;
        }
    }
}