function FinishZone(){
    this.x = width/3;
    this.y = 0;
    this.w = width/3;
    this.h = 50;

    this.display = function(){
        fill(255, 253, 84);
        rect(this.x, this.y, this.w, this.h);
    }
}