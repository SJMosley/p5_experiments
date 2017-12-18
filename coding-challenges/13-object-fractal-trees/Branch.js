class Branch{
    constructor(begin, end, length){
        this.begin = begin || createVector(width/2, height);
        this.end = end || createVector(width/2, height - 100);
        this.finished = false;
        this.branchLength = length || p5.Vector.sub(this.end, this.begin).mag()*0.75;
        console.log('bl: ' + this.branchLength);
    }
    update(){
        this.jitter();
    }
    
    jitter(){
        this.begin.x += random(-1,1);
        this.begin.y += random(-1,1);
        // this.end.x += random(-5,5);
        // this.end.y += random(-5,5);
    }

    display(){
        stroke(255);
        line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    }

    branch(tree,num){
        let dir = p5.Vector.sub(
            createVector(this.end.x, this.end.y - this.branchLength),
            this.begin);
        // dir.normalize();
        // dir.mult(this.branchLength);

        //safety precautions
        if(this.branchLength < 4){
            this.finished = true;
            return;
        } 
        if(tree.length > 5000){ //because I like your computers 😆
            this.finished = true;
            return;
        } 
        
        if(num){
            let tempdir;
            for (let i = -(floor(num/2)); i < floor(num/2) + 1; i++) {
                tempdir = dir.copy();
                if(fullCircle.checked()){
                    tempdir.rotate(i * TWO_PI/num);
                    let newEnd = p5.Vector.add(this.end, tempdir);
                    let newBranch = new Branch(this.end, newEnd, this.branchLength * 0.75);
                    tree.push(newBranch);
                }else{
                    tempdir.rotate(i * PI/num);
                    let newEnd = p5.Vector.add(this.end, tempdir);
                    let newBranch = new Branch(this.end, newEnd);
                    tree.push(newBranch);
                }
                
            }
        } else{
            dir.rotate(-PI/4);
            let newEnd = p5.Vector.add(this.end, dir);
            let left = new Branch(this.end, newEnd);
            
            dir.rotate(2*PI/4);
            newEnd = p5.Vector.add(this.end, dir);
            let right = new Branch(this.end, newEnd);
            
            tree.push(left);
            tree.push(right);
        }
        
        this.finished = true;
    }
}