class Truck {
    /**
     * The truck constructor.
     * @param {Int} id 
     * @param {Point} position 
     * @param {Point} goalPoint 
     * @param {Double} standardspeed 
     * @param {Int} stroke 
     * @param {Int} strokeWeight 
     * @param {p5.Image} truckImg 
     * @param {Int} imageScaleFactor 
     */
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

    /**
     * Overwrites the goalpoint with the one given.
     * @param {Point object refering to the next Goal.} newGoalPoint 
     */
    setNewGoalPoint(newGoalPoint) {
        //console.log("new Goal point" + newGoalPoint.x + "old Goal point" + this.goalPoint.x);
        this.travelCounter++;
        this.goalPoint = newGoalPoint;
        this.speed = this.standardspeed;
    }

    /**
     * Calculates the new direction towards this trucks goalpoint.
     */
    direction() {
        return Math.atan2(this.goalPoint.y - this.position.y, this.goalPoint.x - this.position.x);
    }

    /**
     * Sets the trucks position to a point closer to the goalpoint with distance relativ to the speed.
     */
    drive() {
        this.position.x = this.position.x + (int)(Math.cos(this.direction()) * this.speed);
        this.position.y = this.position.y + (int)(Math.sin(this.direction()) * this.speed);
    }

    /**
     * The trucks display function.
     * Scales the image.
     * Transelates for roatational purpuses.
     * Rotates the truck image in relation to the trucks diraction of travel.
     * 
     * Note: Push and Pop state save and reset the translational functions (scale, translate and rotate).
     */
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