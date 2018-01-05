class Blob {
  constructor (x, y, r) {
    if(x && y){
        this.pos = createVector(x,y);
    } else{
        this.pos = createVector(width/2, height/2);
    }

    this.r = r || 64;
  }

  run(){
    this.update();
    this.draw();
  }
  update(){

  }
  draw(){
    fill(255);
    ellipse(this.pos.x, this.pos.y, this.r, this.r);
  }
}