class Truck {
    constructor(id, position, goalPoint, standardspeed, stroke, strokeWeight,truckImg, imageScaleFactor) {
        this.id = id;
        this.position = position;
        this.goalPoint = goalPoint;
        this.standardspeed = standardspeed;
        this.speed = standardspeed;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.truckImg = truckImg;
        this.imageScaleFactor = imageScaleFactor
        this.travelCounter = 0;
    }


    /**
     * Sets the speed!
     */
    setSpeed(newSpeed){
        this.standardspeed = newSpeed;
    }

    /**
     * Iterates and returnes the travelCounter, which keeps note how far alonge the truck has traveld on a road.
     */
    getTravelCounter() {
        return this.travelCounter;
    }

    setNewGoalPoint(newGoalPoint) {
        //console.log("new Goal point" + newGoalPoint.x + "old Goal point" + this.goalPoint.x);
        this.travelCounter++;
        this.goalPoint = newGoalPoint;
        this.speed = this.standardspeed;
    }

    direction() {
        return Math.atan2(this.goalPoint.y - this.position.y, this.goalPoint.x - this.position.x);
    }

    drive() {
        this.position.x = this.position.x + (int)(Math.cos(this.direction()) * this.speed);
        this.position.y = this.position.y + (int)(Math.sin(this.direction()) * this.speed);
    }

    display() {
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);
        push();
        translate(this.position.x, this.position.y); 
        scale(this.imageScaleFactor);
        rotate(this.direction()+1.5);
        image(this.truckImg,0, 0);
        pop();
    }
}