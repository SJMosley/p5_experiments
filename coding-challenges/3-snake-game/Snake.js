function Snake(){
    this.position = createVector(width/2, height/2);
    this.velocity = createVector(0,0);
    this.r = 8;
    this.spacing = 2;
    this.posTotal = this.r + this.spacing;
    this.body = [];
    this.startCount = 5;
    const from = color(224, 107, 115);
    const to = color(97, 175, 239);

    for (var i = 0; i < this.startCount; i++) {
        let offsetY = i*(this.posTotal);
        let transition = map(i, 0,this.startCount, 0,1);
        let color = lerpColor(from, to, transition);
        this.body.push(new BodyPiece(this.position.x, this.position.y + offsetY, this.r, color));
    }

    this.run = function(){
        this.update();
        this.borders();
        this.display();
    }
    
    this.update = function(){
        if(!(this.velocity.x == 0 && this.velocity.y == 0)){
            this.position.add(this.velocity.setMag(this.r+this.spacing));
    
            //update all tail pieces with location of piece in front of them (starting from the back)
            for(var i=this.body.length-1; i>0; i--){
                this.body[i].x = this.body[i-1].x;
                this.body[i].y = this.body[i-1].y;
            }
    
            this.body[0].x = this.position.x;
            this.body[0].y = this.position.y;
        }
        

    }

    this.display = function(){
        for (var i = 0; i < this.body.length; i++) {
            this.body[i].display();
        }
    }

    this.setVelocity = function(_vel){
        this.velocity = _vel;
    }

    this.addToTail = function(){

    }

    // Wraparound
    this.borders = function() {
        if (this.position.x < 0) this.position.x = width;
        if (this.position.y < 0) this.position.y = height;
        if (this.position.x > width) this.position.x = 0;
        if (this.position.y > height) this.position.y = 0;
    }
}

function BodyPiece(_x,_y,_r,_color){
    this.x = _x;
    this.y = _y;
    this.r = _r;
    this.color = _color;

    this.setColor = function(_color){
        this.color = _color
    }

    this.display = function(){
        fill(this.color);
        rect(this.x,this.y, this.r, this.r);
    }
}