class Road {
    constructor(lines,stroke,strokeWeight){
        this.lines = lines;
        this.stroke = stroke;
        this.strokeWeight = strokeWeight;
    }

    extend(newEndpoint){
        this.lines.push(new Line(this.lines[this.lines.length-1].endPoint,newEndpoint));
    }

    getLast(){
        return this.lines[this.lines.length-1].endPoint;
    }

    getPoint(nr){
        if (nr<this.lines.length){
            return this.lines[nr].startPoint;
        }
        return this.lines[this.lines.length-1].endPoint;
    }

    display() {
        stroke(this.stroke);
        strokeWeight(this.strokeWeight);
        this.lines.forEach(line => {
            line.display()
        });
        
        /*var i;
        for (i = 0; i < this.points.length-1; i++) {
            line(this.points[i][0],this.points[i][1],this.points[i+1][0],this.points[i+1][1]);
        }*/
    }
}