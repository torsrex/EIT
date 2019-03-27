const REQUESTS = {
    HANDSHAKE: "Connection",
    INITIATE_PLATOON:"StartPlatoon",
    ACCEPT_PLATOON: "AcceptPlatoon",
    ROAD_OBSTRUCTED: "RoadObstructed"
};

//singleton
class Protocol{
    constructor(){
        this._validRequestTypes = {1: "JoinRequest"}
    }
    handleSimpleSplit(truck){
        switch (truck.state){
            case STATES.SLAVE:
                truck.state = STATES.MASTER;
                break;
            case STATES.LAST_SLAVE:
                truck.state = STATES.NOT_IN_PLATOON;
                break;
        }

        switch (truck.nextTruck.state){
            case STATES.SLAVE:
                truck.nextTruck.state = STATES.LAST_SLAVE;
                break;
            case STATES.MASTER:
                truck.nextTruck.state = STATES.NOT_IN_PLATOON;
                break;
            default:
        }
        truck.nextTruck.displayCallbacks = [];
        truck.nextTruck = null
    }
    onConnection(truck, msg) {
        // Only last slave and not-in-platoon can answer handshakes
        if (truck.state !== STATES.LAST_SLAVE && truck.state !== STATES.NOT_IN_PLATOON) return;
        if (senderBehind(msg, truck)) {
            connector.directCommunication(new Message(truck.position, truck.travelCounter, truck.id, REQUESTS.INITIATE_PLATOON), msg.senderId);
        }
    }
    onInitiatePlatoon(truck, msg) {

        if (STATES.isInPlatoon(truck.state)) {
            truck.state = STATES.SLAVE;
        }
        else {
            truck.state = STATES.LAST_SLAVE;
        }

        truck.nextTruck = connector._get(msg.senderId);
        truck.setSpeed(truck.nextTruck.speed);
        connector.directCommunication(new Message(truck.position, truck.travelCounter, truck.id, REQUESTS.ACCEPT_PLATOON), msg.senderId);
    }
    onAcceptPlatoon(truck, msg){
        if (STATES.isInPlatoon(truck.state)) {
            truck.state = STATES.SLAVE
        }
        else {
            truck.state = STATES.MASTER
        }
    }
    onRoadObstructed(truck, msg) {
        if (!senderBehind(msg, truck)) {// obstruction in front
            truck.substate = SUBSTATES.STOPPED;
        }

    }
}

const protocol = new Protocol();
Object.freeze(protocol);

/*
export default protocol;*/
