class Draggable {
    constructor(position, img, imgScaleFactor) {
        this.position = position;
        this.img = img;
        this.imgScaleFactor = imgScaleFactor;
        this._continuesDrag = false;
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

    snapToPoint(newPosition) {
        this.position = newPosition;
    }


    display() {
        if (this._continuesDrag){
            this.position = new Point(mouseX, mouseY);
        }
        if (this._inBoundaries(this.position, this.img, this.imgScaleFactor)) {
            mouseIsPressed ? this._continuesDrag = true : this._continuesDrag = false;
        } 
        
        push();
        translate(this.position.x, this.position.y);
        console.log(this.imgScaleFactor);
        scale(this.imgScaleFactor);
        image(this.img, 0, 0);
        pop();
    }
}