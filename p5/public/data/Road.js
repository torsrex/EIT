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

    extend(newEndpoint) {
        this.lines.push(new Line(this.lines[this.lines.length - 1].endPoint, newEndpoint));
    }

    getLast() {
        return this.lines[this.lines.length - 1].endPoint;
    }

    /**
     * 
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
     * Calles the display function for each line.
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