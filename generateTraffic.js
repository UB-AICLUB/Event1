function generateTraffic (road, maxCarCount = 15){
    carCount = Math.floor(Math.random() * (maxCarCount - 1 + 1)) + 1;
    x_pos = -100;
    newTraffic = [];
    for(i=0; i<carCount; i++){
        lane = Math.floor(Math.random() * (road.laneCount - 0 + 1)) + 0;;
        newTraffic.push(new Car(road.getLaneCenter(lane),x_pos,30,50,"DUMMY",2));
        if (i%2==0){
            x_pos -= 200 ;
        }
    }
    return newTraffic;
}