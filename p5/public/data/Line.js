class Line {
    /**
     * Line constructor
     * @param {Point} startPoint Point object specifying the end of the line.
     * @param {Point} endPoint Point object specifying the end of the line.
     */
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        
        this.direction = this.startPoint.directionTo(this.endPoint);
        this.length = this.startPoint.directionTo(endPoint);
    }

    getPerpendicularLine(angle,displacementFactor){
        let newStartPoint = this.startPoint.newPointAt(this.direction-angle,displacementFactor);
        let newEndPoint = this.endPoint.newPointAt(this.direction-angle,displacementFactor);
        return new Line(newStartPoint,newEndPoint);
    }

    /**
     * The Line display function.
     * Displays a line from start to end point.
     */
    display(){
        line(this.startPoint.x, this.startPoint.y,this.endPoint.x, this.endPoint.y);
    }
}