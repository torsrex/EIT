class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    add(x, y) {
        return new Point(this.x + x, this.y + y)
    }
    
    distanceTo(point) {
        let p1 = this
        let p2 = point
        let x1 = p1.x
        let y1 = p1.y

        let x2 = p2.x
        let y2 = p2.y

        return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));

    }

    display(){
        point(this.x,this.y);
    }
}