class Road {
    /**
     * The road object constructor.
     * @param {Array} lines 
     * @param {Int} stroke 
     * @param {Int} strokeWeight
     */
    constructor(lines, stroke, strokeWeight) {
        this.lines = lines;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.flipper = 0;
    }

    /**
     * Extends the road at the end with the point given.
     * @param {Point} newEndpoint 
     */
    extend(newEndpoint) {
        this.lines.push(new Line(this.lines[this.lines.length - 1].endPoint, newEndpoint));
    }


    /**
     * Returns the length between to road-line indexes. 
     * @param {Truck} truck1 
     * @param {Truck} truck2
     */
    lengthBetween(truck1,truck2){
        let totalLength = truck1.position.distanceTo(truck1.goalPoint);
        totalLength  -= truck2.position.distanceTo(truck2.goalPoint);
        lines.slice(firstRoadIndex,secondRoadIndex).forEach(line => {
            totalLength += line.length;
        })
        return totalLength;
    }

    /**
     * Returns the last element.
     */
    getLast() {
        return this.lines[this.lines.length - 1].endPoint;
    }

    /**
     * This function returns the n elements-startPoint in the line array corresponding to the nr given.
     * If the nr exceeds the length of the array the lasts lines-endpoint is returned. 
     * @param {Int} nr 
     */
    getPoint(nr) {
        if (nr < this.lines.length) {
            return this.lines[nr].startPoint;
        }
        return this.lines[this.lines.length - 1].endPoint;
    }

    /**
     * The road display function.
     * Draws the lines with a given stroke and strokeWeight. 
     */
    display() {
        this.lines.forEach(line => {
            stroke(this.stroke);
            strokeWeight(this.strokeWeight);
            line.display();
        });
        this.lines.forEach(line => {
            if (this.flipper === 5) {
                stroke(0);
                strokeWeight(5);
                line.getPerpendicularLine(1.5, this.strokeWeight / 2).display();
                line.getPerpendicularLine(-1.5, this.strokeWeight / 2).display();
                this.flipper = 0;
            } else {
                this.flipper += 1;
            }
        })
        this.flipper = 0;
        
    }
}