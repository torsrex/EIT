STATES = {
    NOT_IN_PLATOON: "NOT_IN_PLATOON",
    IN_PLATOON: "IN_PLATOON",
    SLAVE: "SLAVE"

};

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
        this.state = STATES.NOT_IN_PLATOON;
        this.road = road;
        this.nextTruck = null;
        this.truckBedColor = "#000000";
        connector.add(this);
    }

    /**
     * 
     * @param {Message} msg 
     */
    message(msg) {
        let roadDistanceToSender = this.road.lengthBetween(this, connector._get(msg.senderId));
        if( !(roadDistanceToSender < INIT_PLATOON_MIN_RANGE)){
            // In broadcast range, but not in road range.
            return;
        }
        if (msg.senderId !== this.id) {
            switch (msg.requestType) {
                case REQUESTS.HANDSHAKE:
                    this.onConnection(msg);
                    break;
                case REQUESTS.INITIATE_PLATOON:
                    this.onStartPlatoon(msg);
                    break;
                case REQUESTS.ACCEPT_PLATOON:
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
            connector.directCommunication(new Message(this.position, this.travelCounter, this.id, REQUESTS.INITIATE_PLATOON ), msg.senderId);
        }
    }
    onStartPlatoon(msg){
        //this.setSpeed(5);
        this.state = STATES.IN_PLATOON;
        this.info.text = STATES.SLAVE;
        this.nextTruck = connector._get(msg.senderId);
        this.setSpeed(this.nextTruck.standardSpeed);
        connector.directCommunication(new Message(this.position, this.travelCounter, this.id, REQUESTS.ACCEPT_PLATOON ), msg.senderId);

        /*this.addDisplayCallback(function (_this) {
            stroke("#000000");
            point(_this.position.x, _this.position.y);
        });*/
    }
    onAcceptPlatoon(msg){
        this.info.text = msg.requestType;
        console.log("Accepted Platoon", this.id, " - ",msg.senderId);
        //this.setSpeed(5);
        this.state = STATES.IN_PLATOON;
        // Add something like this to link the trucks
        let truck1 = this;
        let truck2 = connector._get(msg.senderId);
        this.addDisplayCallback(function (_this) {
            line(truck1.position.x,truck1.position.y,truck2.position.x, truck2.position.y)
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
        if(this.state === STATES.NOT_IN_PLATOON){
            connector.broadcast(new Message(this.position, this.travelCounter, this.id, REQUESTS.HANDSHAKE));
            push();
            strokeWeight(5);
            stroke(33,129,133);
            fill(0, 0, 0, 0);
            circle(this.position.x, this.position.y, connector._connectionRange);
            pop();
        }
        if(this.state === STATES.IN_PLATOON){

            if(this.nextTruck){
                this.truckBedColor = "#296F85";
                this.nextTruck.truckBedColor = "#852432";

                let distance = this.road.lengthBetween(this, this.nextTruck);

                if(distance > 100){
                    this.standardSpeed = parseFloat(this.nextTruck.standardSpeed)+0.5
                }else if(distance < 50 && distance > 30){
                    this.standardSpeed = parseFloat(this.nextTruck.standardSpeed);
                }
                else {
                    this.standardSpeed = parseFloat(this.nextTruck.standardSpeed)-0.5;
                }

            }

        }

        this.info.setPosition(new Point(this.position.x, this.position.y + 100));
        //this.info.display();
        stroke(0);
        strokeWeight(5);
        push();
        translate(this.position.x, this.position.y);
        scale(this.imageScaleFactor);
        rotate(this.direction + 1.5);
        // Animation
        if(this.state === STATES.NOT_IN_PLATOON) {
            this.animate();
        }
        rect(0, 0, 280, 280, 60, 60, 10, 10);
        fill(this.truckBedColor);
        rect(0, 280, 280, 380, 10, 10, 10, 10);
        pop();

        this.applyDisplayCallbacks();
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