class Point {
    /**
     * The Point constructor
     * @param {Int} x x-axes value
     * @param {Int} y y-axes value
     */
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    /**
     * Calculates the distance to from a given point to this object.
     * @param {Point} point The other Point
     */
    distanceTo(point) {
        let p1 = this
        let p2 = point
        let x1 = p1.x
        let y1 = p1.y

        let x2 = p2.x
        let y2 = p2.y

        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
    }

    /**
     * Calculates the a direction towards a Point.
     * @param {Point} point
     */
    directionTo(point) {
        return Math.atan2(point.y - this.y, point.x - this.x);
    }

    /**
     * Returns a point in a given direction with a factor. 
     * @param {double} direction in which direction.
     * @param {Int} factor how much.
     */
    newPointAt(direction,factor){
        let x = this.x + (int)(Math.cos(direction) * factor);
        let y = this.y + (int)(Math.sin(direction) * factor);
        return new Point(x,y);
    }

    /**
     * The Points display function.
     * Draws a point.
     */
    display(){
        point(this.x,this.y);
    }
}