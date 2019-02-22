class Truck {
    /**
     * The truck constructor.
     * @param {Int} id 
     * @param {Point} position 
     * @param {Point} goalPoint 
     * @param {Double} standardSpeed 
     * @param {Int} stroke 
     * @param {Int} strokeWeight 
     * @param {p5.Image} truckImg 
     * @param {Int} imageScaleFactor 
     */
    constructor(id, position, goalPoint, standardSpeed, stroke, strokeWeight,truckImg, imageScaleFactor) {
        this.id = id;
        this.position = position;
        this.goalPoint = goalPoint;
        this.standardSpeed = standardSpeed;
        this.speed = standardSpeed;
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
        this.standardSpeed = newSpeed;
    }

    /**
     * Iterates and returns the travelCounter, which keeps note how far along the truck has traveled on a road.
     */
    getTravelCounter() {
        return this.travelCounter;
    }

    /**
     * Overwrites the goalpoint with the one given.
     * @param {Point} newGoalPoint 
     */
    setNewGoalPoint(newGoalPoint) {
        //console.log("new Goal point" + newGoalPoint.x + "old Goal point" + this.goalPoint.x);
        this.travelCounter++;
        this.goalPoint = newGoalPoint;
        this.speed = this.standardSpeed;
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
     * Translates for rotational purposes.
     * Rotates the truck image in relation to the trucks direction of travel.
     * 
     * Note: Push and Pop state save and reset the translation-functions (scale, translate and rotate).
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