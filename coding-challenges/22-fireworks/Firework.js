class Firework{
    constructor(x,y){
        this.hu = random(255);
        this.firework = new Particle(x,y, this.hu, true);
        this.fireworks = [];
        this.exploded = false;
    }

    run(){
        this.update();
        this.draw();
    }

    update(){
        if(!this.exploded){
            this.firework.applyForce(gravity);
            this.firework.run();
            
            if(this.firework.vel.y >= 0){
                this.explode();
            }
        }
        
        for (let i = this.fireworks.length - 1; i >= 0 ; i--) {
            this.fireworks[i].applyForce(gravity);
            this.fireworks[i].run();

            if(this.fireworks[i].done()){
                this.fireworks.splice(i,1);
            }
        }
        
        
    }
    draw(){
        if(!this.exploded){
            this.firework.draw();
        }
        for (let i = 0; i < this.fireworks.length; i++) {
            this.fireworks[i].draw();
        }
    }

    done(){
        if(this.exploded && this.fireworks.length == 0){
            return true;
        } else{
            return false;
        }
    }

    explode(){
        this.exploded = true;
        let fireCount = random(40, 100);
        for (let i = 0; i < fireCount; i++) {
            let p = new Particle(this.firework.pos.x, this.firework.pos.y, this.hu, false);
            this.fireworks.push(p);
        }
    }


}