class Draggable {
    constructor(position, img, imgScaleFactor, road=false) {
        this.position = position;
        this.img = img;
        this.imgScaleFactor = imgScaleFactor;
        this.road = road;
        this._continuesDrag = false;
        this.snapped = true;
        this.rotation = 0;
    }

    _inBoundaries(position, img, imgScaleFactor) {
        //console.log("The Position: ",position.x,position.y);
        let newImageWidth = (img.width * imgScaleFactor);
        let newImageHeight = (img.height * imgScaleFactor);
        if (mouseX <= (position.x + newImageWidth) && mouseY <= (position.y + newImageHeight) &&
            mouseX > !(position.x - newImageWidth) && mouseY > !(position.y - newImageHeight)) {
            return true;
        }
        return false;
    }

    snapToRoadPoint() {
        let nearestPoint = this.road.getLast();
        let nearestPointLength = nearestPoint.distanceTo(this.position);
        console.log("road length",this.road.lines.length);
        let mousePosition = new Point(mouseX,mouseY);
        console.log("mouse position",mousePosition);
        this.road.lines.forEach(line => {
            console.log("Length to point: ",line.startPoint.distanceTo(mousePosition), nearestPointLength)
            if (line.startPoint.distanceTo(mousePosition) < nearestPointLength){
                nearestPoint = line.startPoint;
                nearestPointLength = line.startPoint.distanceTo(mousePosition);
                this.rotation = line.direction;
            }
        });
        this.position = nearestPoint;
    }


    display() {
        if (this._continuesDrag){
            this.position = new Point(mouseX, mouseY);
        }
        if (this._inBoundaries(this.position, this.img, this.imgScaleFactor)) {
            if(mouseIsPressed){
                this._continuesDrag = true
                this.snapped = false;
            } else{
                this._continuesDrag = false;
                if(this.road !== false && !this.snapped){
                    this.snapToRoadPoint();
                    this.snapped = true;
                }
            }
        }
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotation + 1.5);
        console.log(this.imgScaleFactor);
        scale(this.imgScaleFactor);
        image(this.img, 0, 0);
        pop();
    }
}