class TruckController{
    constructor(){
        this.next_truck_id = -1;
    }
    getNextTruckId(){
        this.next_truck_id++;
        return this.next_truck_id
    }
    regulateSpeed(truck){
        if (truck.substate === SUBSTATES.STOPPED) {
            truck.setSpeed(0);
            truck.substate = SUBSTATES.DRIVING
        }
        else if (truck.state === STATES.MASTER || truck.state === STATES.NOT_IN_PLATOON) {
            truck.setSpeed(truck.savedSpeed);
        }
        else {
            if (truck.nextTruck) {

                let distance = truck.road.lengthBetween(truck, truck.nextTruck);
                if (distance > 70) {
                    truck.speed = parseFloat(truck.nextTruck.speed) + 0.5
                } else if (distance < 60) {
                    let newSpeed = parseFloat(truck.nextTruck.speed) - 0.5;
                    truck.speed = newSpeed <= 0 ? 0 : newSpeed;
                }
                else {
                    truck.speed = parseFloat(truck.nextTruck.speed);
                }
            }
        }
    }
}
const truckController = new TruckController();
const INIT_PLATOON_MIN_RANGE = 150;