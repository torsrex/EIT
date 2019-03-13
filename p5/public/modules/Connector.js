//Singleton
class Connector {
    constructor() {
        this._trucks = [];
        this._obstacles = [];
        this._connectionRange = 200;
    }

    add(truck) {
        this._trucks.push(truck);
    }
    addObstacle(obstacle){
        this._obstacles.push(obstacle)
    }

    remove(truck){
        this._trucks.splice(this._trucks.indexOf(truck),1);
    }

    _get(id) {
        return this._trucks.find(d => d.id === id);
    }
    _getObstacle(id){
        return this._obstacles.find(d => d.id === id);

    }

    directCommunication(msg, truckId) {

        //let distanceToSource = this.distanceToSource(msg, truckId);
        let distanceToSource = msg.originPosition.distanceTo(this._get(truckId).position)
        if (distanceToSource <= this._connectionRange) {
            this._get(truckId).message(msg);
        }
    }

    broadcast(msg) {
        //console.log("Broadcasting",msg);
        this._trucks.filter(t=>t instanceof Truck).filter(t=>msg.senderId!==t.id).forEach(truck => {
            //let d = this.distance(this._get(msg.senderId))
            let distanceToSource = msg.originPosition.distanceTo(truck.position)
            if (distanceToSource <= this._connectionRange) {
                truck.message(msg);
            }
        });
    }
    distanceToSource(msg, to_id){
        let t1 = this._get(to_id);
        let t2 = this._get(msg.senderId);
        let d = t1.road.lengthBetween(t1, t2);

        return d;

    }
}

const connector = new Connector();
Object.freeze(connector);
