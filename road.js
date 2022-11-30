class Road{
    // initial values
    constructor(x,width,laneCount=3){
        // get initial values of the number of lanes, 
        // car width and x coordinate if the road
        this.x=x;
        this.width=width;
        this.laneCount=laneCount;

        // defining length of the road
        const infinity=1000000;
        this.top=-infinity;
        this.bottom=infinity;
        
        // defining borders of the road
        this.left=x-width/2;
        this.right=x+width/2;
        const topLeft={x:this.left,y:this.top};
        const topRight={x:this.right,y:this.top};
        const bottomLeft={x:this.left,y:this.bottom};
        const bottomRight={x:this.right,y:this.bottom};
        this.borders=[
            [topLeft,bottomLeft],
            [topRight,bottomRight]
        ];
    }
    // returns the center of a lane for each lane of the road 
    // (used for initial placement of the cars)
    getLaneCenter(laneIndex){
        const laneWidth=this.width/this.laneCount;
        return this.left+laneWidth/2+
            Math.min(laneIndex,this.laneCount-1)*laneWidth;
    }
    // draws road on the frame
    draw(ctx){
        ctx.lineWidth=5;
        ctx.strokeStyle="white";

        for(let i=1;i<=this.laneCount-1;i++){
            const x=lerp(
                this.left,
                this.right,
                i/this.laneCount
            );
            
            ctx.setLineDash([20,20]);
            ctx.beginPath();
            ctx.moveTo(x,this.top);
            ctx.lineTo(x,this.bottom);
            ctx.stroke();
        }

        ctx.setLineDash([]);
        this.borders.forEach(border=>{
            ctx.beginPath();
            ctx.moveTo(border[0].x,border[0].y);
            ctx.lineTo(border[1].x,border[1].y);
            ctx.stroke();
        });
    }
}