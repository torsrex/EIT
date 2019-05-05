class Road {
    /**
     * The road object constructor.
     * @param {Array} lines
     * @param {Int} stroke
     * @param {Int} strokeWeight
     */
    constructor(lines, stroke, strokeWeight,tunnelImg,imgScaleFactor) {
        this.lines = lines;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.flipper = 0;
        this.lineLength = 40;
        this.initiated = false;
        this.tunnelImg = tunnelImg;
        this.imgScaleFactor = imgScaleFactor;
    }

    /**
     * Extends the road at the end with the point given.
     * @param {Point} newEndpoint
     */
    extend(newEndpoint) {
        let lastLine = this.lines[this.lines.length-1];
        let tempLine = new Line(this.getLast(), newEndpoint)

        let deltaDirection = Math.abs(lastLine.direction-tempLine.direction);
        
        if (newEndpoint.distanceTo(this.getLast()) > this.lineLength && (deltaDirection<2 || deltaDirection >5)){
            this.lines.push(new Line(this.getLast(),(this.getLast().newPointAt(tempLine.direction,this.lineLength))));
        }
    }

    initiate(startPoint,secondPoint){
        let tempLine = new Line(startPoint,secondPoint);
        this.lines.push(new Line(startPoint,(startPoint.newPointAt(tempLine.direction,this.lineLength))));
        this.initiated = true;
    }


    /**
     * Returns the length between to road-line indexes.
     * @param {Truck} truck1
     * @param {Truck} truck2
     */
    lengthBetween(truck1, truck2) {

        if (! truck1 || !truck2) return 1000

        if (truck1.travelCounter > truck2.travelCounter) {
            let temp = truck1;
            truck1 = truck2;
            truck2 = temp;
        }

        let totalLength = truck1.position.distanceTo(truck1.goalPoint);
        totalLength -= truck2.position.distanceTo(truck2.goalPoint);

        this.lines.slice(truck1.travelCounter, truck2.travelCounter).forEach(line => {
            totalLength += line.length;
        });

        return totalLength;
    }

    getInitialization(){
        return this.initiated;
    }

    /**
     * Returns the last element.
     */
    getLast() {
        return this.lines[this.lines.length - 1].endPoint;
    }

    getFirst(){
        return this.lines[0].startPoint;
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

    displayTunnel(point,rotation){
        push();
        translate(point.x, point.y);
        scale(this.imgScaleFactor);
        rotate(rotation-1.5);
        image(this.tunnelImg,0,0);
        pop();
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
            if (this.flipper === 2) {
                stroke(255);
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