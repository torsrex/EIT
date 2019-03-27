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
}

const protocol = new Protocol();
Object.freeze(protocol);

/*
export default protocol;*/
