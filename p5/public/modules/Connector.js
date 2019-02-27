//Singleton
class Connector {
    constructor() {
        this._trucks = [];
        this._connectionRange = 200;
    }

    add(truck) {
        this._trucks.push(truck);
    }

    remove(truck){
        this._trucks.splice(this._trucks.indexOf(truck),1);
    }

    _get(id) {
        return this._trucks.find(d => d.id === id);
    }

    directCommunication(msg, truckId) {
        console.log(truckId);
        let distanceToSource = msg.originPosition.distanceTo(this._get(truckId).position)
        if (distanceToSource <= this._connectionRange) {
            this._get(truckId).message(msg);
        }
    }

    broadcast(msg) {
        console.log("Broadcasting",msg)
        this._trucks.forEach(truck => {
            let distanceToSource = msg.originPosition.distanceTo(truck.position)
            if (distanceToSource <= this._connectionRange && distanceToSource > 0) {
                truck.message(msg);
            }
        });
    }
}

const connector = new Connector();
Object.freeze(connector);
