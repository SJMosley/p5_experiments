function Liquid(x,y,w,l){
    this.pos = createVector(x,y);
    this.width = w;
    this.length = l;
    this.c = 1;

    this.display = function() {
        fill(60,60,255);
        rect(this.pos.x, this.pos.y, this.width, this.length);
    }

    this.calculateDrag = function(obj){
        //Magnitude is coefficient * speed squared
        var speed = obj.vel.mag();
        var dragMagnitude = this.c * speed * speed;
        //Direction is the inverse of velocity
        var dragForce = obj.vel.copy();
        dragForce.mult(-1);

        //Scale according to drag Magnitude
        dragForce.setMag(dragMagnitude);

        return dragForce;
    }

    this.contains = function(obj){
        return ((obj.pos.x > this.pos.x) && (obj.pos.x < (this.pos.x + this.width)) &&(obj.pos.y > this.pos.y) && (obj.pos.y < (this.pos.y + this.length)));
    }
}