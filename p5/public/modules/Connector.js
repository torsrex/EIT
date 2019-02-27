//Singleton
class Connector {
    constructor() {
        this._trucks = [];
        this._connectionRange = 200;
    }

    add(truck) {
        this._trucks.push(truck);
    }


    _get(id) {
        return this._trucks.find(d => d.id === id);
    }

    directCommunication(msg, truckId) {
        let distanceToSource = msg.originPosition.distanceTo(_get(truckId).position)
        if (distanceToSource <= this._connectionRange) {
            _get(truckId).message(msg);
        }
    }

    broadcast(msg) {
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
