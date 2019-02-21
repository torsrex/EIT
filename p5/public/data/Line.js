class Line {
    constructor(startPoint, endPoint) {
        this.startPoint = startPoint;
        this.endPoint = endPoint;
    }

    display(){
        line(this.startPoint.x, this.startPoint.y,this.endPoint.x, this.endPoint.y);
    }

    /*extendLine(newPoint){

        return new Line(this.endPoint, newPoint, this.lineSize, this.lineColor)

    }*/
    /*extendWithAdd(x,y){
        console.log("added extend", x,y)
        return this.extendLine(this.endPoint.add(x,y));
    }*/
}