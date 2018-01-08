class Blob {
  constructor (x, y, r, user) {
    if(x && y){
        this.pos = createVector(x,y);
    } else{
        this.pos = createVector(0,0);
    }
    this.r = r || 10;
    this.vel = createVector(0,0);
    this.color = [random(255),random(255),random(255)];
    this.data = {};
    this.user = user;
  }

  run(){
    if(mouseIsPressed){
      this.update();
    }
    this.constrain();
    this.draw();
  }
  update(){
    let newVel = createVector(mouseX-width/2, mouseY-height/2);
    newVel.limit(3);
    this.vel.lerp(newVel, 0.1);
    this.pos.add(this.vel);

  }
  draw(){
    if(this.user){
      strokeWeight(4);
      stroke(this.color[0] - 20, this.color[1] - 20, this.color[2] - 20);
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
      noStroke()
      // console.log(socket);
      textAlign(CENTER)
      text('ME', this.pos.x, this.pos.y - this.r *2);
    } else{
      noStroke()
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    if(dead){
      textAlign(CENTER);
      textSize(64);
      text('YOU DIED\nReset in ', blob.pos.x, blob.pos.y);

      timer--;
    }
  }
  eats(other){
    let distanceCheck = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y) < this.r;
    let sizeCheck = this.r * 0.9 > other.r;
    
    if(distanceCheck && sizeCheck){
      let sum = (PI * this.r * this.r) + (PI * other.r * other.r);
      this.r = sqrt(sum/PI);
      return true;
    } else{
      return false;
    }
  }

  constrain(){
    this.pos.x = constrain(this.pos.x, -width * 2, width * 2);
    this.pos.y = constrain(this.pos.y, -height * 2, height * 2);
  }
}