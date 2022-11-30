class Car{
    constructor(x,y,width,height,controlType,maxSpeed=3){
        this.x=x; // x coordinate of the car
        this.y=y; // y coordinate of the car
        this.width=width; // width of the car
        this.height=height; // height of the car
        // initial values for car used to move he car
        this.speed=0;
        this.acceleration=0.2;
        this.maxSpeed=maxSpeed;
        this.friction=0.05;
        this.angle=0; // imagine a unit circle rotated anticlockwise to the right
        this.damaged=false;

        if(controlType!="DUMMY"){
            this.sensor=new Sensor(this);
        }
        this.controls=new Controls(controlType);
    }
    // update the car position and status in the animation 
    update(roadBorders,traffic){
        // we want to render the car useless when it is damaged so we 
        //only update the drawing if its not damaged
        if(!this.damaged){
            this.#move();
            this.polygon=this.#createPolygon(); // create a new car at new position in the new anumation frame
            this.damaged=this.#assessDamage(roadBorders,traffic); // check if car gets dammages in this frame (using intersections)
        }
        if(this.sensor){
            this.sensor.update(roadBorders,traffic); // update sensor status and animation if they exist
        }
    }

    #assessDamage(roadBorders,traffic){
        // this car checks for collisions of the players/agents car  
        for(let i=0;i<roadBorders.length;i++){
            if(polysIntersect(this.polygon,roadBorders[i])){
                return true;
            }
        }
        for(let i=0;i<traffic.length;i++){
            if(polysIntersect(this.polygon,traffic[i].polygon)){
                return true;
            }
        }
        return false;
    }
    // function to define a set of points to form a polygon 
    #createPolygon(){
        const points=[];
        const rad=Math.hypot(this.width,this.height)/2;
        const alpha=Math.atan2(this.width,this.height);
        // you can play with these point values and add more to make different value 
        points.push({
            x:this.x-Math.sin(this.angle-alpha)*rad,
            y:this.y-Math.cos(this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(this.angle+alpha)*rad,
            y:this.y-Math.cos(this.angle+alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle-alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle-alpha)*rad
        });
        points.push({
            x:this.x-Math.sin(Math.PI+this.angle+alpha)*rad,
            y:this.y-Math.cos(Math.PI+this.angle+alpha)*rad
        });
        return points;
    }

    #move(){
        // basic physics used to make the car move naturally
        // and update position with controls
        if(this.controls.forward){
            this.speed+=this.acceleration;
        }
        if(this.controls.reverse){
            this.speed-=this.acceleration;
        }
        // set cap the car speed limit in forward direction 
        if(this.speed>this.maxSpeed){
            this.speed=this.maxSpeed;
        }
        // set cap the car speed limit in reverse direction 
        if(this.speed<-this.maxSpeed/2){
            this.speed=-this.maxSpeed/2;
        }
        // adding friction  to avoid abrupt stopping
        if(this.speed>0){
            this.speed-=this.friction;
        }
        if(this.speed<0){
            this.speed+=this.friction;
        }
        // used to avoid condition of slipping in animation
        if(Math.abs(this.speed)<this.friction){
            this.speed=0;
        }

        if(this.speed!=0){
            const flip=this.speed>0?1:-1; // variable to make car move like real world in reverse direction
            if(this.controls.left){
                this.angle+=0.03*flip; // update angle of car to go left
            }
            if(this.controls.right){
                this.angle-=0.03*flip; // update angle of car to go right
            }
        }
        // finally update the position of the car in terms of x and y
        this.x-=Math.sin(this.angle)*this.speed;
        this.y-=Math.cos(this.angle)*this.speed;
    }

    draw(ctx,color){
        if(this.damaged){
            ctx.fillStyle="gray";
        }else{
            ctx.fillStyle=color;
        }
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x,this.polygon[0].y);
        for(let i=1;i<this.polygon.length;i++){
            ctx.lineTo(this.polygon[i].x,this.polygon[i].y);
        }
        ctx.fill();

        if(this.sensor){
            this.sensor.draw(ctx);
        }
    }
}