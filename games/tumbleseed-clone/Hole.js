function Hole(_x, _y, _r){
    this.x = _x;
    this.y = _y;
    this.r = _r

    this.display = function(){
        ellipseMode(RADIUS);
        fill(47, 106, 22)
        ellipse(this.x, this.y-4, this.r, this.r);
        fill(0);
        ellipse(this.x, this.y, this.r, this.r);
    }
}