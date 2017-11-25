function Obstacle(x,y,w_,h_){
    this.position = createVector(x,y);
    this.w = w_;
    this.h = h_;

    this.display = function(){
        stroke(0);
        fill(175);
        strokeWeight(2);
        rectMode(CORNER);
        rect(this.position.x, this.position.y, this.w, this.h);
    }

    this.contains = function(point){
        if(point.x > this.position.x &&
        point.x < this.position.x + this.w &&
        point.y > this.position.y &&
        point.y < this.position.y + this.h){
            return true;
        } else{
            return false;
        }
    }
}