class Road {
    /*constructor(startpoint, endpoint, stroke) {
        this.points = [startpoint, endpoint];
        this.stroke = stroke;
    }*/
    constructor(lines,stroke){
        this.lines = lines;
        this.stroke = stroke;
    }

    extend(newEndpoint){
        this.lines.push(new Line(this.lines[this.lines.length-1].endPoint,newEndpoint));
    }

    getPoint(nr){
        if (nr<this.lines.length){
            return this.lines[nr].startPoint;
        }
        return this.lines[this.lines.length-1].endPoint
    }

    display() {
        stroke(this.stroke);
        this.lines.forEach(line => {
            line.display()
        });
        
        /*var i;
        for (i = 0; i < this.points.length-1; i++) {
            line(this.points[i][0],this.points[i][1],this.points[i+1][0],this.points[i+1][1]);
        }*/
    }
}