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
    constructor(id, position, goalPoint, standardSpeed, truckImg, imageScaleFactor, infoText, animation, road) {
        this.id = id;
        this.position = position;
        this.goalPoint = goalPoint;
        this.standardSpeed = standardSpeed;
        this.truckImg = truckImg;
        this.imageScaleFactor = imageScaleFactor;
        this.info = new Info(new Point(position.x + 100, position.y + 100), infoText, 255, 15);
        this.animation = animation;
        this.direction = this.position.directionTo(this.goalPoint);
        this.travelCounter = 0;
        this.animationCounter = 0;
        this.displayCallbacks = [];
        this.state = "NOT_IN_PLATOON";
        this.road = road

        connector.add(this);
    }

    /**
     * 
     * @param {Message} msg 
     */
    message(msg) {
        let roadDistanceToSender = this.road.lengthBetween(this, connector._get(msg.senderId));
        if(  !(roadDistanceToSender < INIT_PLATOON_MIN_RANGE)){
            // In broadcast range, but not in road range.
            return;
        }
        if (msg.senderId !== this.id) {
            switch (msg.requestType) {
                case "Connection":
                    this.onConnection(msg);
                    break;
                case "StartPlatoon":
                    this.onStartPlatoon(msg);
                    break;
                case "AcceptPlatoon":
                    this.onAcceptPlatoon(msg);
                    break;
                case "Validation":
                    break;
                default:

            }
        }
    }
    onConnection(msg){
        if(msg.senderTravelCounter < this.travelCounter){
            connector.directCommunication(new Message(this.position, this.travelCounter, this.id, "StartPlatoon" ), msg.senderId);
        }
    }
    onStartPlatoon(msg){
        this.setSpeed(5);
        this.state = "IN_PLATOON";
        this.info.text = msg.requestType;
        connector.directCommunication(new Message(this.position, this.travelCounter, this.id, "AcceptPlatoon" ), msg.senderId);

        this.addDisplayCallback(function (_this) {
            stroke("#000000");
            point(_this.position.x, _this.position.y);
        });
    }
    onAcceptPlatoon(msg){
        this.info.text = msg.requestType;
        console.log("Accepted Platoon", this.id, " - ",msg.senderId);
        this.setSpeed(5);
        this.state = "IN_PLATOON";
        this.addDisplayCallback(function (_this) {
            stroke("#000000");
            point(_this.position.x, _this.position.y);
        });
    }

    /**
     * Sets the speed!
     * @param {int} newSpeed 
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
        if(this.state === "NOT_IN_PLATOON"){
            connector.broadcast(new Message(this.position, this.travelCounter, this.id, "Connection"));
        }

        this.info.setPosition(new Point(this.position.x, this.position.y + 100));
        this.info.display();
        stroke(0);
        strokeWeight(5);
        push();
        translate(this.position.x, this.position.y);
        scale(this.imageScaleFactor);
        rotate(this.direction + 1.5);
        // Animation
        if(this.state === "NOT_IN_PLATOON") {
            this.animate();
        }

        image(this.truckImg, 0, 0);
        pop();
        this.applyDisplayCallbacks();
        //this.position.display();
    }
    animate(){
        animation(this.animation, 0, 0);
        if (this.animationCounter === 20) {
            this.animation.nextFrame();
            this.animationCounter = 0;
        }
        this.animationCounter += 1;
    }
    addDisplayCallback(f){
        this.displayCallbacks.push(f)
    }
    applyDisplayCallbacks(){
        for(let f of this.displayCallbacks){
            f(this);
        }
    }
}