class superellipse{
    constructor(detail, n,a,b){
        this.detail = detail || 36;
        this.n = n || 2;
        this.a = a || 100;
        this.b = b || 100;
        this.points = [];
        for (let i = 0; i < this.detail; i++) {
        //for (let angle = 0; angle < TWO_PI; angle+=0.1) {
            let angle = i * TWO_PI/this.detail;
            let point = this.getPoint(angle);
            this.points.push(point);
        }
    }
    update(n,a,b){
        let newPoints = [];
        this.n = n;
        this.a = a;
        this.b = b;

        for (let i = 0; i < this.detail; i++) {
            //for (let angle = 0; angle < TWO_PI; angle+=0.1) {
                let angle = i * TWO_PI/this.detail;
                let point = this.getPoint(angle);
                newPoints.push(point);
        }

        // console.log(newPoints);
        this.points = [];
        // console.log(this.points);
        this.points.push(...newPoints);
        // console.log(this.points);
    }
    getPoint(angle){
        //circle
        // let r = 100;
        // let x = r * cos(angle);
        // let y = r * sin(angle);

        //superellipse
        let na = 2/this.n;
        let nb = 2/this.n;
        let x = pow(abs(cos(angle)), na) * this.a * Math.sign(cos(angle));
        let y = pow(abs(sin(angle)), nb) * this.b * Math.sign(sin(angle));
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