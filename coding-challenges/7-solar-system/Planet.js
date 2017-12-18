class Planet{
    constructor(r,d,speed, text){
        // this.pos = createVector(r, d, a);
        this.v = p5.Vector.random3D();
        this.radius = r;
        this.distance = d;
        this.v.mult(this.distance);
        this.orbitSpeed = (speed==null || speed==undefined)  ? random(0.005, 0.02) : speed ;
        this.angle = random(TWO_PI);
        this.planets = [];
        this.texture = text;

    }
    
    spawnMoons(num, level){
        for (let i = 0; i < num; i++) {
            let rad = random(10, this.radius/(level + 1));
            let dis = random((this.radius + rad), (this.radius + rad) * 2);
            let obs = random(-0.05, 0.05);
            let text = planetsimgs[floor(random(0,planetsimgs.length))];
            this.planets.push(new Planet(rad, dis, obs, text));
            if(level < 3){
                this.planets[this.planets.length-1].spawnMoons(floor(random(1,4-level)), level+1);
            }
        }
    }

    orbit(){
        this.angle = this.angle + this.orbitSpeed;
        if(this.planets.length){
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].orbit();
            }
        }
    }

    display(){
            push();
            
            //rotate(this.angle, [this.v.x, this.v.y, this.v.z]);
            rotateX(this.v.x);
            rotateY(this.v.y);
            rotateZ(this.v.z);
            translate(this.v.x, this.v.y,this.v.z);
            // fill(this.radius*4, this.radius*2, this.radius);
            texture(this.texture);
            sphere(this.radius);
            
            for (let i = 0; i < this.planets.length; i++) {
                this.planets[i].display();
            }
        pop();
    }
}