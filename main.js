// define canvas and its width
const canvas=document.getElementById("myCanvas");
canvas.width=200;
// get canvas context to draw on it
const ctx = canvas.getContext("2d");
// define the road
const road=new Road(canvas.width/2,canvas.width*0.9);
// this defines the player's car
const car=new Car(road.getLaneCenter(1),100,30,50,"KEYS");
// this defines the dummy trafic car
const traffic=[
    new Car(road.getLaneCenter(1),-100,30,50,"DUMMY",2)
];

animate();

function animate(){
    // first update the traffic
    for(let i=0;i<traffic.length;i++){
        traffic[i].update(road.borders,[]);
    }
    // next update car position
    car.update(road.borders,traffic);
    // this will clear the previous drawing and 
    // also resize the drawing according to current window size
    canvas.height=window.innerHeight;
    // update car position and translate the origin to the center of car
    ctx.save();
    ctx.translate(0,-car.y+canvas.height*0.7);
    // draw the road
    road.draw(ctx);
    // draw traffic as red cars
    for(let i=0;i<traffic.length;i++){
        traffic[i].draw(ctx,"red");
    }
    car.draw(ctx,"blue"); // player car as blue
    // get next frame
    ctx.restore();
    requestAnimationFrame(animate);
}