function FlowField(r){
    this.resolution = r;
    this.cols = width/this.resolution;
    this.rows = height/this.resolution;

    this.make2DArray = function(cols){
        var array = [];
        for (var i = 0; i < cols; i++) {
            array[i] = [];
        }

        return array;
    }

    this.field = this.make2DArray(this.cols);

    this.init = function(){
        
        noiseSeed(Math.floor(random(10000)));
        var xoff = 0;
        for (var i = 0; i < this.cols; i++) {
            var yoff = 0;
            for (var j = 0; j < this.rows; j++) {
                var theta = map(noise(xoff,yoff),0,1,0, TWO_PI);
                
                this.field[i][j] = createVector(cos(theta),sin(theta));
                yoff += 0.1;
            }
            xoff += 0.1;
        }
        
    }
    this.init();

    this.lookup = function(lookup){
        var column = Math.floor(constrain(lookup.x/this.resolution, 0, this.cols-1));
        var row = Math.floor(constrain(lookup.y/this.resolution,0,this.rows-1));

        return this.field[column][row].copy();
    }

    this.change = function(lookup){
        var column = Math.floor(constrain(lookup.x/this.resolution, 0, this.cols-1));
        var row = Math.floor(constrain(lookup.y/this.resolution,0,this.rows-1));

        return this.field[column][row];
    };

    // Draw every vector
    this.display = function() {
        for (var i = 0; i < this.cols; i++) {
            for (var j = 0; j < this.rows; j++) {
                drawVector(this.field[i][j], i * this.resolution, j * this.resolution, this.resolution - 2);
            }
        }
    };

    // Renders a vector object 'v' as an arrow and a location 'x,y'
    var drawVector = function(v, x, y, scayl) {
    push();
    var arrowsize = 4;
    // Translate to location to render vector
    translate(x, y);
    stroke(200, 100);
    // Call vector heading function to get direction (note that pointing to the right is a heading of 0) and rotate
    rotate(v.heading());
    // Calculate length of vector & scale it to be bigger or smaller if necessary
    var len = v.mag() * scayl;
    // Draw three lines to make an arrow (draw pointing up since we've rotate to the proper direction)
    line(0, 0, len, 0);
    //line(len,0,len-arrowsize,+arrowsize/2);
    //line(len,0,len-arrowsize,-arrowsize/2);
    pop();
  };
}