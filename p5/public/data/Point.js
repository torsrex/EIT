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
     * The Points display function.
     * Draws a point.
     */
    display(){
        point(this.x,this.y);
    }
}