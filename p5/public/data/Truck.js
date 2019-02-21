class Truck {
    constructor(id, position, goalPoint, speed, stroke) {
        this.id = id;
        this.position = position;
        this.goalPoint = goalPoint;
        this.speed = speed;
        this.stroke = stroke;
        this.travelCounter = -1;
    }


    /**
     * Iterates and returnes the travelCounter, which keeps note how far alonge the truck has traveld on a road.
     */
    getTravelCounter(){
        this.travelCounter++;
        return this.travelCounter;
    }

    setNewGoalPoint(newGoalPoint){
        this.goalPoint = newGoalPoint;
    }

    direction(){
        return Math.atan2(this.goalPoint.y-this.position.y, this.goalPoint.x-this.position.x);
    }

    drive(){
        this.position.x = this.position.x + (int) (Math.cos(this.direction()) * this.speed);
        this.position.y = this.position.y + (int) (Math.sin(this.direction()) * this.speed);
    }

    display(){
        stroke(this.stroke);
        ellipse(this.position.x, this.position.y, 30, 30);
        //console.log(this.position.x+"  "+this.position.y);
    }
}