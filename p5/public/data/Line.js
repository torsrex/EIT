class Line {
    /**
     * Line constructor
     * @param {Point} startPoint Point object specifying the end of the line.
     * @param {Point} endPoint Point object specifying the end of the line.
     */
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    /**
     * The Line display function.
     * Displays a line from start to end point.
     */
    display(){
        line(this.startPoint.x, this.startPoint.y,this.endPoint.x, this.endPoint.y);
    }
}