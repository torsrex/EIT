STATES = {
    NOT_IN_PLATOON: "NOT_IN_PLATOON",
    SLAVE: "SLAVE",
    MASTER: "MASTER",
    LAST_SLAVE: "LAST SLAVE",
    isInPlatoon(state){
        return state === STATES.SLAVE || state === STATES.MASTER || state === STATES.LAST_SLAVE
    }
};

SUBSTATES = {
    STOPPED: "STOPPED",
    DRIVING: "DRIVING"
};

function colorOfState(state) {

    switch (state) {
        case STATES.SLAVE:
            return "#298533";
            break;
        case STATES.MASTER:
            return "#852432";
            break;
        case STATES.LAST_SLAVE:
            return "#005F85";
            break;
        default:
            return "#000000";
            break
    }

}

function inRange(truck, msg) {
    let target;
    switch (msg.requestType) {
        case REQUESTS.ROAD_OBSTRUCTED:
            target = connector._getObstacle(msg.senderId);
            break;
        default:
            target = connector._get(msg.senderId);
            break;
    }
    let roadDistanceToSender = truck.road.lengthBetween(truck, target);

    if (msg.requestType === REQUESTS.ROAD_OBSTRUCTED)
        return roadDistanceToSender < INIT_PLATOON_MIN_RANGE / 1.5;

    return roadDistanceToSender < INIT_PLATOON_MIN_RANGE
}
function senderBehind(message, truck) {
    return message.senderTravelCounter < truck.travelCounter
}

class Truck {

    /**
     * The truck constructor.
     * @param {Int} id
     * @param {Point} position
     * @param {Point} goalPoint
     * @param {Double} speed
     * @param {p5.Image} truckImg
     * @param {Int} imageScaleFactor
     * @param {String} infoText
     * @param {animation} animation
     */
    constructor(id, position, goalPoint, speed, truckImg, imageScaleFactor, infoText, animation, road) {
        this.id = id;
        this.position = position;
        this.goalPoint = goalPoint;
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
        this.substate = SUBSTATES.DRIVING;
        this.savedSpeed = speed;
        this.speed = speed;
        connector.add(this);

        this.callback_data = {animationState: false}

    }

    /**
     *
     * @param {Message} msg
     */
    message(msg) {
        if (!inRange(this, msg)) return;

        switch (msg.requestType) {
            case REQUESTS.HANDSHAKE:
                protocol.onConnection(this,msg);
                break;
            case REQUESTS.INITIATE_PLATOON:
                protocol.onInitiatePlatoon(this, msg);
                break;
            case REQUESTS.ACCEPT_PLATOON:
                this.onAcceptPlatoon(msg);
                break;
            case REQUESTS.ROAD_OBSTRUCTED:
                protocol.onRoadObstructed(this, msg);
                break;
            default:
                throw Error("Invalid message type", msg.requestType)

        }

    }



    onAcceptPlatoon(msg){
        protocol.onAcceptPlatoon(this, msg);

        let truck1 = this;
        let truck2 = connector._get(msg.senderId);
        this.addDisplayCallback(function (d) {

            let num_lines = 10;
            let distance = truck1.position.distanceTo(truck2.position);
            let direction = truck1.position.directionTo(truck2.position);

            let s = truck1.position;
            let factor = distance / num_lines;
            let e = s.newPointAt(s, factor);

            for (let i = 0; i < num_lines; i++) {
                if ((i % 2 !== 0) === d.animationState) {
                    stroke("blue");
                    line(s.x, s.y, e.x, e.y)
                }

                s = s.newPointAt(direction, factor);
                e = e.newPointAt(direction, factor)
            }
        });
    }

    /**
     * Sets the speed!
     * @param {int} newSpeed
     */
    setSpeed(newSpeed) {
        this.speed = newSpeed;
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

        if (this.nextTruck && this.position.distanceTo(this.nextTruck.position) > INIT_PLATOON_MIN_RANGE) {

            protocol.handleSimpleSplit(this);
        }
        truckController.regulateSpeed(this);

        if (this.state === STATES.MASTER || !STATES.isInPlatoon(this.state)) {
            connector.broadcast(new Message(this.position, this.travelCounter, this.id, REQUESTS.HANDSHAKE));
        }
        if (this.state === STATES.NOT_IN_PLATOON) {
            this.drawRadioRange()
        }

        this.draw();
    }

    drawRadioRange() {
        push();
        strokeWeight(5);
        stroke(33, 129, 133);
        fill(0, 0, 0, 0);
        circle(this.position.x, this.position.y, connector._connectionRange);
        pop();
    }

    draw() {
        this.truckBedColor = colorOfState(this.state);
        this.info.text = ""; //this.id;
        this.info.setPosition(new Point(this.position.x, this.position.y + 100));
        //this.info.text = ""+this.id
        this.info.display();
        stroke(0);
        strokeWeight(5);
        push();
        translate(this.position.x, this.position.y);
        scale(this.imageScaleFactor);
        rotate(this.direction + 1.5);
        // Animation
        if (this.state === STATES.NOT_IN_PLATOON) {
            this.animate();
        }
        rect(0, 0, 280, 280, 60, 60, 10, 10);
        fill(this.truckBedColor);
        rect(0, 280, 280, 380, 10, 10, 10, 10);
        pop();
        if (frameCount % 10 === 0)
            this.callback_data.animationState = !this.callback_data.animationState
    }

    animate() {
        animation(this.animation, 0, 0);
        if (this.animationCounter === 20) {
            this.animation.nextFrame();
            this.animationCounter = 0;
        }
        this.animationCounter += 1;
    }

    addDisplayCallback(f) {
        this.displayCallbacks.push(f)
    }

    applyDisplayCallbacks(callback_data) {
        for (let f of this.displayCallbacks) {
            f(callback_data);
        }
    }
}