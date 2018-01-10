let canvas;
let r = 4;
let k = 30;
let grid;
let active;
let w = r/Math.sqrt(2);
let cols, rows;
let ordered;

function setup(){
    canvas = createCanvas(500,500);
    colorMode(HSB);
    resetSketch(random(width), random(height));
}
function draw(){
    background(0);
    poisson();

    r = map(mouseX, 0, width, 4, 10);

    // for (let i = 0; i < grid.length; i++) {
    //   if(grid[i]){
    //     strokeWeight(r*0.5);
    //     stroke(255);
    //     point(grid[i].x, grid[i].y);
    //   }
    // }

    for (let i = 0; i < ordered.length; i++) {
      strokeWeight(ordered[i].r*0.3);
      
      //blue
    //   let hu = map(floor(i)/20 % 360, 0, 360, 180, 230);
      //rainbow
      let hu = floor(i)/20 % 360;
      stroke(hu,255,255);
      point(ordered[i].x, ordered[i].y);
    }
}


function resetSketch(_x,_y){
  grid = [];
  active = [];
  ordered = [];
  background(40);
  stroke(255);
  
  //STEP 0
  cols = floor(width/w);
  rows = floor(height/w);
  for (let i = 0; i < cols*rows; i++) {
    grid[i] = undefined;
  }
  
  //STEP 1
  let x = _x;
  let y = _y;
  let i = floor(x/w);
  let j = floor(y/w);
  let pos = createVector(x, y);
  grid[i+j*cols] = pos;
  active.push(pos);
}

function poisson(){
    for (let times = 0; times < 5; times++) {
        if(active.length > 0){
            let randIndex = floor(random(active.length));
            let pos = active[randIndex];
            let found = false;
            for (let n = 0; n < k; n++) {
              let sample = p5.Vector.random2D(); //random unit vector
              let mag = random(r, 2 * r);
              sample.setMag(mag);
              sample.add(pos);
    
              let col = floor(sample.x / w);
              let row = floor(sample.y / w);
    
              if(col > -1 && row > -1 && col < cols && row < rows && !grid[col + row * cols]){
                let ok = true;
                for (let i = -1; i <= 1; i++) {
                  for (let j = -1; j <= 1; j++) {
                    let index = (col + i) + (row + j) * cols;
                    let neighbor = grid[index];
                    if(neighbor){
                      let d = p5.Vector.dist(sample, neighbor);
                      if(d < r){
                          ok = false;
                      }
                    }
                  }
                }
                if(ok){
                  found = true;
                  grid[col + row * cols] = sample;
                  active.push(sample);
                  ordered.push(sample);
                  ordered[ordered.length - 1].r = r;
                  break;
                }
              }
            }
            if(!found){
                active.splice(randIndex, 1);
            }
        }
    }
}

function mousePressed(){
    resetSketch(mouseX, mouseY);
}

function mouseDragged(){
    active.push(createVector(mouseX, mouseY));
}