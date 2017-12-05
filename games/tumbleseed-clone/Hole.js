function Hole(_x, _y, _r){
    this.x = _x;
    this.y = _y;
    this.r = _r

    this.display = function(){
        fill(0);
        ellipseMode(RADIUS);
        ellipse(this.x, this.y, this.r, this.r);
    }
}