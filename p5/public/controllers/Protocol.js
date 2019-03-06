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
}

const protocol = new Protocol();
Object.freeze(protocol);

/*
export default protocol;*/
