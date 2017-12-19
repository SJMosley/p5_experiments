class Tree{
    constructor(numLeaves, startPos){
        this.leaves = [];
        this.branches = [];
        this.safety = 0;
        //add new leaves based on passed in number
        for (let i = 0; i < numLeaves; i++) {
            this.leaves.push(new Leaf());
        }

        let pos;
        //Make root branch
        if(startPos != undefined){
            pos = startPos;
        } else{
            pos = createVector(width/2, height);
        }
        let dir = createVector(0,-1);
        let root = new Branch(null, pos, dir);
        this.branches.push(root);

        
        let current = root;
        let found = false;

        //build up initial tree stalk;
        while(!found){
            for (let i = 0; i < this.leaves.length; i++) {
                // console.log({current});
                // console.log(this.leaves[i]);
                let d = p5.Vector.dist(current.pos, this.leaves[i].pos);
                if(d < max_dist){
                    found = true;
                }
            }

            if(!found){
                let branch = current.next();
                current = branch;
                this.branches.push(current);
            }
        }
    }

    grow(){
        // console.log('grow');
        //Cycle through leaves to find the closest branch
        for (let i = 0; i < this.leaves.length; i++) {
            let leaf = this.leaves[i];

            let closestBranch = null;
            let record = max_dist;

            //cycle through branches and find the closest by checking against the record
            for (let j = 0; j < this.branches.length; j++) {
                let branch = this.branches[j];
                let d = p5.Vector.dist(leaf.pos, branch.pos);

                if(d < min_dist){
                    leaf.reached = true;
                    closestBranch = null;
                    this.safety++;
                    break;
                } else if(d < record){
                    closestBranch = branch;
                    record = d;
                    this.safety = 0;
                } else{
                    this.safety++;
                }
            }

            if(closestBranch != null){
                let newDir = p5.Vector.sub(leaf.pos, closestBranch.pos);
                newDir.normalize();
                closestBranch.dir.add(newDir);
                closestBranch.count++;
            }

            
        }

        for (let i =  this.leaves.length - 1; i >= 0 ; i--) {
            if(this.leaves[i].reached){
                this.leaves.splice(i,1);
            }
        }

        for (let i = this.branches.length - 1 ; i >= 0; i--) {
            let branch = this.branches[i];

            if(branch.count > 0){
                branch.dir.div(branch.count + 1);
                let rand = p5.Vector.random2D();
                rand.setMag(0.3);
                branch.dir.add(rand);
                branch.dir.normalize();
                this.branches.push(branch.next());
                branch.reset();
            }
        }
        
        //stop looping when leaves is 0 or after 10 seconds. So as not to destroy the CPU
        if(this.leaves.length == 0){ //|| (frameCount - frame) > 600){
            this.leaves = [];
        }

    }

    show(){
        for (let i = 0; i < this.leaves.length; i++) {
            this.leaves[i].show();
        }

        for (let i = 0; i < this.branches.length; i++) {
            this.branches[i].show(i);
        }
    }


}