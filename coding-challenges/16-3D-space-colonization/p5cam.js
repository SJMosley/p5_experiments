class p5cam{
    constructor(x, y, z, cx, cy, cz, ux, uy, uz){
        
        //camera variables
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || (height/2.0) / tan(PI*30.0 / 180.0);
        this.distance = z || (height/2.0) / tan(PI*30.0 / 180.0);
        this.centerX = cx || 0;
        this.centerY = cy || 0;
        this.centerZ = cz || 0;
        this.upX = ux || 0;
        this.upY = uy || 1;
        this.upZ = uz || 0;
    }

    update(current, previous){
        let newPos = createVector(this.x, this.y, this.z);

        if(current && previous){
            //take the delta, then reset the polar coordinates of the camera
            let deltaX = previous.x - current.x;
            let deltaY = previous.y - current.y;
            let newX = this.x + deltaX;
            let newY = this.y + deltaY;
            newPos = createVector(newX, newY, this.z);
        }

        newPos.setMag(this.distance);
        this.x = newPos.x;
        this.y = newPos.y;
        this.z = newPos.z;
        
        camera(this.x,
            this.y,
            this.z,
            this.centerX,
            this.centerY,
            this.centerZ,
            this.upX,
            this.upY,
            this.upZ);
    }

    zoom(change){
        this.distance = this.distance + event.delta;
        this.update();
    }
}

function mouseDragged(){
    let current = createVector(mouseX, mouseY);
    let previous = createVector(pmouseX, pmouseY);
    cam.update(current, previous);
}

function mouseWheel(){
    cam.zoom(event.delta);
}