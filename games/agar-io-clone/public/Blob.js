class Blob {
  constructor (x, y, r) {
    if(x && y){
        this.pos = createVector(x,y);
    } else{
        this.pos = createVector(0,0);
    }
    this.r = r || 10;
    this.vel = createVector(0,0);
  }

  run(){
    this.update();
    this.draw();
  }
  update(){
    let newVel = createVector(mouseX-width/2, mouseY-height/2);
    newVel.limit(3);
    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel);

  }
  draw(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
  eats(other){
    let distanceCheck = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < this.r;
    let sizeCheck = this.r > other.r;
    
    if(distanceCheck && sizeCheck){
      let sum = (PI * this.r * this.r) + (PI * other.r * other.r);
      this.r = sqrt(sum/PI)
      return true;
    } else{

      return false;
    }
  }
}