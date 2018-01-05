class Pipe {
  constructor () {
    this.top = random(height/8, height * 7/8);
    this.opening = random(128, 256);
    this.bottom = this.top + this.opening;
    this.x = width;
    this.speed = 3;
    this.scored = false;
    this.width = 80;
  }

  run(){
      this.update();
      this.draw();
  }

  update(){
      this.x -= this.speed;
  }

  draw(){
      fill(80, 164, 63);
      strokeWeight(4);
      stroke(0);
      //top section
      rect(this.x, 0, this.width, this.top);
      
      //bottom
      let hb = height - this.bottom;
      rect(this.x, this.bottom, this.width, hb);

      fill(0);
      rect(this.x + this.width/4, this.top/3, this.width/16, this.top/3);
      rect(this.x + this.width/4, this.bottom + (hb/3), this.width/16, hb/3);
  }

  hit(other){
    if(this.x < other.x + other.r && other.x - other.r < this.x + this.width &&
       this.top > other.y - other.r && other.y + other.r < this.bottom){
        this.highlight = true;
        return true;
    }
  }

  offscreen(){
    return this.x < -this.width
  }
}