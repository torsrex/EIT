class Road {
    /**
     * The road object constructor.
     * @param {Array} lines 
     * @param {Int} stroke 
     * @param {Int} strokeWeight 
     * @param {boolean} dotted
     */
    constructor(lines, stroke, strokeWeight, dotted) {
        this.lines = lines;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
        this.dotted = dotted;
        this.flipper = true;
    }

    /**
     * Extends the road at the end with the point given.
     * @param {Point} newEndpoint 
     */
    extend(newEndpoint) {
        this.lines.push(new Line(this.lines[this.lines.length - 1].endPoint, newEndpoint));
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
     * Calls the display function for each line.
     */
    display() {
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);

        this.lines.forEach(line => {
            if (this.dotted && this.flipper) {
                this.flipper = false;
                console.log("asda");
            } else {
                this.flipper = true;
                line.display()
            }
        });
        this.flipper = false;
    }
}