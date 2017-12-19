class supershape{
    constructor(detail, m, n1, n2, n3, radius){
        this.detail = detail || 200;
        this.m = m || 1;
        this.n1 = n1 || 2;
        this.n2 = n2 || 2;
        this.n3 = n3 || 2;
        this.radius = radius || 100;
        // this.a = a || 100;
        // this.b = b || 100;
        this.points = [];
        for (let i = 0; i < this.detail; i++) {
        //for (let angle = 0; angle < TWO_PI; angle+=0.1) {
            let angle = i * TWO_PI/this.detail;
            let point = this.getPoint(angle);
            this.points.push(point);
        }
    }

    update(m, n1, n2, n3, radius){
        let newPoints = [];
        this.m = m;
        this.n1 = n1;
        this.n2 = n2;
        this.n3 = n3;
        this.radius = radius;

        for (let i = 0; i < this.detail * angleSlider.value(); i++) {
            let angle = i * (PI * angleSlider.value())/this.detail;
            // let angle = i * TWO_PI/this.detail;
            let point = this.getPoint(angle);
            newPoints.push(point);
        }

        this.points = [];
        //spread new points into old array
        this.points.push(...newPoints);

    }

    getPoint(angle){
        let r;
        let t1, t2;
        let x,y;
        let a = 1, b = 1;

        t1 = cos(this.m * angle / 4) / a;
        t1 = abs(t1);
        t1 = pow(t1, this.n2);
        
        t2 = sin(this.m * angle / 4) / b;
        t2 = abs(t2);
        t2 = pow(t2, this.n3);

        r = pow((t1 + t2), (1/this.n1)) * this.radius;

        if(abs(r) == 0){
            x = 0;
            y = 0;
        } else{
            x = r * cos(angle);
            y = r * sin(angle);
        }

        return createVector(x,y);
    }

    display(){
        noFill();
        stroke(255);
        beginShape();
        for (let i = 0; i < this.points.length; i++) {
            vertex(this.points[i].x, this.points[i].y);
        }
        endShape(CLOSE);
    }
}