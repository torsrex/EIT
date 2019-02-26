//Singleton
class Connector {
    constructor() {
        this._trucks = [];
        this._connectionRange = 200;
    }

    add(truck) {
        this._trucks.push(truck);
    }

    
    _get(id){
        return this._trucks.find(d => d.id === id);
    }

    directCommunication(msg,truckId){
        if(msg.senderPosition.distanceTo(_get(truckId).position) >= this._connectionRange){
            _get(truckId).message(msg);
        }
    }

    broadcast(msg){
        this._trucks.forEach(truck => {
            if(msg.position.distanceTo(truck.position) >= this._connectionRange){
                truck.message(msg);
            }
        });
    }
}

const connector = new Connector();
//Object.freeze(connector);
