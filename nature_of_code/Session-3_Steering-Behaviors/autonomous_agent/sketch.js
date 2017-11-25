var canvas;
var vehicle;
var pageOpen = new Date();
var flee = false;
var speedSlider, arrivalDistanceSlider;


function setup(){
    canvas = createCanvas(500,500);
    vehicle = new Vehicle(320,180);

    speedSlider = createSlider(3,10,3);
    speedSlider.position(width/2 - (80+36),height + 36);
    speedSlider.style('width', '80px');

    arrivalDistanceSlider = createSlider(0,200,0);
    arrivalDistanceSlider.position(width/2 + 30, height + 36);
    arrivalDistanceSlider.style('width', '80px');

}

function draw(){
    background(40);
    fill(255);
    text('Speed', width/2 - (80+32), height - 58);
    text('Arrival Distance', width/2 + 32, height - 58);

    var target = createVector(mouseX, mouseY);
    var now = new Date();

    if(vehicle != null){
        vehicle.setSpeed(speedSlider.value());
        vehicle.setArrival(arrivalDistanceSlider.value());
        //fun gets crazy fast
        //vehicle.setSpeed((now.getTime() - pageOpen.getTime())/1000);
        if(flee){
            vehicle.flee(target);
        }
        else{
            vehicle.arrive(target);
        }
    
        

        vehicle.update();
        vehicle.display();

        if(abs(vehicle.pos.x - mouseX) < 5 && abs(vehicle.pos.y - mouseY) < 5){
            vehicle = null;
            setTimeout(function(){
                vehicle = new Vehicle(50,50);
                pageOpen = new Date();
            }, 3000);
        }
    }


}

function mouseClicked(){
    pageOpen = new Date();
    flee = !flee;
}