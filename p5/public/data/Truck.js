class Truck {
    /**
     * The truck constructor.
     * @param {Int} id 
     * @param {Point} position 
     * @param {Point} goalPoint 
     * @param {Double} standardSpeed
     * @param {p5.Image} truckImg 
     * @param {Int} imageScaleFactor 
     * @param {String} infoText 
     * @param {animation} animation
     */
    constructor(id, position, goalPoint, standardSpeed, truckImg, imageScaleFactor, infoText, animation) {
        this.id = id;
        this.position = position;
        this.goalPoint = goalPoint;
        this.standardSpeed = standardSpeed;
        this.speed = standardSpeed;
        this.truckImg = truckImg;
        this.imageScaleFactor = imageScaleFactor;
        this.info = new Info(new Point(position.x + 100, position.y + 100), infoText, 255, 15);
        this.animation = animation;
        this.direction = this.position.directionTo(this.goalPoint);
        this.travelCounter = 0;
        this.animationCounter = 0;
    }


    /**
     * Sets the speed!
     */
    setSpeed(newSpeed) {
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
     * Sets the trucks position to a point closer to the goalpoint with distance relativ to the speed.
     */
    drive() {
        this.direction = this.position.directionTo(this.goalPoint);

        //Moving with a given speed (step length) towards a point. 
        this.position = this.position.newPointAt(this.direction, this.speed);
    }

    /**
     * The trucks display function.
     * Scales the image.
     * Translates for rotational purposes.
     * Rotates the truck image in relation to the trucks direction of travel.
     * 
     * Note: Push and Pop state save and reset the translation-functions (scale, translate and rotate).
     * 
     */
    display() {
        this.info.setPosition(new Point(this.position.x, this.position.y + 100));
        this.info.display();
        stroke(0);
        strokeWeight(5);
        push();
        translate(this.position.x, this.position.y);
        scale(this.imageScaleFactor);
        rotate(this.direction + 1.5);
        //image(this.truckImg, 0, 0);
        // Animation
        scale(2);
        animation(this.animation, 0, 0);
        if (this.animationCounter===20){
            pinging.nextFrame();
            this.animationCounter = 0;
        }
        this.animationCounter += 1;
        pop();
        this.position.display();
    }
}