//Flock object for managing boids array
//Learned in nature of code course by dan shiffman
// http://natureofcode.com/

function Flock(){
    this.boids = []

    this.run = function(){
        var mouse = createVector(mouseX, mouseY);
        for (var i = 0; i < this.boids.length; i++) {
            this.boids[i].run(this.boids, mouse); //pass all boids to every boid
        }
    }

    this.addBoid = function(boid){
        this.boids.push(boid);
    }
}