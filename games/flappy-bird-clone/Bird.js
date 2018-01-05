class Bird {
  constructor () {
      this.x = 64;
      this.y = height/2;
      this.r = 16;
      this.vel = 0;
      this.acc = 0;
      this.gravity = 0.5;
      this.lift = -14;
  }

  run(){
      this.applyForce(this.gravity);
      this.update();
      this.edges();
      this.draw();
  }

  update(){
    this.vel += this.acc;
    this.y   += this.vel;
    this.acc *= 0;
  }

  up(){
    this.applyForce(this.lift);
  }

  applyForce(force){
      this.acc += force;
  }

  draw(){
    fill(233, 213, 74);
    strokeWeight(2);
    ellipseMode(RADIUS)
    ellipse(this.x, this.y, this.r, this.r);
    fill(255);
    ellipse(this.x + 8, this.y - 8, 6, 6);
    fill(255, 132, 36);
    ellipse(this.x + 14, this.y + 4, 8, 4);
  }

edges(){
        if(this.x > width) {
            this.x = width;
            this.vel = 0;
        }
        if(this.y > height) {
            this.y = height;
            this.vel = 0;
        }
        if(this.x < 0) {
            this.x = 0;
            this.vel = 0;
        }
        if(this.y < 0) {
            this.y = 0;
            this.vel = 0;
        }
    }
}