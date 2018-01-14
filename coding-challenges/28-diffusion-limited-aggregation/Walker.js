class Walker {
  constructor (pos, stuck) {
    this.pos = pos || randomPoint();
    this.stuck = stuck || false;
  }


  walk(){
    let vel = p5.Vector.random2D();
    this.pos.add(vel);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  }

  checkStuck(others){
    for (let i = 0; i < others.length; i++) {
        let d = distSq(this.pos, others[i].pos);

        if(d < (r * r * 4)){
        this.stuck = true;
        return true;
        break;
        }
    }

    return false;
  }

  draw(index, others){
    let  hu = map(index, 0, others.length, 0, 255);
    fill(hu, 255, 255);
    noStroke();
    ellipse(this.pos.x, this.pos.y, r * 2, r * 2);
  }
}

function randomPoint(){
    let i = floor(random(4));
    let x,y;
    switch(i){  //clockwise
        case 0: //left
        y = random(height);
        return createVector(0, y);
        break;
        case 1: //top
        x = random(width);
        return createVector(x, 0)
        break;
        case 2: //right
        y = random(height);
        return createVector(width, y);
        break;
        case 3: //bottom
        x = random(width);
        return createVector(x, height)
        break;
    }
}

function distSq(a,b){
    let dx = b.x - a.x;
    let dy = b.y - a.y;
    return dx * dx + dy * dy;
}