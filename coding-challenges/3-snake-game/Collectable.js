function Collectable(){
    this.r = 8;
    this.spacing = 2;
    this.posTotal = this.r + this.spacing;
    this.x = floor(random(width/this.posTotal)) * this.posTotal;
    this.y = floor(random(height/this.posTotal)) * this.posTotal;

    this.eaten = function(){
        
    }
}