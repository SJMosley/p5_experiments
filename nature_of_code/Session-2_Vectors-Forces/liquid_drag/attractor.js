function Attractor (x,y){
    this.pos = createVector(x || width/2, y || height/2);
    this.mass = 20;
    this.G = 1;

    this.display = function () {
        fill(255);
        ellipse(width/2, height/2, 48, 48);
    }
    this.calculateAttraction = function (obj){
        //Calculate Direction of force
        var force = p5.Vector.sub(this.pos, obj.pos);
        //Distance between objects
        var distance = force.mag();
        //limit distance to get rid of "extreme" results
        distance = constrain(distance, 5, 25);
        //normalize
        force.normalize();
        //calculate gravitational force magnitude
        var strength = (this.G * this.mass * obj.mass)/(distance * distance);
        //Get force vector --> magnitude * direction
        force.mult(strength);
        return force;
    }
}