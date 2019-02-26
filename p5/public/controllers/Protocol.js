//singleton
class Protocol{
    constructor(){
        this._validRequestTypes = {1: "JoinRequest"}
    }
}

const protocol = new Protocol();
Object.freeze(protocol);

export default protocol;