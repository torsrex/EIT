/**
 * Created by faiter on 2/26/19.
 */
class TruckController{
    constructor(){
        this.next_truck_id = -1;
    }
    getNextTruckId(){
        this.next_truck_id++;
        return this.next_truck_id
    }
}
const truckController = new TruckController();
const INIT_PLATOON_MIN_RANGE = 150;